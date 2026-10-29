// Parity screenshot harness for Spanish Ladder.
//
// Spanish was built on ladder-core (no source app to match), so this harness exists to gate later
// core changes: every route, the six lesson steps of three lessons (one per rung), the placement
// check, a rung test item, review, the deck and the visuals sheet, at 360px and 1280px, light and dark.
//
// Usage (from the monorepo root, with a static build served on PARITY_BASE_URL):
//   node apps/spanish/tests/parity/capture.mjs apps/spanish/tests/parity/baseline
//
// The baseline was captured from feat/spanish-ladder at M9, built with NEXT_PUBLIC_SHOW_DRAFTS=true
// and no base path.
//
// Determinism: a fixed Date, a seeded Math.random (the test and review draws), reduced motion,
// no transitions or animations, hidden caret, and a fresh context per shot. The lesson Done step
// is reached by resuming a stored step 5, so no typing is needed.

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const outDir = process.argv[2];
if (!outDir) {
  console.error('usage: node apps/spanish/tests/parity/capture.mjs <outDir>');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const BASE = process.env.PARITY_BASE_URL || 'http://localhost:4179';
const CONTENT = process.env.PARITY_CONTENT_DIR || 'apps/spanish/content';
const STORAGE_KEY = 'spanish-ladder:v1';

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

// One lesson per visual family; each one's first check item is answered with an option pill.
const LESSONS = [
  { name: 'dasar', url: '/rung/dasar/05-tekanan/', file: 'dasar/05-tekanan.md' },
  { name: 'easy1', url: '/rung/easy-1/07-ser-estar/', file: 'easy-1/07-ser-estar.md' },
  { name: 'easy2', url: '/rung/easy-2/06-me-gusta/', file: 'easy-2/06-me-gusta.md' },
];

const ROUTES = [
  { name: 'home', url: '/' },
  { name: 'placement', url: '/placement/' },
  { name: 'rung-dasar', url: '/rung/dasar/' },
  { name: 'rung-easy-1', url: '/rung/easy-1/' },
  { name: 'rung-easy-2', url: '/rung/easy-2/' },
  { name: 'rung-hard-3', url: '/rung/hard-3/' },
  { name: 'test-easy-1', url: '/rung/easy-1/test/' },
  { name: 'read-easy-1', url: '/rung/easy-1/read/' },
  { name: 'talk-easy-2', url: '/rung/easy-2/talk/' },
  { name: 'review', url: '/review/' },
  { name: 'words', url: '/words/' },
  { name: 'deck', url: '/words/#deck' },
  { name: 'visuals', url: '/visuals/' },
  { name: 'me', url: '/me/' },
  { name: 'settings', url: '/settings/' },
  { name: 'about', url: '/about/' },
  { name: 'not-found', url: '/no-such-page/' },
];

const FIXED = new Date('2026-10-29T09:30:00').getTime();
const DAY = 86_400_000;
const EASY = ['easy-1/01-hola.md', 'easy-1/02-soy-de.md', 'easy-1/03-el-la.md'];

function progressedState(theme) {
  const done = EASY.map(loadLesson);
  const lessons = {};
  const items = {};
  done.forEach((l, i) => {
    lessons[l.id] = { step: 5, furthest: 5, completed: true, lastOpened: FIXED - (3 - i) * DAY };
    l.check.forEach((c, k) => {
      items[c.id] = { firstTry: k % 2 === 0, box: k % 2 === 0 ? 2 : 1, lastSeen: FIXED - (3 - i) * DAY };
    });
  });
  const fourth = loadLesson('easy-1/04-plural.md');
  lessons[fourth.id] = { step: 2, furthest: 2, completed: false, lastOpened: FIXED - 3600_000 };
  return {
    schemaVersion: 1,
    lessons,
    items,
    rungs: {},
    capstones: {},
    placement: null,
    days: ['2026-10-26', '2026-10-27', '2026-10-28'],
    opened: [...done.map((l) => l.id), fourth.id],
    settings: { theme, motion: 'reduce' },
  };
}

const SEEDED = [
  { name: 'home-progress', url: '/' },
  { name: 'rung-easy-1-progress', url: '/rung/easy-1/' },
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

/** Option text without markup. */
const optionKey = (s) =>
  String(s)
    .normalize('NFC')
    .replace(/\*\*|\*|\[\[|\]\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Answers the item on screen: the right option pill, the stress chips, agree tiles, or any text in a typed field. */
async function answer(page, items) {
  const id = await page.locator('[data-item]').first().getAttribute('data-item');
  const item = items[id];
  if (!item) throw new Error(`unknown item ${id}`);
  const type = await page.locator('[data-item]').first().getAttribute('data-type');
  if (type === 'stress') {
    await page.getByRole('radiogroup', { name: 'Suku kata yang ditekan' }).getByRole('radio').nth(item.stressed).click();
    await page.getByRole('radiogroup', { name: 'Perlu aksen?' }).getByRole('radio', { name: item.needsAccent ? 'Ya' : 'Tidak' }).click();
    await check(page);
    return;
  }
  const input = page.locator('[data-item] input[type="text"]');
  if (await input.count()) {
    // Typed answers aren't needed for a deterministic shot; any input moves a test on.
    for (let i = 0; i < (await input.count()); i++) await input.nth(i).fill('a');
    return;
  }
  if (type === 'agree') {
    await page.getByRole('radiogroup', { name: 'Artikel' }).getByRole('radio', { name: item.answers.article, exact: true }).click();
    await page.getByRole('radiogroup', { name: 'Kata sifat' }).getByRole('radio', { name: item.answers.adjective, exact: true }).click();
    await check(page);
    return;
  }
  const pills = page.locator('[data-item] [role="group"] > button');
  const texts = await pills.evaluateAll((els) => els.map((el) => el.getAttribute('data-option') ?? el.textContent ?? ''));
  let i = texts.findIndex((t) => optionKey(t).replace(/^\d\s*/, '') === optionKey(item.answer));
  if (i < 0 && Array.isArray(item.options)) i = item.options.findIndex((o) => optionKey(o) === optionKey(item.answer));
  if (i < 0) throw new Error(`no option "${item.answer}" for ${id}`);
  await pills.nth(i).click();
  await page.waitForTimeout(250);
}

/** Practice: course item types are graded by Periksa (tests and placement have none). */
async function check(page) {
  const btn = page.getByRole('button', { name: 'Periksa' });
  if (await btn.count()) await btn.first().click();
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
    for (const [list, state] of [
      [ROUTES, fresh],
      [SEEDED, progressedState],
    ]) {
      for (const r of list) {
        if (!want(f(r.name))) continue;
        const { ctx, page } = await newPage(browser, vp, state(theme));
        await page.goto(BASE + r.url, { waitUntil: 'domcontentloaded' });
        await settle(page);
        await shot(page, f(r.name));
        await ctx.close();
      }
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
      if ([...names.slice(0, 5), `lesson-${lesson.name}-step4-correct`].some((n) => want(f(n)))) {
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
        await ctx.close();
      }
      if (want(f(names[5]))) {
        const state = fresh(theme);
        state.lessons = { [data.id]: { step: 5, furthest: 5, completed: false, lastOpened: FIXED - 60_000 } };
        const { ctx, page } = await newPage(browser, vp, state);
        await page.goto(BASE + lesson.url, { waitUntil: 'domcontentloaded' });
        await settle(page);
        await shot(page, f(names[5]));
        await ctx.close();
      }
    });
  }
}

async function capturePlacement(browser) {
  const p = loadYaml('placement.yaml');
  const items = byId(p.items);
  await each(async (vp, theme, f) => {
    if (!['placement-item', 'placement-result'].some((n) => want(f(n)))) return;
    const { ctx, page } = await newPage(browser, vp, fresh(theme));
    await page.goto(BASE + '/placement/', { waitUntil: 'domcontentloaded' });
    await settle(page);
    await page.getByRole('button', { name: /^Mulai/ }).first().click();
    await settle(page);
    await shot(page, f('placement-item'));
    for (let i = 0; i < p.items.length; i++) {
      await answer(page, items);
      await page.getByRole('button', { name: i === p.items.length - 1 ? /Lihat hasil/ : /^Lanjut/ }).click();
      await page.waitForTimeout(150);
    }
    await settle(page);
    await shot(page, f('placement-result'));
    await ctx.close();
  });
}

async function captureTestItem(browser) {
  await each(async (vp, theme, f) => {
    if (!want(f('test-item'))) return;
    const { ctx, page } = await newPage(browser, vp, fresh(theme));
    await page.goto(BASE + '/rung/easy-1/test/', { waitUntil: 'domcontentloaded' });
    await settle(page);
    await page.getByRole('button', { name: /^(Mulai|Start)/ }).first().click();
    await settle(page);
    await shot(page, f('test-item'));
    await ctx.close();
  });
}

/** The word deck: a card front and its back. */
async function captureDeck(browser) {
  await each(async (vp, theme, f) => {
    if (!['deck-card', 'deck-back'].some((n) => want(f(n)))) return;
    const { ctx, page } = await newPage(browser, vp, { ...fresh(theme), settings: { theme, motion: 'reduce', deckDaily: 5 } });
    await page.goto(BASE + '/words/#deck', { waitUntil: 'domcontentloaded' });
    await settle(page);
    await page.getByRole('button', { name: /^Mulai/ }).first().click();
    await settle(page);
    await shot(page, f('deck-card'));
    await page.getByRole('button', { name: 'Balik kartu' }).click();
    await settle(page);
    await shot(page, f('deck-back'));
    await ctx.close();
  });
}

const reachable = (url) =>
  fetch(url, { signal: AbortSignal.timeout(5000) })
    .then(() => true)
    .catch(() => false);

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
  await captureTestItem(browser);
  await captureDeck(browser);
} finally {
  await browser.close();
}
console.log('parity capture complete →', outDir);
