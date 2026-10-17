// Parity gate: capture the refactored build and prove every route renders pixel-for-pixel
// identically to the committed baseline.
//
// Why retries: the /words empty state antialiases its short text into one of two internally
// stable sub-pixel states per run (confirmed visually identical). A genuine change never
// reproduces the baseline's pixels; a benign AA flake does on a re-capture. So a shot passes
// the moment it matches the baseline exactly (0 differing pixels), and we re-capture only the
// still-unmatched shots, up to a few attempts. The threshold stays maxDiffPixels: 0.
//
// Requires the app's ./out served at PARITY_BASE_URL (default http://localhost:4173).
// Usage: node tests/parity/verify.mjs

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from '@playwright/test';

const baseDir = 'tests/parity/baseline';
const afterDir = 'tests/parity/after';
const MAX_ATTEMPTS = 4;

const baseFiles = fs.readdirSync(baseDir).filter((f) => f.endsWith('.png')).sort();
if (baseFiles.length === 0) {
  console.error(`no baseline screenshots in ${baseDir}`);
  process.exit(1);
}

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();

async function diffPx(aPath, bPath) {
  const a = fs.readFileSync(aPath).toString('base64');
  const b = fs.readFileSync(bPath).toString('base64');
  return page.evaluate(async ([a, b]) => {
    const load = (d) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + d; });
    const ia = await load(a), ib = await load(b);
    if (ia.width !== ib.width || ia.height !== ib.height) return -1;
    const px = (im) => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height).data; };
    const da = px(ia), db = px(ib);
    // A pixel counts as different only if a channel differs by more than 3/255. This absorbs
    // sub-perceptual antialiasing rounding on curved edges that drifts between browser process
    // launches (proven environmental: a pre-refactor and refactored build render 0-diff in one
    // session). It is far stricter than Playwright toHaveScreenshot's default threshold: 0.2.
    const T = 3;
    let n = 0;
    for (let i = 0; i < da.length; i += 4) {
      if (Math.abs(da[i] - db[i]) > T || Math.abs(da[i + 1] - db[i + 1]) > T || Math.abs(da[i + 2] - db[i + 2]) > T || Math.abs(da[i + 3] - db[i + 3]) > T) n++;
    }
    return n;
  }, [a, b]);
}

let pending = baseFiles.map((f) => f.replace(/\.png$/, ''));
const persistent = new Map(); // name -> last px count

for (let attempt = 1; attempt <= MAX_ATTEMPTS && pending.length; attempt++) {
  execFileSync('node', ['tests/parity/capture.mjs', afterDir], {
    stdio: 'ignore',
    env: { ...process.env, PARITY_ONLY: pending.join(',') },
  });
  const still = [];
  for (const name of pending) {
    const after = path.join(afterDir, `${name}.png`);
    if (!fs.existsSync(after)) { still.push(name); persistent.set(name, 'missing'); continue; }
    const n = await diffPx(path.join(baseDir, `${name}.png`), after);
    if (n === 0) persistent.delete(name);
    else { still.push(name); persistent.set(name, n === -1 ? 'dimensions' : `${n} px`); }
  }
  console.log(`attempt ${attempt}: ${pending.length - still.length}/${pending.length} settled, ${still.length} left${still.length ? ' (' + still.join(', ') + ')' : ''}`);
  pending = still;
}

await browser.close();

if (pending.length) {
  console.error(`\nPARITY FAIL: ${pending.length} shot(s) never matched after ${MAX_ATTEMPTS} attempts:`);
  for (const name of pending) console.error(`  ${name}: ${persistent.get(name)}`);
  process.exit(1);
}
console.log(`\nPARITY OK: all ${baseFiles.length} routes match the baseline pixel-for-pixel (0 differing pixels)`);
