// Parity screenshot harness for the ladder-core refactor.
//
// Captures the routes listed in the refactor brief at 360px and 1280px, in light
// and dark, so the "before" and "after" trees can be compared pixel by pixel.
//
// Usage:
//   node scripts/serve.mjs &            # serve ./out on :4173 (base path '')
//   node tests/parity/capture.mjs tests/parity/baseline
//   node tests/parity/capture.mjs tests/parity/after
//   node tests/parity/compare.mjs       # diff the two trees
//
// Determinism: a fixed Date (greeting/today), reduced motion, no transitions or
// animations, hidden caret, and a fresh context per shot so progress never leaks
// between captures. The build under ./out must be made with NEXT_PUBLIC_SHOW_DRAFTS=true.

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import matter from 'gray-matter';

const outDir = process.argv[2];
if (!outDir) {
  console.error('usage: node tests/parity/capture.mjs <outDir>');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const BASE = process.env.PARITY_BASE_URL || 'http://localhost:4173';
const LESSON = '/rung/easy-1/09-prepositions-place/';

const VIEWPORTS = [
  { tag: '360', width: 360, height: 780 },
  { tag: '1280', width: 1280, height: 900 },
];
const THEMES = ['light', 'dark'];

// Optional filter (comma-separated shot basenames without .png) so verify.mjs can re-capture
// only the shots it still needs to settle. Empty = capture everything.
const ONLY = (process.env.PARITY_ONLY || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const want = (file) => ONLY.length === 0 || ONLY.includes(file.replace(/\.png$/, ''));

const ROUTES = [
  { name: 'home', url: '/' },
  { name: 'rung-easy-1', url: '/rung/easy-1/' },
  { name: 'test', url: '/rung/easy-1/test/' },
  { name: 'review', url: '/review/' },
  { name: 'words', url: '/words/' },
  { name: 'me', url: '/me/' },
  { name: 'settings', url: '/settings/' },
  { name: 'about', url: '/about/' },
  { name: 'read', url: '/rung/easy-1/read/' },
];

// Answer map for the prepositions lesson, read from the English course content.
const CONTENT = process.env.PARITY_CONTENT_DIR || 'apps/english/content';
const lessonMd = matter(fs.readFileSync(path.join(CONTENT, 'easy-1/09-prepositions-place.md'), 'utf8'));
const items = Object.fromEntries(lessonMd.data.check.map((i) => [i.id, i]));

const NO_MOTION_CSS = `*,*::before,*::after{transition:none!important;animation:none!important;animation-duration:0s!important;caret-color:transparent!important;scroll-behavior:auto!important}`;

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function newPage(browser, viewport, theme) {
  const ctx = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript((theme) => {
    // Fixed clock without freezing timers: deterministic greeting/date, live setTimeout.
    const RealDate = Date;
    const fixed = new RealDate('2026-10-17T09:30:00').getTime();
    function FakeDate(...args) {
      return args.length ? new RealDate(...args) : new RealDate(fixed);
    }
    FakeDate.now = () => fixed;
    FakeDate.parse = RealDate.parse;
    FakeDate.UTC = RealDate.UTC;
    FakeDate.prototype = RealDate.prototype;
    // eslint-disable-next-line no-global-assign
    window.Date = FakeDate;
    try {
      localStorage.setItem(
        'english-ladder:v1',
        JSON.stringify({ schemaVersion: 2, settings: { theme, motion: 'reduce' } }),
      );
    } catch {}
  }, theme);
  const page = await ctx.newPage();
  return { ctx, page };
}

async function settle(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.addStyleTag({ content: NO_MOTION_CSS }).catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await page.waitForTimeout(400);
}

// Capture until two consecutive frames are byte-identical, so a rare paint/settle race
// under full-suite load never leaks a half-rendered frame. compare.mjs then diffs by pixel,
// so benign PNG-encoding noise between two settled frames is ignored.
async function shot(page, file) {
  let prev = null;
  let buf = null;
  for (let i = 0; i < 8; i++) {
    buf = await page.screenshot({ fullPage: true, animations: 'disabled' });
    if (prev && prev.equals(buf)) break;
    prev = buf;
    await page.waitForTimeout(150);
  }
  fs.writeFileSync(path.join(outDir, file), buf);
}

async function lanjut(page) {
  await page.getByRole('button', { name: /^(Lanjut|Continue)/ }).click();
  await page.waitForTimeout(250);
}

async function answer(page) {
  const id = await page.locator('[data-item]').getAttribute('data-item');
  const item = items[id];
  if (item.type === 'order') {
    for (const w of item.answer) {
      await page
        .locator('[data-item] [role="group"]')
        .last()
        .getByRole('button', { name: new RegExp(`^${esc(w)}$`) })
        .first()
        .click();
    }
    const check = page.getByRole('button', { name: /^(Periksa|Check)$/ });
    if (await check.count()) await check.click();
  } else {
    await page
      .locator('[data-item] button[data-state]')
      .filter({ hasText: new RegExp(`^${esc(item.answer)}$`) })
      .click();
  }
  await page.waitForTimeout(250);
}

async function captureRoutes(browser) {
  for (const vp of VIEWPORTS) {
    for (const theme of THEMES) {
      for (const route of ROUTES) {
        const file = `${route.name}__${theme}__${vp.tag}.png`;
        if (!want(file)) continue;
        const { ctx, page } = await newPage(browser, vp, theme);
        await page.goto(BASE + route.url, { waitUntil: 'domcontentloaded' });
        await settle(page);
        await shot(page, file);
        await ctx.close();
      }
    }
  }
}

async function captureLessonSteps(browser) {
  for (const vp of VIEWPORTS) {
    for (const theme of THEMES) {
      const files = [0, 1, 2, 3, 4, 5].map((n) => `lesson-step${n}__${theme}__${vp.tag}.png`);
      if (!files.some(want)) continue;
      const maybeShot = async (page, file) => {
        if (want(file)) await shot(page, file);
      };
      const { ctx, page } = await newPage(browser, vp, theme);
      await page.goto(BASE + LESSON, { waitUntil: 'domcontentloaded' });
      await settle(page);
      // step 0 Concept, 1 See, 2 Examples, 3 Contrast
      await maybeShot(page, files[0]);
      await lanjut(page); // -> See
      await settle(page);
      await maybeShot(page, files[1]);
      await lanjut(page); // -> Examples
      await settle(page);
      await maybeShot(page, files[2]);
      await lanjut(page); // -> Contrast
      await settle(page);
      await maybeShot(page, files[3]);
      await lanjut(page); // -> Check (first item)
      await settle(page);
      await maybeShot(page, files[4]);
      // Answer all items to reach Done.
      const n = lessonMd.data.check.length;
      for (let i = 0; i < n; i++) {
        await answer(page);
        await lanjut(page);
      }
      await settle(page);
      await maybeShot(page, files[5]);
      await ctx.close();
    }
  }
}

async function reachable(url) {
  const http = await import('node:http');
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

if (!(await reachable(BASE))) {
  console.error(`no server at ${BASE}. Serve apps/english/out first, or run tests/parity/verify.mjs.`);
  process.exit(1);
}

const browser = await chromium.launch();
try {
  await captureRoutes(browser);
  await captureLessonSteps(browser);
} finally {
  await browser.close();
}
console.log('parity capture complete →', outDir);
