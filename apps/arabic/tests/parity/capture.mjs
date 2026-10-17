// Parity screenshot harness for the Arabic Ladder migration.
//
// Captures every route of Arabic Ladder, plus the flows the migration brief names (all six
// lesson steps for one lesson per live rung, the placement check, a test results screen, the
// climb moment, My words, settings and about), at 360px and 1280px, light and dark.
//
// Usage (from the monorepo root, with a static build served on PARITY_BASE_URL):
//   node apps/arabic/tests/parity/capture.mjs apps/arabic/tests/parity/baseline
//
// The baseline was captured from the source repo (../arabic-ladder at aedfae7) built with
// NEXT_PUBLIC_SHOW_DRAFTS=true and no base path; PARITY_CONTENT_DIR pointed at its content/.
//
// Determinism: a fixed Date, a seeded Math.random (the test and review draws), reduced motion,
// no transitions or animations, hidden caret, and a fresh context per shot.

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from '@playwright/test';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const outDir = process.argv[2];
if (!outDir) {
  console.error('usage: node apps/arabic/tests/parity/capture.mjs <outDir>');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const BASE = process.env.PARITY_BASE_URL || 'http://localhost:4174';
const CONTENT = process.env.PARITY_CONTENT_DIR || 'apps/arabic/content';
const STORAGE_KEY = 'arabic-ladder:v1';

const VIEWPORTS = [
  { tag: '360', width: 360, height: 780 },
  { tag: '1280', width: 1280, height: 900 },
];
const THEMES = ['light', 'dark'];

const ONLY = (process.env.PARITY_ONLY || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const want = (file) => ONLY.length === 0 || ONLY.includes(file.replace(/\.png$/, ''));

const loadYaml = (p) => yaml.load(fs.readFileSync(path.join(CONTENT, p), 'utf8'), { schema: yaml.JSON_SCHEMA });
const loadLesson = (p) =>
  matter(fs.readFileSync(path.join(CONTENT, p), 'utf8'), {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  }).data;
const byId = (list) => Object.fromEntries(list.map((i) => [i.id, i]));

// One lesson per live rung, each with a visual on its See step.
const LESSONS = [
  { name: 'huruf1', url: '/rung/huruf-1/02-ba-ta-tsa/', file: 'huruf-1/02-ba-ta-tsa.md' },
  { name: 'huruf2', url: '/rung/huruf-2/05-syamsiyah-qamariyah/', file: 'huruf-2/05-syamsiyah-qamariyah.md' },
  { name: 'easy1', url: '/rung/easy-1/12-prepositions/', file: 'easy-1/12-prepositions.md' },
];

// Fresh-state routes: every page in the static export.
const ROUTES = [
  { name: 'home', url: '/' },
  { name: 'placement', url: '/placement/' },
  { name: 'rung-huruf-1', url: '/rung/huruf-1/' },
  { name: 'rung-huruf-2', url: '/rung/huruf-2/' },
  { name: 'rung-easy-1', url: '/rung/easy-1/' },
  { name: 'rung-hard-3', url: '/rung/hard-3/' },
  { name: 'test-huruf-1', url: '/rung/huruf-1/test/' },
  { name: 'test-easy-1', url: '/rung/easy-1/test/' },
  { name: 'read-huruf-2', url: '/rung/huruf-2/read/' },
  { name: 'read-easy-1', url: '/rung/easy-1/read/' },
  { name: 'talk-easy-1', url: '/rung/easy-1/talk/' },
  { name: 'review', url: '/review/' },
  { name: 'words', url: '/words/' },
  { name: 'me', url: '/me/' },
  { name: 'settings', url: '/settings/' },
  { name: 'about', url: '/about/' },
  { name: 'joining', url: '/joining/' },
  { name: 'not-found', url: '/no-such-page/' },
];

// A learner a few lessons in: continue card, filled My words, progress on Saya, a review due.
const FIXED = new Date('2026-10-17T09:30:00').getTime();
const DAY = 86_400_000;
function progressedState(theme) {
  const done = ['huruf-1/01-kamu-sudah-tahu.md', 'huruf-1/02-ba-ta-tsa.md', 'huruf-1/03-nun-ya.md'].map(loadLesson);
  const lessons = {};
  const items = {};
  done.forEach((l, i) => {
    lessons[l.id] = { step: 5, furthest: 5, completed: true, lastOpened: FIXED - (3 - i) * DAY };
    l.check.forEach((c, k) => {
      items[c.id] = { firstTry: k % 2 === 0, box: k % 2 === 0 ? 2 : 1, lastSeen: FIXED - (3 - i) * DAY };
    });
  });
  const fourth = loadLesson('huruf-1/04-jim-ha-kha.md');
  lessons[fourth.id] = { step: 2, furthest: 2, completed: false, lastOpened: FIXED - 3600_000 };
  return {
    schemaVersion: 1,
    lessons,
    items,
    rungs: {},
    capstones: {},
    placement: null,
    days: ['2026-10-14', '2026-10-15', '2026-10-16'],
    opened: [...done.map((l) => l.id), fourth.id],
    settings: { theme, motion: 'reduce' },
  };
}
const SEEDED = [
  { name: 'home-progress', url: '/' },
  { name: 'rung-huruf-1-progress', url: '/rung/huruf-1/' },
  { name: 'words-progress', url: '/words/' },
  { name: 'me-progress', url: '/me/' },
  { name: 'review-progress', url: '/review/' },
];

const NO_MOTION_CSS = `*,*::before,*::after{transition:none!important;animation:none!important;animation-duration:0s!important;caret-color:transparent!important;scroll-behavior:auto!important}`;

async function newPage(browser, viewport, state) {
  const ctx = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript(
    ({ fixed, key, state }) => {
      const RealDate = Date;
      function FakeDate(...args) {
        return args.length ? new RealDate(...args) : new RealDate(fixed);
      }
      FakeDate.now = () => fixed;
      FakeDate.parse = RealDate.parse;
      FakeDate.UTC = RealDate.UTC;
      FakeDate.prototype = RealDate.prototype;
      // eslint-disable-next-line no-global-assign
      window.Date = FakeDate;
      // Seeded Math.random (mulberry32) so test and review draws are reproducible.
      let a = 0x5eed;
      Math.random = () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
      try {
        if (!sessionStorage.getItem('parity-seeded')) {
          localStorage.setItem(key, JSON.stringify(state));
          sessionStorage.setItem('parity-seeded', '1');
        }
      } catch {}
    },
    { fixed: FIXED, key: STORAGE_KEY, state },
  );
  const page = await ctx.newPage();
  return { ctx, page };
}
const fresh = (theme) => ({ schemaVersion: 1, settings: { theme, motion: 'reduce' } });

async function settle(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.addStyleTag({ content: NO_MOTION_CSS }).catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await page.waitForTimeout(400);
}

async function shot(page, file) {
  if (!want(file)) return;
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

const pillText = async (el) =>
  ((await el.textContent()) ?? '')
    .replace(/‍/g, '')
    .replace(/^\d/, '')
    .trim()
    .normalize('NFC');

/** Answers the check item on screen correctly (same strategy as the source e2e helpers). */
async function answer(page, items, practice = true) {
  const id = await page.locator('[data-item]').first().getAttribute('data-item');
  const item = items[id];
  if (!item) throw new Error(`unknown item ${id}`);
  if (item.type === 'order' || item.type === 'spell') {
    const seq = item.type === 'spell' ? item.letters : item.answer;
    for (const w of seq) {
      await page.locator(`[data-item] [role="group"]:last-of-type [data-tile="${w}"]`).first().click();
    }
    if (practice) await page.getByRole('button', { name: /^(Periksa|Check)$/ }).click();
  } else if (item.type === 'mark') {
    await page.locator(`[data-item] [data-mark="${item.answer}"]`).click();
  } else {
    const target = String(item.answer).normalize('NFC');
    const pills = page.locator('[data-item] button[data-state]');
    const n = await pills.count();
    for (let i = 0; i < n; i++) {
      if ((await pillText(pills.nth(i))) === target) {
        await pills.nth(i).click();
        await page.waitForTimeout(250);
        return;
      }
    }
    throw new Error(`no option "${target}" for ${id}`);
  }
  await page.waitForTimeout(250);
}

async function next(page) {
  await page.getByRole('button', { name: /^(Lanjut|Continue)/ }).click();
  await page.waitForTimeout(250);
}

async function each(fn) {
  for (const vp of VIEWPORTS) for (const theme of THEMES) await fn(vp, theme, (n) => `${n}__${theme}__${vp.tag}.png`);
}

async function captureRoutes(browser) {
  await each(async (vp, theme, f) => {
    for (const r of ROUTES) {
      if (!want(f(r.name))) continue;
      const { ctx, page } = await newPage(browser, vp, fresh(theme));
      await page.goto(BASE + r.url, { waitUntil: 'domcontentloaded' });
      await settle(page);
      await shot(page, f(r.name));
      await ctx.close();
    }
    for (const r of SEEDED) {
      if (!want(f(r.name))) continue;
      const { ctx, page } = await newPage(browser, vp, progressedState(theme));
      await page.goto(BASE + r.url, { waitUntil: 'domcontentloaded' });
      await settle(page);
      await shot(page, f(r.name));
      await ctx.close();
    }
  });
}

async function captureReviewRunning(browser) {
  await each(async (vp, theme, f) => {
    if (!want(f('review-running'))) return;
    const { ctx, page } = await newPage(browser, vp, progressedState(theme));
    await page.goto(BASE + '/review/', { waitUntil: 'domcontentloaded' });
    await settle(page);
    await page.getByRole('button', { name: /^(Mulai|Start)/ }).first().click();
    await settle(page);
    await shot(page, f('review-running'));
    await ctx.close();
  });
}

async function captureLessons(browser) {
  for (const lesson of LESSONS) {
    const data = loadLesson(lesson.file);
    const items = byId(data.check);
    await each(async (vp, theme, f) => {
      const names = [0, 1, 2, 3, 4, 5].map((n) => `lesson-${lesson.name}-step${n}`);
      if (![...names, `lesson-${lesson.name}-step4-correct`].some((n) => want(f(n)))) return;
      const { ctx, page } = await newPage(browser, vp, fresh(theme));
      await page.goto(BASE + lesson.url, { waitUntil: 'domcontentloaded' });
      await settle(page);
      for (let s = 0; s < 4; s++) {
        await shot(page, f(names[s]));
        await next(page);
        await settle(page);
      }
      await shot(page, f(names[4]));
      await answer(page, items);
      await settle(page);
      await shot(page, f(`lesson-${lesson.name}-step4-correct`));
      await next(page);
      for (let i = 1; i < data.check.length; i++) {
        await answer(page, items);
        await next(page);
      }
      await settle(page);
      await shot(page, f(names[5]));
      await ctx.close();
    });
  }
}

async function capturePlacement(browser) {
  const items = byId(loadYaml('placement.yaml').items);
  await each(async (vp, theme, f) => {
    if (!['placement-item', 'placement-result'].some((n) => want(f(n)))) return;
    const { ctx, page } = await newPage(browser, vp, fresh(theme));
    await page.goto(BASE + '/placement/', { waitUntil: 'domcontentloaded' });
    await settle(page);
    await page.getByRole('button', { name: /Mulai cek/ }).click();
    await settle(page);
    await shot(page, f('placement-item'));
    for (let i = 0; i < 20; i++) {
      await answer(page, items, false);
      await page.getByRole('button', { name: i === 19 ? /Lihat hasil/ : /^Lanjut/ }).click();
      await page.waitForTimeout(150);
    }
    await settle(page);
    await shot(page, f('placement-result'));
    await ctx.close();
  });
}

async function captureTest(browser) {
  const pool = loadYaml('huruf-1/test.yaml');
  const items = byId(pool.items);
  await each(async (vp, theme, f) => {
    if (!['test-item', 'climb', 'test-result'].some((n) => want(f(n)))) return;
    const { ctx, page } = await newPage(browser, vp, fresh(theme));
    await page.goto(BASE + '/rung/huruf-1/test/', { waitUntil: 'domcontentloaded' });
    await settle(page);
    await page.getByRole('button', { name: /^(Mulai|Start)/ }).first().click();
    await settle(page);
    await shot(page, f('test-item'));
    for (let i = 0; i < pool.draw; i++) {
      await answer(page, items, false);
      await page.getByRole('button', { name: i === pool.draw - 1 ? /^(Selesai|Lihat hasil|Finish|See)/ : /^(Lanjut|Continue)/ }).click();
      await page.waitForTimeout(150);
    }
    await settle(page);
    await shot(page, f('climb'));
    await page.getByRole('dialog').getByRole('button').last().click();
    await settle(page);
    await shot(page, f('test-result'));
    await ctx.close();
  });
}

const reachable = (url) =>
  new Promise((resolve) => {
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

if (!(await reachable(BASE))) {
  console.error(`no server at ${BASE}`);
  process.exit(1);
}

const browser = await chromium.launch();
try {
  await captureRoutes(browser);
  await captureReviewRunning(browser);
  await captureLessons(browser);
  await capturePlacement(browser);
  await captureTest(browser);
} finally {
  await browser.close();
}
console.log('parity capture complete →', outDir);
