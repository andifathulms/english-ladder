import { expect, test } from '@playwright/test';
import { answer, expectNoHorizontalScroll, lessonItems, next, poolItems } from './helpers';

test('door 1 opens Easy 1 lesson 1; the line under it opens Dasar', async ({ page }) => {
  await page.goto('/');
  await expectNoHorizontalScroll(page);
  await expect(page.getByRole('link', { name: /Mulai dari Dasar/ })).toHaveAttribute('href', /\/rung\/dasar\/$/);
  await page.getByRole('link', { name: /Baru mulai/ }).click();
  await expect(page).toHaveURL(/\/rung\/easy-1\/01-hallo\/$/);
});

test('finish Easy 1 lesson 1 → the continue card quotes lesson 2', async ({ page }) => {
  await page.goto('/rung/easy-1/01-hallo/');
  for (let s = 0; s < 4; s++) await next(page);
  const items = lessonItems('easy-1', '01-hallo.md');
  for (let i = 0; i < Object.keys(items).length; i++) {
    await answer(page, items);
    await next(page);
  }
  await page.goto('/');
  await expect(page.getByRole('region', { name: /Easy 1 · Pelajaran 2/ })).toBeVisible();
});

test('pass the Easy 2 test → the climb moment names the A1 exam', async ({ page }) => {
  const items = poolItems('easy-2');
  await page.goto('/rung/easy-2/test/');
  await page.getByRole('button', { name: /Mulai tes/ }).click();
  for (let i = 0; i < 16; i++) {
    await answer(page, items);
    await page.getByRole('button', { name: i === 15 ? /Lihat hasil/ : /^Lanjut/ }).click();
  }
  const dialog = page.getByRole('dialog', { name: /Easy 2/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-exit]')).toHaveText('A1 selesai. Ini level ujian Goethe-Zertifikat A1 / Start Deutsch 1.');
  await expect(dialog.getByText('Schritt für Schritt.')).toBeVisible();
});

test('works with storage disabled', async ({ browser }) => {
  const ctx = await browser.newContext();
  await ctx.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get: () => {
        throw new DOMException('blocked', 'SecurityError');
      },
      configurable: true,
    });
  });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/rung/easy-1/01-hallo/');
  await next(page);
  await page.goto('/settings/');
  await expect(page.getByText(/Progres tidak tersimpan/)).toBeVisible();
  expect(errors).toEqual([]);
  await ctx.close();
});

test('the A1 deck lists its words, most frequent first, with articles', async ({ page }) => {
  await page.goto('/words/#deck');
  await expect(page.getByText(/Kartu kata A1/).first()).toBeVisible();
  await expect(page.getByText('das Haus').first()).toBeVisible();
});
