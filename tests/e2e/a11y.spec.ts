import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/rung/easy-1/',
  '/rung/hard-3/',
  '/rung/easy-1/01-to-be/',
  '/rung/easy-1/03-a-an/',
  '/rung/easy-1/09-prepositions-place/',
  '/rung/easy-1/test/',
  '/review/',
  '/words/',
  '/me/',
  '/settings/',
  '/about/',
];

for (const scheme of ['light', 'dark'] as const) {
  for (const route of routes) {
    test(`axe: ${route} (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      // Light is the default theme; dark is a setting, so choose it explicitly.
      if (scheme === 'dark') {
        await page.addInitScript(() =>
          localStorage.setItem('english-ladder:v1', JSON.stringify({ schemaVersion: 2, settings: { theme: 'dark' } })),
        );
      }
      await page.goto(route);
      // Visit the See step too, so visuals are checked.
      if (route.includes('/rung/easy-1/0')) await page.getByRole('button', { name: /^Lanjut/ }).click();
      await page.waitForTimeout(300);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }
}
