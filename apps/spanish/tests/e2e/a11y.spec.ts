import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Every route in light and dark (the dark run at 130% text size). Lesson routes join as content lands.
const steps: Record<string, number[]> = {
  '/rung/easy-1/01-hola/': [0, 1, 2, 3, 4],
};
const lessons = Object.keys(steps);
const routes = ['/', '/rung/dasar/', '/rung/easy-1/', '/rung/easy-2/', '/rung/hard-3/', ...lessons, '/review/', '/words/', '/me/', '/settings/', '/about/'];

for (const scheme of ['light', 'dark'] as const) {
  for (const route of routes) {
    for (const step of steps[route] ?? [0]) {
      test(`axe: ${route}${step ? ` step ${step}` : ''} (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        if (scheme === 'dark') {
          await page.addInitScript(() =>
            localStorage.setItem('spanish-ladder:v1', JSON.stringify({ schemaVersion: 1, settings: { theme: 'dark', textSize: 130 } })),
          );
        }
        // Tall viewport: nothing sits under the sticky bars while axe measures target sizes.
        await page.setViewportSize({ width: 360, height: 2400 });
        await page.goto(route);
        for (let i = 0; i < step; i++) await page.getByRole('button', { name: /^Lanjut/ }).click();
        await page.waitForTimeout(300);
        const results = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }
  }
}
