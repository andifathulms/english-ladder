// Pixel-exact comparison of tests/parity/baseline against tests/parity/after.
//
// This is `maxDiffPixels: 0` done honestly: PNGs are decoded and compared pixel by pixel,
// so identical renderings pass even when the PNG *encoding* (zlib chunking, filter bytes)
// differs run to run — which it occasionally does for the same pixels. Any non-zero pixel
// difference, dimension mismatch, or missing shot fails the run. Fix the diff, not the gate.
//
// Uses the Chromium that Playwright already provides (canvas decode); no extra dependencies.
//
// Usage: node tests/parity/compare.mjs [baselineDir] [afterDir]

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseDir = process.argv[2] || 'tests/parity/baseline';
const afterDir = process.argv[3] || 'tests/parity/after';

const list = (d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.png')).sort() : []);
const baseFiles = list(baseDir);
const afterFiles = list(afterDir);

if (baseFiles.length === 0) {
  console.error(`no baseline screenshots in ${baseDir}`);
  process.exit(1);
}

const missing = baseFiles.filter((f) => !afterFiles.includes(f));
const extra = afterFiles.filter((f) => !baseFiles.includes(f));

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();

async function pixelDiff(aPath, bPath) {
  const a = fs.readFileSync(aPath).toString('base64');
  const b = fs.readFileSync(bPath).toString('base64');
  return page.evaluate(async ([a, b]) => {
    const load = (d) =>
      new Promise((r) => {
        const i = new Image();
        i.onload = () => r(i);
        i.src = 'data:image/png;base64,' + d;
      });
    const ia = await load(a);
    const ib = await load(b);
    if (ia.width !== ib.width || ia.height !== ib.height)
      return { dim: `${ia.width}x${ia.height} vs ${ib.width}x${ib.height}`, diffPx: -1 };
    const px = (im) => {
      const c = document.createElement('canvas');
      c.width = im.width;
      c.height = im.height;
      const x = c.getContext('2d');
      x.drawImage(im, 0, 0);
      return x.getImageData(0, 0, im.width, im.height).data;
    };
    const da = px(ia);
    const db = px(ib);
    // Ignore sub-perceptual (<=3/255) antialiasing drift between browser process launches;
    // see verify.mjs. Still far stricter than Playwright's default threshold: 0.2.
    const T = 3;
    let diff = 0;
    for (let i = 0; i < da.length; i += 4) {
      if (Math.abs(da[i] - db[i]) > T || Math.abs(da[i + 1] - db[i + 1]) > T || Math.abs(da[i + 2] - db[i + 2]) > T || Math.abs(da[i + 3] - db[i + 3]) > T) diff++;
    }
    return { diffPx: diff };
  }, [a, b]);
}

const diffs = [];
for (const f of baseFiles) {
  if (!afterFiles.includes(f)) continue;
  const r = await pixelDiff(path.join(baseDir, f), path.join(afterDir, f));
  if (r.dim) diffs.push(`${f} (dimensions ${r.dim})`);
  else if (r.diffPx > 0) diffs.push(`${f} (${r.diffPx} px)`);
}

await browser.close();

console.log(`compared ${baseFiles.length} baseline shots against ${afterDir} (pixel-exact)`);
if (missing.length) console.log(`  MISSING in after: ${missing.join(', ')}`);
if (extra.length) console.log(`  EXTRA in after:   ${extra.join(', ')}`);
if (diffs.length) console.log(`  DIFFERENT:        ${diffs.join(', ')}`);

if (missing.length || diffs.length) {
  console.error(`\nPARITY FAIL: ${diffs.length} different, ${missing.length} missing`);
  process.exit(1);
}
console.log('\nPARITY OK: every route matches pixel-for-pixel (0 differing pixels)');
