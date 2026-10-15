import { expect, test } from '@playwright/test';
import { answer, expectNoHorizontalScroll, lessonItems, next, testItems } from './helpers';

test('first visit → start Easy 1 → finish lesson 1 → continue card quotes lesson 2', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Mulai dari anak tangga pertama' })).toBeVisible();
  await expectNoHorizontalScroll(page);
  await page.getByRole('link', { name: /Mulai Easy 1/ }).click();
  await expect(page.getByRole('heading', { name: 'I am, you are' })).toBeVisible();

  for (let s = 0; s < 4; s++) await next(page);
  const items = Object.fromEntries(lessonItems('01-to-be.md').map((i) => [i.id, i]));
  for (let i = 0; i < 5; i++) {
    await answer(page, items);
    await next(page);
  }
  await expect(page.getByRole('heading', { name: /Selesai: Aku, kamu/ })).toBeVisible();

  await page.goto('/');
  const card = page.getByRole('region', { name: /Lanjut · Easy 1 · Pelajaran 2/ });
  await expect(card).toBeVisible();
  await expect(card).toContainText('Budi? He is hungry.');
});

test('close mid-lesson and resume at the same step', async ({ page }) => {
  await page.goto('/rung/easy-1/02-pronouns/');
  await next(page);
  await next(page);
  await expect(page.getByRole('heading', { name: 'Contoh', level: 2 })).toBeVisible();
  await page.getByRole('link', { name: 'Tutup pelajaran' }).click();
  await expect(page).toHaveURL(/\/rung\/easy-1\/$/);
  await expect(page.getByText('langkah 3 dari 6').first()).toBeVisible();
  await page.goto('/rung/easy-1/02-pronouns/');
  await expect(page.getByRole('heading', { name: 'Contoh', level: 2 })).toBeVisible();
});

test('pass the rung test → climb moment', async ({ page }) => {
  const items = testItems();
  await page.goto('/rung/easy-1/test/');
  await page.getByRole('button', { name: /Mulai tes/ }).click();
  for (let i = 0; i < 16; i++) {
    await answer(page, items);
    await page.getByRole('button', { name: i === 15 ? /Lihat hasil/ : /^Lanjut/ }).click();
  }
  const dialog = page.getByRole('dialog', { name: 'Easy 1 · climbed' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Lihat tangga' }).click();
  await expect(page.getByText('sudah dinaiki').first()).toBeVisible();
});

test('works with storage disabled', async ({ browser }) => {
  const ctx = await browser.newContext();
  await ctx.addInitScript(() => {
    const deny = () => {
      throw new DOMException('blocked', 'SecurityError');
    };
    Object.defineProperty(window, 'localStorage', { get: deny, configurable: true });
  });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/rung/easy-1/01-to-be/');
  await next(page);
  await expect(page.getByRole('heading', { name: 'Lihat', level: 2 })).toBeVisible();
  await page.goto('/settings/');
  await expect(page.getByText('Progres tidak tersimpan di browser ini.')).toBeVisible();
  expect(errors).toEqual([]);
  await ctx.close();
});

test('survives 130% text at 360px without horizontal scroll', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() =>
    localStorage.setItem('english-ladder:v1', JSON.stringify({ schemaVersion: 1, settings: { textSize: 130 } })),
  );
  for (const url of ['/', '/rung/easy-1/', '/rung/easy-1/09-prepositions-place/', '/settings/', '/rung/easy-1/test/']) {
    await page.goto(url);
    await expectNoHorizontalScroll(page);
  }
});
