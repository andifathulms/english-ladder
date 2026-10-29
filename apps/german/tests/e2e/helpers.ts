import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { expect, type Page } from '@playwright/test';

type Item = Record<string, unknown> & { id: string; type: string; answer?: unknown };
const CONTENT = path.join(__dirname, '../../content');
const PERSON_LABEL: Record<string, string> = { ich: 'ich', du: 'du', er: 'er / sie / es', wir: 'wir', ihr: 'ihr', sie: 'sie / Sie' };

export const poolItems = (rung: string): Record<string, Item> =>
  Object.fromEntries(((yaml.load(fs.readFileSync(path.join(CONTENT, rung, 'test.yaml'), 'utf8')) as { items: Item[] }).items).map((i) => [i.id, i]));
export const lessonItems = (rung: string, file: string): Record<string, Item> =>
  Object.fromEntries((matter(fs.readFileSync(path.join(CONTENT, rung, file), 'utf8')).data.check as Item[]).map((i) => [i.id, i]));

/** Answers the item on screen correctly, from the content itself. */
export async function answer(page: Page, items: Record<string, Item>) {
  const el = page.locator('[data-item]');
  const id = (await el.getAttribute('data-item'))!;
  const item = items[id];
  if (!item) throw new Error(`no item ${id}`);
  const fill = async (label: string, text: string) => page.getByRole('textbox', { name: label }).fill(text);
  const check = async () => {
    const b = page.getByRole('button', { name: 'Periksa' });
    if (await b.isVisible().catch(() => false)) await b.click();
  };
  switch (item.type) {
    case 'gender':
      await el.locator(`[data-gender="${item.answer}"]`).click();
      return;
    case 'order':
    case 'wordorder':
      for (const w of item.answer as string[]) await el.locator(`[data-tile="${w}"]:not([disabled])`).first().click();
      await check();
      return;
    case 'conjugate':
      for (const p of item.persons as string[]) await fill(`${item.verb}, ${PERSON_LABEL[p]}`, (item.answers as Record<string, string>)[p]);
      await check();
      return;
    case 'dictation':
      await fill('Kalimatnya', item.answer as string);
      await check();
      return;
    case 'form':
    case 'case':
      if (!item.options) {
        await fill(item.type === 'form' ? 'Bentuknya' : 'Artikelnya', item.answer as string);
        await check();
        return;
      }
  }
  await el.getByRole('button', { name: String(item.answer).replace(/\*/g, ''), exact: true }).click();
}

export const next = async (page: Page) => page.getByRole('button', { name: /^Lanjut/ }).click();

export async function expectNoHorizontalScroll(page: Page) {
  const { scroll, inner } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth }));
  expect(scroll).toBeLessThanOrEqual(inner);
}
