/*
 * KanjiVG → public/strokes/<codepoint>.json for every kana and kanji a learner can trace or open
 * stroke order for (course/usedChars.ts). Run by hand when content adds kanji: the outputs are
 * committed (CC BY-SA 3.0, see content/data/vendor/SOURCE.md) and CI has no KanjiVG.
 *
 *   npm run strokes:extract        (needs vendor-src/kanjivg-main.zip; npm run data:fetch)
 *
 * Only KanjiVG's base files are used (kanji/<hex>.svg), never its Kaisho or regional variants, and
 * never Mandarin Ladder's Chinese stroke data (CLAUDE.md §6.6).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { kvgToStrokes } from '@/lib/ja/kvg';
import { usedChars } from '@/course/usedChars';

const ROOT = process.cwd();
const ZIP = path.join(ROOT, 'vendor-src', 'kanjivg-main.zip');
const OUT = path.join(ROOT, 'public', 'strokes');

if (!fs.existsSync(ZIP)) {
  console.error(`strokes:extract: ${path.relative(ROOT, ZIP)} is missing (npm run data:fetch).`);
  process.exit(1);
}

const listing = execFileSync('unzip', ['-Z1', ZIP], { encoding: 'utf8', maxBuffer: 64 << 20 }).split('\n');
const files = new Map<string, string>();
for (const f of listing) {
  const m = /(?:^|\/)kanji\/([0-9a-f]{5})\.svg$/.exec(f);
  if (m) files.set(m[1], f);
}

fs.mkdirSync(OUT, { recursive: true });
const want = [...usedChars().strokes].sort((a, b) => a.codePointAt(0)! - b.codePointAt(0)!);
const written = new Set<string>();
const missing: string[] = [];
for (const ch of want) {
  const hex = ch.codePointAt(0)!.toString(16).padStart(5, '0');
  const entry = files.get(hex);
  if (!entry) {
    missing.push(ch);
    continue;
  }
  const svg = execFileSync('unzip', ['-p', ZIP, entry], { encoding: 'utf8' });
  const data = kvgToStrokes(svg);
  if (!data.strokes.length) {
    missing.push(ch);
    continue;
  }
  const file = `${ch.codePointAt(0)!.toString(16)}.json`;
  fs.writeFileSync(path.join(OUT, file), `${JSON.stringify(data)}\n`);
  written.add(file);
}

// Characters no longer used lose their files.
let removed = 0;
for (const f of fs.readdirSync(OUT)) {
  if (f.endsWith('.json') && !written.has(f)) {
    fs.rmSync(path.join(OUT, f));
    removed++;
  }
}

console.log(`strokes:extract: ${written.size} files${removed ? `, ${removed} removed` : ''}.`);
if (missing.length) console.log(`  not in KanjiVG (no stroke order shown): ${missing.join(' ')}`);
