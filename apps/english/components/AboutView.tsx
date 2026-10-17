'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import { PageShell } from '@ladder/core/components/ui/PageShell';

const REPO = 'https://github.com/andifathulms/english-ladder';

const copy = {
  id: [
    {
      h: 'Apa ini',
      p: 'English Ladder adalah kursus bahasa Inggris bertingkat untuk penutur bahasa Indonesia. Ada sembilan anak tangga dari pemula sampai mahir, ditambah Starter untuk yang benar-benar baru mulai. Tiap pelajaran pendek, menunjukkan tata bahasa lewat gambar yang bisa kamu sentuh, dan selalu bilang apa yang dilakukan bahasa Indonesia secara berbeda.',
    },
    {
      h: 'Tentang CEFR',
      p: 'CEFR adalah skala internasional untuk kemampuan bahasa: A1 dan A2 untuk pemula, B1 dan B2 untuk tingkat menengah, C1 dan C2 untuk mahir. Tiap anak tangga di sini memakai label CEFR supaya kamu tahu kira-kira di mana posisimu.',
    },
    {
      h: 'Progresmu',
      p: 'Tidak ada akun dan tidak ada pelacakan. Progresmu hanya tersimpan di browser ini. Kamu bisa mengekspor dan mengimpornya di Pengaturan.',
    },
    {
      h: 'Cara pelajaran ditulis',
      p: 'Pelajaran disusun dengan bantuan AI, lalu diperiksa oleh manusia sebelum ditandai siap. Pelajaran yang belum diperiksa diberi tanda Draft.',
    },
    {
      h: 'Siapa yang membuat',
      p: 'Dibuat oleh Fathul, untuk orang yang ingin naik pelan-pelan tanpa merasa dihakimi.',
    },
  ],
  en: [
    {
      h: 'What this is',
      p: 'English Ladder is a levelled English course for Indonesian speakers. Nine rungs take you from beginner to advanced, plus an optional Starter for complete beginners. Each lesson is short, shows grammar through visuals you can touch, and always says what Indonesian does differently.',
    },
    {
      h: 'About CEFR',
      p: 'CEFR is an international scale for language ability: A1 and A2 for beginners, B1 and B2 for intermediate, C1 and C2 for advanced. Each rung here carries a CEFR label so you know roughly where you stand.',
    },
    {
      h: 'Your progress',
      p: 'There are no accounts and no tracking. Your progress lives only in this browser. You can export and import it in Settings.',
    },
    {
      h: 'How lessons are written',
      p: 'Lessons are drafted with AI help, then checked by a person before they are marked ready. Lessons not yet checked carry a Draft badge.',
    },
    {
      h: 'Who made it',
      p: 'Made by Fathul, for people who want to climb slowly without feeling judged.',
    },
  ],
};

export function AboutView() {
  const { t, lang } = useT();
  return (
    <PageShell title={t('about.title')} back={{ href: '/me/', label: t('nav.me') }}>
      {copy[lang].map((s) => (
        <section key={s.h} className="flex flex-col gap-2">
          <h2 className="text-h2">{s.h}</h2>
          <p className="max-w-measure">{s.p}</p>
        </section>
      ))}
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
