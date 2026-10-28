import { expect, test } from '@playwright/test';

// M5 (CLAUDE.md §6): door 2 → placement → Easy 2; a conjugate grid; a lenient-accent answer; the accent bar.
test('a typed answer without its accent is accepted with "Hampir sempurna"', async ({ page }) => {
  await page.goto('/rung/easy-1/01-hola/');
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: /^Lanjut/ }).click();
  // Answer the five items before the typed one.
  const choose = async (label: string) => {
    await page.locator('[data-item]').getByRole('button', { name: label, exact: true }).click();
    await page.getByRole('button', { name: /^Lanjut/ }).click();
  };
  await choose('estás');
  await choose('está');
  await choose('senang berkenalan');
  for (const w of ['Me', 'llamo', 'Rina']) await page.locator(`[data-item] [data-tile="${w}"]`).first().click();
  await page.getByRole('button', { name: 'Periksa' }).click();
  await page.getByRole('button', { name: /^Lanjut/ }).click();
  await choose('Buenas noches.');
  const field = page.getByRole('textbox', { name: 'Bentuknya' });
  await field.fill('estas');
  await page.getByRole('button', { name: 'Periksa' }).click();
  await expect(page.locator('[data-note]')).toHaveText('Hampir sempurna: estás, dengan aksen.');
});

test('the accent bar inserts at the cursor and keeps focus', async ({ page }) => {
  // Resume at the typed item (check 6 of 6).
  await page.addInitScript(() =>
    localStorage.setItem('spanish-ladder:v1', JSON.stringify({ schemaVersion: 1, lessons: { 'easy1-01-hola': { step: 4, furthest: 4, checkIndex: 5, completed: false, lastOpened: 1 } }, settings: {} })),
  );
  await page.goto('/rung/easy-1/01-hola/');
  const field = page.getByRole('textbox', { name: 'Bentuknya' });
  await field.fill('ests');
  await field.evaluate((el: HTMLInputElement) => el.setSelectionRange(3, 3));
  await page.getByRole('button', { name: 'a dengan aksen' }).click();
  await expect(field).toHaveValue('estás');
  await expect(field).toBeFocused();
  await expect(page.getByRole('group', { name: 'Huruf khusus' }).getByRole('button')).toHaveCount(9);
});

test('door 2 → placement: a conjugate grid, then Easy 2 with Dasar and Easy 1 climbed', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Sudah pernah belajar/ }).click();
  await page.getByRole('button', { name: /^Mulai/ }).first().click();
  // Answer every item correctly, from the pool itself.
  for (let i = 0; i < 24; i++) {
    const type = await page.locator('[data-item]').getAttribute('data-type');
    if (type === 'stress') {
      const id = await page.locator('[data-item]').getAttribute('data-item');
      const want = { 'pl-d1': [1, 'Ya'], 'pl-d2': [0, 'Tidak'], 'pl-d3': [0, 'Ya'] }[id!]!;
      await page.getByRole('radiogroup', { name: 'Suku kata yang ditekan' }).getByRole('radio').nth(want[0] as number).click();
      await page.getByRole('radiogroup', { name: 'Perlu aksen?' }).getByRole('radio', { name: want[1] as string }).click();
    } else if (type === 'conjugate') {
      await expect(page.locator('[data-item] table')).toBeVisible();
      await page.getByRole('textbox', { name: 'hablar, yo' }).fill('hablo');
      await page.getByRole('textbox', { name: 'hablar, tú' }).fill('hablas');
      await page.getByRole('textbox', { name: 'hablar, él / ella / usted' }).fill('habla');
    } else if (type === 'agree') {
      await page.getByRole('radiogroup', { name: 'Artikel' }).getByRole('radio', { name: 'las' }).click();
      await page.getByRole('radiogroup', { name: 'Kata sifat' }).getByRole('radio', { name: 'blancas' }).click();
    } else if (type === 'form') {
      await page.getByRole('textbox', { name: 'Bentuknya' }).fill('quiero');
    } else {
      const answers: Record<string, string> = {
        'pl-d4': 'perro', 'pl-d5': 'h', 'pl-d6': 'seperti ny dalam nyanyi', 'pl-e1-1': 'soy', 'pl-e1-2': 'está', 'pl-e1-5': 'Hay', 'pl-e1-6': 'años',
        'pl-e2-2': 'gustan', 'pl-e2-3': 'voy', 'pl-e2-4': 'levanto', 'pl-e2-5': 'media', 'pl-e2-6': 'que',
        'pl-e3-1': 'comí', 'pl-e3-2': 'he', 'pl-e3-3': 'lo', 'pl-e3-4': 'para', 'pl-e3-5': 'cocinando', 'pl-e3-6': 'viajaré',
      };
      const id = await page.locator('[data-item]').getAttribute('data-item');
      await page.locator('[data-item]').getByRole('button', { name: answers[id!], exact: true }).click();
    }
    await page.getByRole('button', { name: i === 23 ? /Lihat hasil/ : /^Lanjut/ }).click();
  }
  await expect(page.getByText('24 / 24')).toBeVisible();
  await expect(page.getByText(/Mulai dari Easy 2/)).toBeVisible();
  // Dasar and Easy 1 are climbed by the placement; Easy 2 is not (Easy 3 is still soon).
  // Writes are debounced (250ms).
  await expect.poll(() => page.evaluate(() => localStorage.getItem('spanish-ladder:v1'))).not.toBeNull();
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('spanish-ladder:v1')!));
  expect(state.placement).toMatchObject({ score: 24, total: 24, result: 'easy-2' });
  expect(state.rungs.dasar).toMatchObject({ climbed: true, via: 'placement' });
  expect(state.rungs['easy-1']).toMatchObject({ climbed: true, via: 'placement' });
  expect(state.rungs['easy-2']?.climbed ?? false).toBe(false);
});
