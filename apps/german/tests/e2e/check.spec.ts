import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// M5 (CLAUDE.md §6): door 2 → seeded placement → Easy 2, with a wordorder item answered in another
// valid order, a case item, a gender item and a two-way preposition.
test('door 2 → placement: every item type, then Easy 2 with Dasar and Easy 1 climbed', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Sudah pernah belajar/ }).click();
  await page.getByRole('button', { name: /^Mulai/ }).first().click();
  const tiles: Record<string, string[]> = {
    'pl-e1-2': ['Heute', 'arbeite', 'ich'],
    // Another valid order than the authored "Ich stehe um 6 Uhr auf".
    'pl-e2-1': ['um 6 Uhr', 'stehe', 'Ich', 'auf'],
    'pl-e3-1': ['weil', 'ich', 'müde', 'bin'],
  };
  const answers: Record<string, string> = {
    'pl-d-1': 'schön', 'pl-d-2': 'seperti tak', 'pl-d-3': 'ai dalam pantai', 'pl-d-4': 'i panjang', 'pl-d-5': 'kata benda', 'pl-d-6': 'koper',
    'pl-e1-1': 'komme', 'pl-e1-4': 'einen', 'pl-e1-5': 'Kinder', 'pl-e1-6': 'Hast',
    'pl-e2-2': 'kommen', 'pl-e2-3': 'dem', 'pl-e2-4': 'den', 'pl-e2-5': 'habe', 'pl-e2-6': 'sind',
    'pl-e3-2': 'kommt', 'pl-e3-3': 'mir', 'pl-e3-4': 'als', 'pl-e3-5': 'aufgestanden', 'pl-e3-6': 'mir',
  };
  const axed = new Set<string>();
  for (let i = 0; i < 24; i++) {
    const item = page.locator('[data-item]');
    const id = (await item.getAttribute('data-item'))!;
    const type = await item.getAttribute('data-type');
    if (['wordorder', 'gender', 'case', 'wechsel'].includes(type!) && !axed.has(type!)) {
      axed.add(type!);
      const results = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${type}: ${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    }
    if (type === 'wordorder') {
      for (const w of tiles[id]) await item.locator(`[data-tile="${w}"]`).first().click();
    } else if (type === 'gender') {
      await item.locator('[data-gender="f"]').click();
    } else {
      await item.getByRole('button', { name: answers[id], exact: true }).click();
    }
    await page.getByRole('button', { name: i === 23 ? /Lihat hasil/ : /^Lanjut/ }).click();
  }
  await expect(page.getByText('24 / 24')).toBeVisible();
  await expect(page.getByText(/Mulai dari Easy 2/)).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('german-ladder:v1'))).not.toBeNull();
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('german-ladder:v1')!));
  expect(state.placement).toMatchObject({ score: 24, total: 24, result: 'easy-2' });
  expect(state.rungs.dasar).toMatchObject({ climbed: true, via: 'placement' });
  expect(state.rungs['easy-1']).toMatchObject({ climbed: true, via: 'placement' });
});
