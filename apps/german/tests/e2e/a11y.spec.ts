import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Every route in light and dark (the dark run at 130% text size). Lesson routes join as content lands.
const steps: Record<string, number[]> = {
  '/rung/easy-1/01-hallo/': [0, 1, 2, 3, 4],
  '/rung/dasar/02-umlaut/': [1, 2],
  '/rung/dasar/04-ich-dan-ach/': [1],
  '/rung/easy-1/03-ich-wohne/': [1],
  '/rung/easy-1/05-der-die-das/': [1],
  '/rung/easy-1/10-akkusativ/': [1, 2],
  '/rung/easy-2/01-uhrzeit/': [1],
  '/rung/easy-2/07-wo-wohin/': [1],
  '/rung/easy-2/09-wohnung/': [1, 3],
  '/rung/easy-2/test/': [0],
  '/rung/easy-1/read/': [0],
  '/rung/easy-2/talk/': [0],
};
const lessons = Object.keys(steps);
const routes = ['/', '/rung/dasar/', '/rung/easy-1/', '/rung/easy-2/', '/rung/hard-3/', '/placement/', '/visuals/', ...lessons, '/review/', '/words/', '/me/', '/settings/', '/about/'];

for (const scheme of ['light', 'dark'] as const) {
  for (const route of routes) {
    for (const step of steps[route] ?? [0]) {
      test(`axe: ${route}${step ? ` step ${step}` : ''} (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        if (scheme === 'dark') {
          await page.addInitScript(() =>
            localStorage.setItem('german-ladder:v1', JSON.stringify({ schemaVersion: 1, settings: { theme: 'dark', textSize: 130 } })),
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

// Case colours off (CLAUDE.md §6): the labels stay and every page still passes.
for (const route of ['/visuals/', '/rung/easy-1/10-akkusativ/', '/placement/']) {
  test(`axe: ${route} (case colours off)`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('german-ladder:v1', JSON.stringify({ schemaVersion: 1, settings: { caseColours: 'off' } })));
    await page.setViewportSize({ width: 360, height: 2400 });
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('data-case-colours', 'off');
    if (route.includes('akkusativ')) await page.getByRole('button', { name: /^Lanjut/ }).click();
    // Let the step transition finish before measuring contrast.
    await page.waitForTimeout(300);
    const results = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
  });
}

test('reduced motion: the bracket and the compound snap move instantly', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/visuals/');
  const bracket = page.locator('[data-visual="verb-bracket"]');
  await bracket.getByRole('button', { name: /um 6 Uhr/ }).click();
  const chip = bracket.locator('[data-zone="p1"] [lang="de"]').first();
  await expect(chip).toHaveText('Um 6 Uhr');
  expect(await chip.evaluate((el) => (el.closest('[data-chip], button') as HTMLElement).style.transform)).toBe('');
});
