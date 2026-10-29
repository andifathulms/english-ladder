import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

// Fonts (DESIGN §4, §13): every face covers the German set. Reads the built site's @font-face
// files (out/) and checks each family's character map, across its subset files.
// Capital ẞ is left out on purpose (plan R8): it's only in latin-ext, and content never uses it.
const GLYPHS = [...'äöüßÄÖÜ„“‚‘»«'];
const OUT = path.join(__dirname, '../../out');

async function coverage(): Promise<Record<string, Set<number>>> {
  const hb = await require('harfbuzzjs');
  const wawoff = require('wawoff2');
  const cssDir = path.join(OUT, '_next/static/css');
  const css = fs.readdirSync(cssDir).map((f) => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('');
  const families: Record<string, Set<number>> = {};
  for (const block of css.matchAll(/@font-face\{([^}]*)\}/g)) {
    const family = /font-family:([^;]+)/.exec(block[1])![1].replace(/['"]/g, '');
    if (family.includes('Fallback')) continue;
    const set = (families[family] ??= new Set());
    for (const url of block[1].matchAll(/url\(([^)]+\.woff2)\)/g)) {
      const sfnt = await wawoff.decompress(fs.readFileSync(path.join(OUT, url[1].replace(/^.*?\/_next\//, '_next/'))));
      const blob = hb.createBlob(sfnt);
      const face = hb.createFace(blob, 0);
      for (const c of face.collectUnicodes()) set.add(c);
      face.destroy();
      blob.destroy();
    }
  }
  return families;
}

test('display, body and mono faces cover ä ö ü ß Ä Ö Ü „ “ ‚ ‘ » «', async () => {
  const families = await coverage();
  const names = Object.keys(families);
  for (const face of ['Newsreader', 'body', 'IBM_Plex_Mono']) expect(names.some((n) => n.includes(face)), face).toBe(true);
  const missing = Object.entries(families).flatMap(([f, set]) => GLYPHS.filter((g) => !set.has(g.codePointAt(0)!)).map((g) => `${f}: ${g}`));
  expect(missing).toEqual([]);
  // The check can fail: no face has a CJK glyph.
  expect(Object.values(families).some((set) => set.has('漢'.codePointAt(0)!))).toBe(false);
});
