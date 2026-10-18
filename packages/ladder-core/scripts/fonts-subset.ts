/*
 * Subsets a course's target-script fonts to the characters the site uses and writes
 * styles/fonts-<name>.css with @font-face rules (Mandarin: CLAUDE.md §7.6; Japanese: §7.6).
 * Run from an app: tsx ../../packages/ladder-core/scripts/fonts-subset.ts (reads ./fonts.config.ts).
 *
 * Characters are cut into slices with their own unicode-range, so a page downloads only the slices
 * it uses: the first lessons need the first slice or two. Fails if the budgeted face is over budget.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';
import { unicodeRange, type FontsConfig } from './fonts';

const ROOT = process.cwd();
const { fonts } = (await import(path.resolve(ROOT, 'fonts.config.ts'))) as { fonts: FontsConfig };
const SRC = path.join(ROOT, 'fonts-src');
const OUT_DIR = path.join(ROOT, 'styles', `fonts-${fonts.name}`);
const CSS = path.join(ROOT, 'styles', `fonts-${fonts.name}.css`);
const MANIFEST = path.join(ROOT, 'styles', `fonts-${fonts.name}.json`);

/** Slices: the first ones small, so the first lessons download little. */
function slice(chars: string[]): string[][] {
  const out: string[][] = [];
  let i = 0;
  let k = 0;
  while (i < chars.length) {
    const n = fonts.sliceSizes[k] ?? fonts.rest;
    out.push(chars.slice(i, i + n));
    i += n;
    k += 1;
  }
  return out;
}

for (const f of fonts.faces) {
  if (!fs.existsSync(path.join(SRC, f.file))) {
    console.error(`fonts:subset — fonts-src/${f.file} is missing. Run npm run fonts:fetch.`);
    process.exit(1);
  }
}
const chars = fonts.chars();
const slices = slice(chars);
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const rules: string[] = [];
const manifest: { chars: string; slices: { face: string; file: string; bytes: number; count: number }[] } = {
  chars: chars.join(''),
  slices: [],
};
const totals: Record<string, number> = {};
for (const face of fonts.faces) {
  const src = fs.readFileSync(path.join(SRC, face.file));
  for (const [k, s] of slices.entries()) {
    const text = (k === 0 ? fonts.always : '') + s.join('');
    const buf = await subsetFont(src, text, { targetFormat: 'woff2' });
    const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
    const file = `${face.slug}-${k}.${hash}.woff2`;
    fs.writeFileSync(path.join(OUT_DIR, file), buf);
    totals[face.slug] = (totals[face.slug] ?? 0) + buf.length;
    manifest.slices.push({ face: face.slug, file, bytes: buf.length, count: [...text].length });
    rules.push(
      `@font-face {\n  font-family: '${face.family}';\n  src: url('./fonts-${fonts.name}/${file}') format('woff2');\n  font-weight: ${face.weight};\n  font-style: normal;\n  font-display: swap;\n  unicode-range: ${unicodeRange([...text])};\n}`,
    );
  }
}
fs.writeFileSync(CSS, `${fonts.header}\n${rules.join('\n')}\n`);
fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest)}\n`);

const kb = (n: number) => `${(n / 1024).toFixed(0)} KB`;
const firstFace = fonts.faces[0].slug;
const first = manifest.slices.filter((s) => s.face === firstFace && /-0\./.test(s.file))[0];
console.log(
  `fonts:subset — ${chars.length} characters in ${slices.length} slices; ` +
    Object.entries(totals)
      .map(([f, n]) => `${f} ${kb(n)}`)
      .join(', ') +
    `; first ${fonts.firstSliceLabel} slice ${kb(first.bytes)}`,
);
if (totals[fonts.budget.slug] > fonts.budget.bytes) {
  console.error(`fonts:subset — ${fonts.budget.label} subset is ${kb(totals[fonts.budget.slug])}, over the ${kb(fonts.budget.bytes)} budget`);
  process.exit(1);
}
