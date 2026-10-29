import { expect, test } from '@playwright/test';

// Long compounds (CLAUDE.md §6 Layout): at 360px and 130% text, German lines wrap or hyphenate
// inside their box; nothing scrolls sideways. Real words from Ausbildung and Pflege paperwork.
const LONG = 'Die Arbeitsunfähigkeitsbescheinigung liegt neben der Krankenversicherungskarte und dem Haftpflichtversicherungsformular.';

test('long compounds never overflow at 360px and 130% text', async ({ page }) => {
  await page.goto('/rung/easy-1/01-hallo/');
  await page.evaluate(() => document.documentElement.setAttribute('data-text-size', '130'));
  const line = page.locator('[lang="de"]').first();
  await expect(line).toBeVisible();
  await line.evaluate((el, text) => {
    el.textContent = text;
  }, LONG);
  const box = await line.evaluate((el) => ({ scroll: el.scrollWidth, client: el.clientWidth }));
  expect(box.scroll).toBeLessThanOrEqual(box.client + 1);
  const page360 = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth }));
  expect(page360.scroll).toBeLessThanOrEqual(page360.inner);
  // German text hyphenates (authored soft hyphens win; otherwise the browser's German dictionary).
  expect(await line.evaluate((el) => getComputedStyle(el).hyphens)).toBe('auto');
});
