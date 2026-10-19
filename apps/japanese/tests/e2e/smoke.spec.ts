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

// The Kana visuals and the romaji fade (CLAUDE.md §7.2, §9).
const toStep = async (page: import('@playwright/test').Page, n: number) => {
  for (let i = 0; i < n; i++) await page.getByRole('button', { name: /^Lanjut/ }).click();
};

test('Kana 1 lesson 2: the chart shows romaji, and a cell opens its stroke order', async ({ page }) => {
  await page.goto('/rung/kana-1/02-baris-ka/');
  await toStep(page, 1);
  const chart = page.locator('[data-visual="kana-chart"]');
  await expect(chart.locator('[data-kana="か"]')).toContainText('ka');
  await chart.locator('[data-kana="し"]').click();
  await expect(page.getByRole('dialog', { name: 'Kana し' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('Kana 1 lesson 9 has no romaji, and MoraBeats compares おばさん and おばあさん', async ({ page }) => {
  await page.goto('/rung/kana-1/09-panjang-dan-tsu/');
  await toStep(page, 1);
  await expect(page.getByRole('img', { name: /おばあさん: 5 ketukan/ })).toBeVisible();
  await toStep(page, 1);
  await expect(page.locator('[lang="ja-Latn"]')).toHaveCount(0);
});

test('Kana 2 lesson 9: PitchLine draws 橋 and 箸 with their patterns', async ({ page }) => {
  await page.goto('/rung/kana-2/09-aksen-nada/');
  await toStep(page, 1);
  const pitch = page.locator('[data-visual="pitch-line"]');
  await expect(pitch.locator('[data-accent]')).toHaveCount(2);
  await expect(pitch.getByRole('img', { name: /jembatan/ })).toBeVisible();
  await pitch.getByRole('radio', { name: 'あめ' }).click();
  await expect(pitch.getByRole('img', { name: /permen/ })).toBeVisible();
});

test('the Kana 1 test draws 14 items', async ({ page }) => {
  await page.goto('/rung/kana-1/test/');
  await page.getByRole('button', { name: /Mulai/ }).click();
  await expect(page.getByText(/1 \/ 14/)).toBeVisible();
});

// Easy 1 visuals and the decks (DESIGN §6.8, §8.6–8.8).
test('Easy 1 lesson 7: ParticleTrain keeps the verb last when a car moves', async ({ page }) => {
  await page.goto('/rung/easy-1/07-masu/');
  await toStep(page, 1);
  const train = page.locator('[data-visual="particle-train"]');
  await train.getByRole('button', { name: /ke kiri/ }).last().click();
  await expect(train.locator('li').last()).toHaveAttribute('data-loco');
});

test('Easy 1 lesson 14: Counters shows the sound change of 本', async ({ page }) => {
  await page.goto('/rung/easy-1/14-counters/');
  await toStep(page, 1);
  const c = page.locator('[data-visual="counters"]');
  await expect(c.locator('[data-reading]')).toHaveText('さんぼん');
  await c.getByRole('button', { name: 'Kurangi satu' }).click();
  await c.getByRole('button', { name: 'Kurangi satu' }).click();
  await expect(c.locator('[data-reading]')).toHaveText('いっぽん');
});

test('the kanji deck opens a card with stroke order and tracing', async ({ page }) => {
  await page.goto('/words/#kanji');
  await page.getByRole('button', { name: /^Mulai/ }).first().click();
  await page.getByRole('button', { name: 'Balik kartu' }).click();
  await expect(page.locator('[data-back]')).toBeVisible();
  await page.getByRole('button', { name: 'Latihan menulis' }).click();
  await expect(page.locator('[data-trace] svg').first()).toBeVisible();
  await page.getByRole('button', { name: 'Ingat', exact: true }).click();
  await expect(page.getByText(/2 \//)).toBeVisible();
});

test('My words opens Kartu kata N5 and Kartu kanji N5', async ({ page }) => {
  await page.goto('/words/#deck');
  await expect(page.getByRole('heading', { name: 'Kartu kata N5' })).toBeVisible();
  await page.goto('/words/#kanji');
  await expect(page.getByRole('heading', { name: 'Kartu kanji N5' })).toBeVisible();
});
