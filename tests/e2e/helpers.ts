import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { expect, type Page } from '@playwright/test';

type Item = { id: string; type: string; answer: string | string[] };

export function lessonItems(file: string): Item[] {
  const raw = fs.readFileSync(path.join('content/easy-1', file), 'utf8');
  return (matter(raw).data as { check: Item[] }).check;
}

export function testItems(): Record<string, Item> {
  const pool = yaml.load(fs.readFileSync('content/easy-1/test.yaml', 'utf8')) as { items: Item[] };
  return Object.fromEntries(pool.items.map((i) => [i.id, i]));
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Answers whatever check item is on screen, correctly. */
export async function answer(page: Page, items: Record<string, Item>) {
  const id = await page.locator('[data-item]').getAttribute('data-item');
  const item = items[id!];
  if (item.type === 'order') {
    for (const w of item.answer as string[]) {
      await page.locator('[data-item] [role="group"]').last().getByRole('button', { name: new RegExp(`^${esc(w)}$`) }).first().click();
    }
    const check = page.getByRole('button', { name: /^(Periksa|Check)$/ });
    if (await check.count()) await check.click();
  } else {
    await page.locator('[data-item] button[data-state]').filter({ hasText: new RegExp(`^${esc(item.answer as string)}$`) }).click();
  }
}

export async function next(page: Page) {
  await page.getByRole('button', { name: /^(Lanjut|Continue)/ }).click();
}

export async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}
