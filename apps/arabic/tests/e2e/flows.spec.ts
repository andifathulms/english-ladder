import { expect, test } from '@playwright/test';
import { answer, expectNoHorizontalScroll, lessonFile, lessonItems, next, poolItems } from '@/tests/e2e/helpers';

test('door 1 → Huruf 1 lesson 1 → done', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Mulai dari anak tangga pertama' })).toBeVisible();
  await expectNoHorizontalScroll(page);
  await page.getByRole('link', { name: /Belum bisa baca huruf Arab/ }).click();
  await expect(page).toHaveURL(/\/rung\/huruf-1\/01-/);
  for (let s = 0; s < 4; s++) await next(page);
  const list = lessonItems('huruf-1', lessonFile('huruf-1', 1));
  const items = Object.fromEntries(list.map((i) => [i.id, i]));
  for (let i = 0; i < list.length; i++) {
    await answer(page, items);
    await next(page);
  }
  await expect(page.getByRole('heading', { name: /^Selesai:/ })).toBeVisible();
  await page.goto('/');
  await expect(page.getByRole('region', { name: /Lanjut · Huruf 1 · Pelajaran 2/ })).toBeVisible();
});

test('door 2 → placement with right answers → Easy 1, Huruf marked lewat cek, no climb moment', async ({ page }) => {
  const items = poolItems('content/placement.yaml');
  await page.goto('/');
  await page.getByRole('link', { name: /Sudah bisa baca Al-Qur'an/ }).click();
  await page.getByRole('button', { name: /Mulai cek/ }).click();
  for (let i = 0; i < 20; i++) {
    await answer(page, items, false);
    await page.getByRole('button', { name: i === 19 ? /Lihat hasil/ : /^Lanjut/ }).click();
  }
  await expect(page.getByRole('heading', { name: '20 / 20' })).toBeVisible();
  await expect(page.getByText('Kamu siap mulai dari Easy 1.')).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.goto('/');
  await expect(page.getByText('· lewat cek').first()).toBeVisible();
});

test('close mid-lesson and resume at the same step', async ({ page }) => {
  await page.goto(`/rung/huruf-1/${lessonFile('huruf-1', 2).replace('.md', '')}/`);
  await next(page);
  await next(page);
  await expect(page.getByRole('heading', { name: 'Contoh', level: 2 })).toBeVisible();
  await page.getByRole('link', { name: 'Tutup pelajaran' }).click();
  await expect(page).toHaveURL(/\/rung\/huruf-1\/$/);
  await page.goto(`/rung/huruf-1/${lessonFile('huruf-1', 2).replace('.md', '')}/`);
  await expect(page.getByRole('heading', { name: 'Contoh', level: 2 })).toBeVisible();
});

test('Easy 1 lessons show full harakat with no reading toggles', async ({ page }) => {
  await page.goto(`/rung/easy-1/${lessonFile('easy-1', 5).replace('.md', '')}/`);
  await expect(page.getByRole('button', { name: /harakat lengkap/ })).toHaveCount(0);
  await next(page);
  await next(page);
  await expect(page.locator('p[lang="ar"][data-harakat="full"]').first()).toBeVisible();
  await expect(page.locator('p[lang="ar-Latn"]').first()).toBeVisible();
});

test('capstone done flag persists', async ({ page }) => {
  const reading = poolItems('content/huruf-2/reading.yaml');
  await page.goto('/rung/huruf-2/read/');
  const n = Object.keys(reading).length;
  for (let i = 0; i < n; i++) {
    const block = page.locator('[data-item]').nth(i);
    const id = await block.getAttribute('data-item');
    const item = reading[id!];
    if (typeof item.answer === 'string') {
      const pills = block.locator('button[data-state]');
      const c = await pills.count();
      for (let k = 0; k < c; k++) {
        const t = ((await pills.nth(k).textContent()) ?? '').replace(/‍/g, '').replace(/^\d/, '').trim().normalize('NFC');
        if (t === item.answer.normalize('NFC')) {
          await pills.nth(k).click();
          break;
        }
      }
    }
  }
  await expect(page.getByText(/Kamu baru saja membaca satu teks utuh/)).toBeVisible();
  await page.goto('/rung/huruf-2/');
  await expect(page.getByText(/selesai \d/)).toBeVisible();
  await page.reload();
  await expect(page.getByText(/selesai \d/)).toBeVisible();
});

test('works with storage disabled', async ({ browser }) => {
  const ctx = await browser.newContext();
  await ctx.addInitScript(() => {
    const deny = () => {
      throw new DOMException('blocked', 'SecurityError');
    };
    Object.defineProperty(window, 'localStorage', { get: deny, configurable: true });
  });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`/rung/huruf-1/${lessonFile('huruf-1', 2).replace('.md', '')}/`);
  await next(page);
  await expect(page.getByRole('heading', { name: 'Lihat', level: 2 })).toBeVisible();
  await page.goto('/settings/');
  await expect(page.getByText('Progres tidak tersimpan di browser ini.')).toBeVisible();
  expect(errors).toEqual([]);
  await ctx.close();
});

test('survives 130% text and 140% Arabic at 360px without horizontal scroll', async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem('arabic-ladder:v1', JSON.stringify({ schemaVersion: 1, settings: { textSize: 130, arabicSize: 140 } })),
  );
  for (const url of ['/', '/rung/huruf-1/', `/rung/huruf-1/${lessonFile('huruf-1', 12).replace('.md', '')}/`, `/rung/easy-1/${lessonFile('easy-1', 12).replace('.md', '')}/`, '/settings/', '/placement/', '/rung/easy-1/test/']) {
    await page.goto(url);
    await expectNoHorizontalScroll(page);
  }
});

test('imports a progress file exported from the live app and shows the same state', async ({ page }) => {
  // tests/fixtures/live-export.json: exported from https://andifathulms.github.io/arabic-ladder/
  // (the standalone app) by tests/fixtures/make-live-export.mjs.
  await page.goto('/settings/');
  await page.locator('input[type="file"]').setInputFiles('tests/fixtures/live-export.json');
  await expect(page.getByText('Progres berhasil diimpor.')).toBeVisible();

  // Settings carried over: dark, Arabic 140%, male voice, 0.75×.
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-ar-size', '140');
  const checked = (group: string, name: string) =>
    expect(page.getByRole('radiogroup', { name: group }).getByRole('radio', { name })).toHaveAttribute('aria-checked', 'true');
  await checked('Tema', 'Gelap');
  await checked('Ukuran teks Arab', '140%');
  await checked('Suara', 'Laki-laki');
  await checked('Kecepatan suara', '0,75×');

  // Home: continue at Easy 1 lesson 2, Huruf 1 and 2 climbed via the check.
  await page.goto('/');
  await expect(page.getByRole('region', { name: /Lanjut · Easy 1 · Pelajaran 2/ })).toBeVisible();
  await expect(page.getByText('· lewat cek')).toHaveCount(2);

  // The Huruf 2 reading capstone keeps its done date; Easy 1 lesson 1 is done.
  await page.goto('/rung/huruf-2/');
  await expect(page.getByText(/selesai \d/)).toBeVisible();
  await page.goto('/rung/easy-1/');
  await expect(page.getByRole('link', { name: /Pelajaran 1/ }).getByText('Selesai')).toBeVisible();

  // My words: the glossaries of the two opened lessons, grouped by rung.
  await page.goto('/words/');
  await expect(page.getByRole('heading', { name: /Easy 1 · Pelajaran 1/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Easy 1 · Pelajaran 2/ })).toBeVisible();
});
