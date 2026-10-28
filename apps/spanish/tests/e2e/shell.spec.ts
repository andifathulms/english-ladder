import { expect, test } from '@playwright/test';

// The M4 shell: two doors with the Dasar line, strand cards, lang attributes, My words and its deck tab.
test('home: door 1 opens Easy 1, the line under it opens Dasar', async ({ page }) => {
  await page.goto('/');
  const board = page.locator('section[aria-labelledby="welcome-title"]');
  await expect(board.getByRole('link', { name: /Baru mulai/ })).toHaveAttribute('href', /\/rung\/easy-1\/01-hola\/|\/rung\/easy-1\//);
  await board.getByRole('link', { name: 'Mulai dari Dasar.' }).click();
  await expect(page).toHaveURL(/\/rung\/dasar\/$/);
});

test('the ladder shows DELE chips and Dasar at the bottom', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.locator('text=A1 · DELE >> visible=true').first()).toBeVisible();
  await expect(page.locator('text=Pra-A1 >> visible=true').first()).toBeVisible();
});

test('lesson Examples step: Bunyi, España, Ngobrol and Tirukan, with es-419 and es-ES lines', async ({ page }) => {
  await page.goto('/rung/easy-1/01-hola/');
  for (let i = 0; i < 2; i++) await page.getByRole('button', { name: /^Lanjut/ }).click();
  await expect(page.getByRole('heading', { name: /Bunyi/ })).toBeVisible();
  const spain = page.locator('section[aria-labelledby="spain-title"]');
  await expect(spain).toBeVisible();
  await expect(spain.locator('[lang="es-ES"]').first()).toHaveText(/estáis/);
  await expect(page.getByRole('heading', { name: 'Ngobrol' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tirukan' })).toBeVisible();
  // Tirukan underlines each word's stressed syllable.
  await expect(page.locator('#tirukan-title ~ * .es-stress').first()).toHaveText('Ho');
  await expect(page.locator('main [lang="es-419"]').first()).toBeVisible();
});

test('My words: gender chips and the deck tab', async ({ page }) => {
  await page.goto('/rung/easy-1/01-hola/');
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: /^Lanjut/ }).click();
  await page.goto('/words/');
  await expect(page.getByText('chico', { exact: true })).toBeVisible();
  await expect(page.getByText('maskulin', { exact: false }).first()).toBeAttached();
  await page.getByPlaceholder(/Cari/).fill('adios');
  await expect(page.getByText('adiós', { exact: true })).toBeVisible();
  await page.goto('/words/#deck');
  await expect(page.getByText(/Kartu kata A1 terbuka/)).toBeVisible();
});

test('My words: a verb opens its conjugation grid in a sheet', async ({ page }) => {
  await page.goto('/rung/easy-1/01-hola/');
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: /^Lanjut/ }).click();
  await page.goto('/words/');
  await page.getByRole('button', { name: 'lihat konjugasi' }).click();
  const sheet = page.getByRole('dialog');
  await expect(sheet.getByRole('table')).toContainText('me llamo');
  await sheet.getByRole('button', { name: 'Tutup' }).click();
  await expect(sheet).toBeHidden();
});
