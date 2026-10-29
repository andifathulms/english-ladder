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
