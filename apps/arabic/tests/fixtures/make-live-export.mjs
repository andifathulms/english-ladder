// Makes tests/fixtures/live-export.json: progress exported from the LIVE standalone Arabic Ladder
// (https://andifathulms.github.io/arabic-ladder/, the source repo at aedfae7) by a scripted learner
// in a throwaway browser profile. The import test (tests/unit/live-import.test.ts and the e2e
// "imports a live export") checks the monorepo app reads it back and shows the same state.
//
// Usage (from apps/arabic): node tests/fixtures/make-live-export.mjs [url]
//
// The learner: door 2 → placement, all correct (placed in Easy 1; Huruf 1–2 climbed via the
// check) → Easy 1 lesson 1 to the end → the Huruf 2 reading capstone → Easy 1 lesson 2 left at
// the Examples step → settings: dark, Arabic 140%, male voice, 0.75× → Settings → Ekspor.

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const BASE = (process.argv[2] || 'https://andifathulms.github.io/arabic-ladder').replace(/\/$/, '');
const CONTENT = 'content';
const OUT = 'tests/fixtures/live-export.json';

const loadYaml = (p) => yaml.load(fs.readFileSync(path.join(CONTENT, p), 'utf8'), { schema: yaml.JSON_SCHEMA });
const loadLesson = (p) =>
  matter(fs.readFileSync(path.join(CONTENT, p), 'utf8'), { engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) } }).data;
const byId = (list) => Object.fromEntries(list.map((i) => [i.id, i]));
const lessonFile = (rung, order) => fs.readdirSync(path.join(CONTENT, rung)).find((f) => f.startsWith(String(order).padStart(2, '0') + '-'));
const pillText = async (el) => ((await el.textContent()) ?? '').replace(/‍/g, '').replace(/^\d/, '').trim().normalize('NFC');

/** Answers the check item on screen correctly (same strategy as the e2e helpers). */
async function answer(page, items, practice = true, scope = page.locator('[data-item]').first()) {
  const id = await scope.getAttribute('data-item');
  const item = items[id];
  if (item.type === 'order' || item.type === 'spell') {
    const seq = item.type === 'spell' ? item.letters : item.answer;
    for (const w of seq) await scope.locator(`[role="group"]:last-of-type [data-tile="${w}"]`).first().click();
    if (practice) await scope.getByRole('button', { name: /^(Periksa|Check)$/ }).click();
  } else if (item.type === 'mark') {
    await scope.locator(`[data-mark="${item.answer}"]`).click();
  } else {
    const want = String(item.answer).normalize('NFC');
    const pills = scope.locator('button[data-state]');
    const n = await pills.count();
    for (let i = 0; i < n; i++) {
      if ((await pillText(pills.nth(i))) === want) {
        await pills.nth(i).click();
        return;
      }
    }
    throw new Error(`no option "${want}" for ${id}`);
  }
}
const next = (page) => page.getByRole('button', { name: /^(Lanjut|Continue)/ }).click();

const browser = await chromium.launch();
// A throwaway profile: a fresh context, deleted when the browser closes.
const ctx = await browser.newContext({ acceptDownloads: true });
const page = await ctx.newPage();

// 1. Door 2 → placement, all correct.
await page.goto(`${BASE}/`);
await page.getByRole('link', { name: /Sudah bisa baca Al-Qur'an/ }).click();
await page.getByRole('button', { name: /Mulai cek/ }).click();
const placement = byId(loadYaml('placement.yaml').items);
for (let i = 0; i < 20; i++) {
  await answer(page, placement, false);
  await page.getByRole('button', { name: i === 19 ? /Lihat hasil/ : /^Lanjut/ }).click();
}
await page.getByRole('heading', { name: '20 / 20' }).waitFor();

// 2. Easy 1 lesson 1 to the end.
const l1 = loadLesson(`easy-1/${lessonFile('easy-1', 1)}`);
await page.goto(`${BASE}/rung/easy-1/${lessonFile('easy-1', 1).replace('.md', '')}/`);
for (let s = 0; s < 4; s++) await next(page);
for (let i = 0; i < l1.check.length; i++) {
  await answer(page, byId(l1.check));
  await next(page);
}
await page.getByRole('heading', { name: /^Selesai:/ }).waitFor();

// 3. The Huruf 2 reading capstone.
const reading = loadYaml('huruf-2/reading.yaml');
await page.goto(`${BASE}/rung/huruf-2/read/`);
for (let i = 0; i < reading.items.length; i++) await answer(page, byId(reading.items), true, page.locator('[data-item]').nth(i));
await page.getByText(/Kamu baru saja membaca satu teks utuh/).waitFor();

// 4. Easy 1 lesson 2, left at the Examples step.
await page.goto(`${BASE}/rung/easy-1/${lessonFile('easy-1', 2).replace('.md', '')}/`);
await next(page);
await next(page);
await page.getByRole('heading', { name: 'Contoh', level: 2 }).waitFor();

// 5. Settings, then export.
await page.goto(`${BASE}/settings/`);
const pick = (group, name) => page.getByRole('radiogroup', { name: group }).getByRole('radio', { name }).click();
await pick('Tema', 'Gelap');
await pick('Ukuran teks Arab', '140%');
await pick('Suara', 'Laki-laki');
await pick('Kecepatan suara', '0,75×');
const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Ekspor progres' }).click()]);
const json = fs.readFileSync(await download.path(), 'utf8');
fs.writeFileSync(OUT, json);
console.log(`${OUT} ← ${download.suggestedFilename()} from ${BASE} (${json.length} bytes)`);
await browser.close();
