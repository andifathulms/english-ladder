import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Every route in light and dark (the dark run at 140% Japanese size, CLAUDE.md §9), and the lesson
// steps that carry Japanese text and strand cards.
// Steps per lesson: 1 is the See step, where the Kana visuals live.
const steps: Record<string, number[]> = {
  '/rung/kana-1/01-lima-vokal/': [0, 2, 3],
  '/rung/kana-1/02-baris-ka/': [1],
  '/rung/kana-1/03-baris-sa-ta/': [1, 2],
  '/rung/kana-1/09-panjang-dan-tsu/': [1],
  '/rung/kana-2/09-aksen-nada/': [1, 2],
  '/rung/kana-2/10-kanji-pertama/': [1, 2],
  '/rung/easy-1/01-hajimemashite/': [0, 2, 3],
  '/rung/easy-1/07-masu/': [1],
  '/rung/easy-1/13-arimasu-imasu/': [1, 4],
  '/rung/easy-1/14-counters/': [1, 2],
  '/rung/easy-1/16-ichinichi/': [2],
};
const lessons = Object.keys(steps);
const routes = ['/', '/placement/', '/rung/kana-1/', '/rung/kana-2/', '/rung/easy-1/', '/rung/hard-3/', ...lessons, '/rung/kana-1/test/', '/rung/kana-2/test/', '/rung/kana-2/read/', '/rung/easy-1/test/', '/rung/easy-1/read/', '/rung/easy-1/talk/', '/review/', '/words/', '/words/#deck', '/words/#kanji', '/me/', '/settings/', '/about/'];

for (const scheme of ['light', 'dark'] as const) {
  for (const route of routes) {
    for (const step of steps[route] ?? [0]) {
      test(`axe: ${route}${step ? ` step ${step}` : ''} (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        if (scheme === 'dark') {
          await page.addInitScript(() =>
            localStorage.setItem('japanese-ladder:v1', JSON.stringify({ schemaVersion: 1, settings: { theme: 'dark', jaSize: 140 } })),
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
