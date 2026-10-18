// Makes tests/fixtures/live-export.json: progress exported from the LIVE standalone Mandarin Ladder
// (https://andifathulms.github.io/mandarin-ladder/, the source repo at dd8f5fa) by a scripted learner
// in a throwaway browser profile. The import test (tests/unit/live-import.test.ts and the e2e
// "imports a live export") checks the monorepo app reads it back and shows the same state.
//
// Usage (from apps/mandarin): node tests/fixtures/make-live-export.mjs [url]
//
// The learner: door 2 → placement, all correct (placed in Easy 1; Dasar 1–2 climbed via the check)
// → Easy 1 lesson 10 (with a trace item) to the end → the Dasar 2 reading capstone → Easy 1
// lesson 2 left at the Examples step → five word-deck cards → settings: dark, hanzi 140%, male
// voice, 0.75× → Settings → Ekspor.

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const BASE = (process.argv[2] || 'https://andifathulms.github.io/mandarin-ladder').replace(/\/$/, '');
const CONTENT = 'content';
const OUT = 'tests/fixtures/live-export.json';

const loadYaml = (p) => yaml.load(fs.readFileSync(path.join(CONTENT, p), 'utf8'), { schema: yaml.JSON_SCHEMA });
const loadLesson = (p) =>
  matter(fs.readFileSync(path.join(CONTENT, p), 'utf8'), { engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) } }).data;
const byId = (list) => Object.fromEntries(list.map((i) => [i.id, i]));
const lessonFile = (rung, order) => fs.readdirSync(path.join(CONTENT, rung)).find((f) => f.startsWith(String(order).padStart(2, '0') + '-'));

/** Option text without markup, spaces or pinyin (same strategy as the e2e helpers). */
const optionKey = (s) =>
  s
    .normalize('NFC')
    .replace(/\s*\([^()\p{Script=Han}]*\)/gu, '')
    .replace(/‍|\*\*|\*|\[\[|\]\]/g, '')
    .replace(/\s+/g, '');

const strokesFor = (char) => JSON.parse(fs.readFileSync(path.join('public', 'strokes', `${char.codePointAt(0).toString(16)}.json`), 'utf8'));

/** Draws every stroke of a character on the trace pad by following its medians. */
async function drawChar(page, scope, char) {
  const pad = scope.locator('[data-trace-pad]');
  await pad.waitFor();
  const box = await pad.boundingBox();
  const at = ([x, y]) => [box.x + (x / 1024) * box.width, box.y + ((900 - y) / 1024) * box.height];
  for (const median of strokesFor(char).medians) {
    const [x0, y0] = at(median[0]);
    await page.mouse.move(x0, y0);
    await page.mouse.down();
    for (let i = 1; i < median.length; i++) {
      const [a, b] = at(median[i - 1]);
      const [c, d] = at(median[i]);
      for (let k = 1; k <= 4; k++) await page.mouse.move(a + ((c - a) * k) / 4, b + ((d - b) * k) / 4);
    }
    await page.mouse.up();
  }
}

/** Answers the check item on screen correctly. */
async function answer(page, items, practice = true, scope = page.locator('[data-item]').first()) {
  const id = await scope.getAttribute('data-item');
  const item = items[id];
  if (!item) throw new Error(`unknown item ${id}`);
  const check = () => scope.getByRole('button', { name: /^(Periksa|Check)$/ }).click();
  if (item.type === 'tone') {
    await scope.locator(`[data-tones="${item.answer.join(',')}"]`).click();
  } else if (item.type === 'pinyin') {
    await scope.locator('[data-pinyin-input]').fill(item.answer);
    if (practice) await check();
  } else if (item.type === 'build') {
    for (const part of item.answer) await scope.locator(`[data-part="${part}"]`).first().click();
    if (practice) await check();
  } else if (item.type === 'trace') {
    await drawChar(page, scope, item.char);
  } else if (item.type === 'order') {
    for (const w of item.answer) await scope.locator(`[role="group"]:last-of-type [data-tile="${w}"]`).first().click();
    if (practice) await check();
  } else {
    const want = optionKey(item.answer);
    const pills = scope.locator('button[data-state]');
    const texts = await pills.evaluateAll((els) =>
      els.map((el) => {
        const c = el.cloneNode(true);
        c.querySelectorAll('rt, [aria-hidden="true"]').forEach((x) => x.remove());
        return c.textContent ?? '';
      }),
    );
    const i = texts.findIndex((t) => optionKey(t) === want);
    if (i < 0) throw new Error(`no option "${want}" for ${id}`);
    await pills.nth(i).click();
  }
  await page.waitForTimeout(250);
}
const next = async (page) => {
  await page.getByRole('button', { name: /^(Lanjut|Continue)/ }).click();
  await page.waitForTimeout(250);
};

