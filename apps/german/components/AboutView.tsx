'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import { PageShell } from '@ladder/core/components/ui/PageShell';
import type { GermanKey } from '@/i18n/overrides';

const REPO = 'https://github.com/andifathulms/german-ladder';

const copy = {
  id: [
    {
      h: 'Apa ini',
      p: 'German Ladder adalah kursus bahasa Jerman bertingkat untuk penutur bahasa Indonesia, dari nol sampai C1. Ada Dasar (bunyi dan ejaan) yang boleh dilewati, lalu sembilan anak tangga. Tiap pelajaran pendek, menunjukkan tata bahasa lewat gambar yang bisa kamu sentuh, dan selalu bilang apa yang dilakukan bahasa Indonesia secara berbeda.',
    },
    {
      h: 'Tiga pintu keluar',
      p: 'Anak tangga tertentu menandai level yang biasa diminta: A1 untuk Goethe-Zertifikat A1 atau Start Deutsch 1 (sering untuk visa), B1 untuk kebanyakan program Ausbildung, dan B2 untuk pengakuan perawat (Pflege) dan banyak program kuliah.',
    },
    {
      h: 'Tentang CEFR',
      p: 'CEFR adalah skala internasional untuk kemampuan bahasa: A1 dan A2 untuk pemula, B1 dan B2 untuk tingkat menengah, C1 untuk mahir. Kursus bahasa Jerman membaginya lagi menjadi setengah level (A1.1, A1.2 …), seperti di sini. Urutan topik dicocokkan dengan Profile Deutsch dan daftar kata Goethe-Institut.',
    },
    {
      h: 'Progresmu',
      p: 'Tidak ada akun dan tidak ada pelacakan. Progresmu hanya tersimpan di browser ini. Kamu bisa mengekspor dan mengimpornya di Pengaturan.',
    },
    {
      h: 'Cara pelajaran ditulis',
      p: 'Pelajaran disusun dengan bantuan AI, lalu diperiksa oleh guru bahasa Jerman sebelum ditandai siap. Pelajaran yang belum diperiksa diberi tanda Draft. Soal latihan tidak pernah menyalin materi ujian Goethe.',
    },
    {
      h: 'Siapa yang membuat',
      p: 'Dibuat oleh Fathul, untuk orang yang ingin naik pelan-pelan tanpa merasa dihakimi.',
    },
  ],
  en: [
    {
      h: 'What this is',
      p: 'German Ladder is a levelled German course for Indonesian speakers, from zero to C1. An optional Dasar rung covers sounds and spelling, then nine rungs follow. Each lesson is short, shows grammar through visuals you can touch, and always says what Indonesian does differently.',
    },
    {
      h: 'Three exits',
      p: 'Some rungs mark the levels people are usually asked for: A1 for the Goethe-Zertifikat A1 or Start Deutsch 1 (often for a visa), B1 for most Ausbildung programmes, and B2 for nursing recognition (Pflege) and many university programmes.',
    },
    {
      h: 'About CEFR',
      p: 'CEFR is an international scale for language ability: A1 and A2 for beginners, B1 and B2 for intermediate, C1 for advanced. German courses split it into half-levels (A1.1, A1.2 …), as here. Topic order is checked against Profile Deutsch and the Goethe-Institut word lists.',
    },
    {
      h: 'Your progress',
      p: 'There are no accounts and no tracking. Your progress lives only in this browser. You can export and import it in Settings.',
    },
    {
      h: 'How lessons are written',
      p: 'Lessons are drafted with AI help, then checked by a German teacher before they are marked ready. Lessons not yet checked carry a Draft badge. Practice items never copy Goethe exam material.',
    },
    {
      h: 'Who made it',
      p: 'Made by Fathul, for people who want to climb slowly without feeling judged.',
    },
  ],
};

export function AboutView() {
  const { t, lang } = useT<GermanKey>();
  return (
    <PageShell title={t('about.title')} back={{ href: '/me/', label: t('nav.me') }}>
      {copy[lang].map((s) => (
        <section key={s.h} className="flex flex-col gap-2">
          <h2 className="text-h2">{s.h}</h2>
          <p className="max-w-measure">{s.p}</p>
        </section>
      ))}
      <section className="flex flex-col gap-2">
        <h2 className="text-h2">{t('about.dataTitle')}</h2>
        <p className="max-w-measure">
          {lang === 'en'
            ? 'Levels are checked against Profile Deutsch and the Goethe-Institut word lists (© Goethe-Institut), used as a reference for level tags only; nothing from them is copied. Nouns, verbs, grammar points, word bridges and lessons are written for this course.'
            : 'Level dicocokkan dengan Profile Deutsch dan daftar kata Goethe-Institut (© Goethe-Institut), hanya sebagai acuan label tingkat; tidak ada isinya yang disalin. Kata benda, kata kerja, poin tata bahasa, jembatan kata dan pelajaran ditulis untuk kursus ini.'}
        </p>
        <p className="max-w-measure">
          {lang === 'en' ? 'Word frequencies (the order of the word deck) come from ' : 'Frekuensi kata (urutan kartu kata) berasal dari '}
          <a href="https://github.com/hermitdave/FrequencyWords" rel="noopener">
            FrequencyWords
          </a>
          {lang === 'en'
            ? ' by Hermit Dave, built from the OpenSubtitles 2018 corpus, licensed '
            : ' oleh Hermit Dave, dibuat dari korpus OpenSubtitles 2018, berlisensi '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="noopener license">
            CC BY-SA 4.0
          </a>
          {lang === 'en' ? '. The subset used here is shared under the same licence. Level tags on the deck are estimates.' : '. Potongan yang dipakai di sini dibagikan dengan lisensi yang sama. Label tingkat di kartu kata adalah perkiraan.'}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-h2">{lang === 'en' ? 'Corrections' : 'Koreksi'}</h2>
        <p className="max-w-measure">
          {lang === 'en' ? 'Spotted a mistake? ' : 'Menemukan kesalahan? '}
          <a href={`${REPO}/issues`} rel="noopener">
            {lang === 'en' ? 'Open an issue on GitHub.' : 'Laporkan lewat GitHub Issues.'}
          </a>
        </p>
      </section>
    </PageShell>
  );
}
