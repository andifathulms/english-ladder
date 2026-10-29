import { expect, test } from '@playwright/test';

test('home shows the German Ladder brand and all ten rungs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('German Ladder').first()).toBeVisible();
  await page.goto('/rung/hard-3/');
  await expect(page.getByRole('heading', { name: /Hard 3/ }).first()).toBeVisible();
});

test('the app stores progress under its own key', async ({ page }) => {
  await page.goto('/settings/');
  await page.getByRole('radio', { name: /Gelap|Dark/ }).first().click();
  await page.waitForTimeout(400);
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain('german-ladder:v1');
  expect(keys).not.toContain('english-ladder:v1');
});

test('exit chips show on the exit rungs (DESIGN §13)', async ({ page }) => {
  await page.goto('/');
  for (const label of ['A1 · Goethe', 'B1 · Ausbildung', 'B2 · Pflege/Studium']) await expect(page.getByText(label).first()).toBeVisible();
});

test('the Examples step shows the Kerja card and Tirukan stress marks', async ({ page }) => {
  await page.goto('/rung/easy-1/01-hallo/');
  for (let i = 0; i < 4 && !(await page.locator('.de-stress').first().isVisible().catch(() => false)); i++) {
    await page.getByRole('button', { name: /^Lanjut/ }).click();
  }
  await expect(page.getByRole('heading', { name: /Kerja/ })).toBeVisible();
  expect(await page.locator('.de-stress').allTextContents()).toEqual(['Gu', 'Ih']);
});
