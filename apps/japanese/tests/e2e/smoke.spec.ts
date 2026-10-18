import { expect, test } from '@playwright/test';

test('home shows the ladder with all eleven rungs and the Kana tier', async ({ page }) => {
  await page.goto('/');
  const ladder = page.getByRole('navigation', { name: /Tangga/ });
  await expect(ladder.getByRole('link')).toHaveCount(11);
  await expect(ladder.getByRole('link', { name: /Kana 1/ })).toBeVisible();
  // The Japanese subtitle is hidden below 380px (DESIGN §6.3).
  await expect(ladder.getByText('ひらがな')).toBeHidden();
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');
});

test('Japanese carries lang="ja"', async ({ page }) => {
  await page.goto('/rung/easy-1/');
  await expect(page.locator('[lang="ja"]').first()).toBeVisible();
});