const browser = await chromium.launch();
// A throwaway profile: a fresh context, deleted when the browser closes.
const ctx = await browser.newContext({ acceptDownloads: true });
const page = await ctx.newPage();

// 1. Door 2 → placement, all correct.
await page.goto(`${BASE}/`);
await page.getByRole('link', { name: /Cek dasar|Sudah/ }).first().click();
await page.getByRole('button', { name: /^Mulai/ }).first().click();
const placement = byId(loadYaml('placement.yaml').items);
for (let i = 0; i < 20; i++) {
  await answer(page, placement, false);
  await page.getByRole('button', { name: i === 19 ? /Lihat hasil/ : /^Lanjut/ }).click();
  await page.waitForTimeout(150);
}
await page.getByRole('heading', { name: '20 / 20' }).waitFor();

// 2. Easy 1 lesson 10 (a trace item among its checks) to the end.
const f10 = lessonFile('easy-1', 10);
const l10 = loadLesson(`easy-1/${f10}`);
await page.goto(`${BASE}/rung/easy-1/${f10.replace('.md', '')}/`);
for (let s = 0; s < 4; s++) await next(page);
for (let i = 0; i < l10.check.length; i++) {
  await answer(page, byId(l10.check));
  await next(page);
}
await page.getByRole('heading', { name: /^Selesai:/ }).waitFor();

// 3. The Dasar 2 reading capstone.
const reading = loadYaml('dasar-2/reading.yaml');
await page.goto(`${BASE}/rung/dasar-2/read/`);
for (let i = 0; i < reading.items.length; i++) await answer(page, byId(reading.items), true, page.locator('[data-item]').nth(i));
await page.waitForTimeout(500);

// 4. Easy 1 lesson 2, left at the Examples step.
await page.goto(`${BASE}/rung/easy-1/${lessonFile('easy-1', 2).replace('.md', '')}/`);
await next(page);
await next(page);
await page.getByRole('heading', { name: 'Contoh', level: 2 }).waitFor();

// 5. Five word-deck cards.
await page.goto(`${BASE}/words/#deck`);
await page.getByRole('button', { name: /^Mulai/ }).first().click();
for (let i = 0; i < 5; i++) {
  await page.getByRole('button', { name: 'Balik kartu' }).click();
  await page.getByRole('button', { name: i % 2 ? 'Belum ingat' : 'Ingat', exact: true }).click();
  await page.waitForTimeout(150);
}

// 6. Settings, then export.
await page.goto(`${BASE}/settings/`);
const pick = (group, name) => page.getByRole('radiogroup', { name: group }).getByRole('radio', { name }).click();
await pick('Tema', 'Gelap');
await pick('Ukuran hanzi', '140%');
await pick('Suara', 'Laki-laki');
await pick('Kecepatan suara', '0,75×');
const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Ekspor progres' }).click()]);
const json = fs.readFileSync(await download.path(), 'utf8');
fs.writeFileSync(OUT, json);
console.log(`${OUT} ← ${download.suggestedFilename()} from ${BASE} (${json.length} bytes)`);
await browser.close();
