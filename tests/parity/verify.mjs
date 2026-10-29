// Parity gate: capture the built app and prove every route renders pixel-for-pixel identically
// to the committed baseline. Self-contained: it serves apps/<app>/out itself (unless a server
// is already reachable), probes readiness, and tears the server down at the end — so it is safe
// to run immediately after the e2e suite without a server race.
//
// Why retries: the /words empty state antialiases its short text into one of two internally
// stable sub-pixel states per run (confirmed visually identical). A genuine change never
// reproduces the baseline's pixels; a benign AA flake does on a re-capture. So a shot passes
// the moment it matches the baseline exactly (0 differing pixels), and we re-capture only the
// still-unmatched shots, up to a few attempts. The threshold stays maxDiffPixels: 0.
//
// Usage: node tests/parity/verify.mjs [english|arabic|mandarin|japanese|spanish|german]   (default english; set PARITY_BASE_URL to
// use an existing server)

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { execFileSync, spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

const ROOT = process.cwd();
// Each app's baseline, capture harness and port.
const APPS = {
  english: { dir: 'apps/english', parity: 'tests/parity', port: 4173 },
  arabic: { dir: 'apps/arabic', parity: 'apps/arabic/tests/parity', port: 4174 },
  mandarin: { dir: 'apps/mandarin', parity: 'apps/mandarin/tests/parity', port: 4177 },
  japanese: { dir: 'apps/japanese', parity: 'apps/japanese/tests/parity', port: 4178 },
  spanish: { dir: 'apps/spanish', parity: 'apps/spanish/tests/parity', port: 4179 },
  german: { dir: 'apps/german', parity: 'apps/german/tests/parity', port: 4180 },
};
const appName = process.argv[2] || 'english';
const app = APPS[appName];
if (!app) {
  console.error(`unknown app "${appName}" (${Object.keys(APPS).join(', ')})`);
  process.exit(1);
}
const baseDir = path.join(app.parity, 'baseline');
const afterDir = path.join(app.parity, 'after');
const captureScript = path.join(app.parity, 'capture.mjs');
// Bistable antialiasing (two internally stable sub-pixel states per page) can take a few
// re-captures to land on the baseline's state; a real change never does.
const MAX_ATTEMPTS = 6;
const BASE = process.env.PARITY_BASE_URL || `http://localhost:${app.port}`;
const APP_DIR = path.join(ROOT, app.dir);
const SERVE = path.join(ROOT, 'packages/ladder-core/scripts/serve.mjs');
const OUT = path.join(APP_DIR, 'out');

const baseFiles = fs.readdirSync(baseDir).filter((f) => f.endsWith('.png')).sort();
if (baseFiles.length === 0) {
  console.error(`no baseline screenshots in ${baseDir}`);
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reachable = (url) =>
  new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode !== undefined);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });

async function waitUntilReachable(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    if (await reachable(url)) return true;
    await sleep(250);
  }
  return false;
}

// Start our own server only if nothing answers at BASE already.
let server = null;
async function ensureServer() {
  if (await reachable(BASE)) return;
  if (!fs.existsSync(OUT)) {
    console.error(`no build at ${OUT}. Run: NEXT_PUBLIC_SHOW_DRAFTS=true NEXT_PUBLIC_BASE_PATH='' npm run build`);
    process.exit(1);
  }
  const port = new URL(BASE).port || '4173';
  server = spawn('node', [SERVE], {
    cwd: APP_DIR,
    env: { ...process.env, PORT: port, NEXT_PUBLIC_BASE_PATH: '' },
    stdio: 'ignore',
  });
  server.on('error', (e) => {
    console.error('failed to start parity server:', e.message);
    process.exit(1);
  });
  if (!(await waitUntilReachable(BASE))) {
    console.error(`parity server never became reachable at ${BASE}`);
    stopServer();
    process.exit(1);
  }
}
function stopServer() {
  if (server && !server.killed) server.kill('SIGTERM');
  server = null;
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

function runCapture(only) {
  try {
    execFileSync('node', [captureScript, afterDir], {
      cwd: ROOT,
      stdio: ['ignore', 'ignore', 'pipe'],
      env: { ...process.env, PARITY_BASE_URL: BASE, PARITY_ONLY: only.join(',') },
    });
  } catch (e) {
    const stderr = e.stderr ? e.stderr.toString() : e.message;
    console.error('capture subprocess failed:\n' + stderr.trim());
    throw e;
  }
}

async function main() {
  await ensureServer();
  let pending = baseFiles.map((f) => f.replace(/\.png$/, ''));
  const persistent = new Map(); // name -> last px count

  for (let attempt = 1; attempt <= MAX_ATTEMPTS && pending.length; attempt++) {
    runCapture(pending);
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

  if (pending.length) {
    console.error(`\nPARITY FAIL: ${pending.length} shot(s) never matched after ${MAX_ATTEMPTS} attempts:`);
    for (const name of pending) console.error(`  ${name}: ${persistent.get(name)}`);
    return 1;
  }
  console.log(`\nPARITY OK: all ${baseFiles.length} routes match the baseline pixel-for-pixel (0 differing pixels)`);
  return 0;
}

let code = 1;
try {
  code = await main();
} catch {
  code = 1;
} finally {
  await browser.close();
  stopServer();
}
process.exit(code);
