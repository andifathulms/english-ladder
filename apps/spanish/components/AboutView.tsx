'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import { PageShell } from '@ladder/core/components/ui/PageShell';
import type { SpanishKey } from '@/i18n/overrides';

const REPO = 'https://github.com/andifathulms/spanish-ladder';

const copy = {
  id: [
    {
      h: 'Apa ini',
      p: 'Spanish Ladder adalah kursus bahasa Spanyol bertingkat untuk penutur bahasa Indonesia, dari nol sampai C1. Ada Dasar (bunyi dan ejaan) yang boleh dilewati, lalu sembilan anak tangga. Tiap pelajaran pendek, menunjukkan tata bahasa lewat gambar yang bisa kamu sentuh, dan selalu bilang apa yang dilakukan bahasa Indonesia secara berbeda.',
    },
    {
      h: 'Spanyol yang mana',
      p: 'Model utamanya bahasa Spanyol Amerika Latin yang netral (Kota Meksiko), dipakai sekitar sembilan dari sepuluh penutur. Kartu España menunjukkan di mana Spanyol berbeda: vosotros, bunyi c dan z, dan kata seperti coche dan carro.',
    },
    {
      h: 'Tentang CEFR dan DELE',
      p: 'CEFR adalah skala internasional untuk kemampuan bahasa: A1 dan A2 untuk pemula, B1 dan B2 untuk tingkat menengah, C1 untuk mahir. Ujian resmi DELE dari Instituto Cervantes memakai tingkat yang sama. Urutan topik dicocokkan dengan Plan Curricular del Instituto Cervantes.',
    },
    {
      h: 'Progresmu',
      p: 'Tidak ada akun dan tidak ada pelacakan. Progresmu hanya tersimpan di browser ini. Kamu bisa mengekspor dan mengimpornya di Pengaturan.',
    },
    {
      h: 'Cara pelajaran ditulis',
      p: 'Pelajaran disusun dengan bantuan AI, lalu diperiksa oleh guru bahasa Spanyol sebelum ditandai siap. Pelajaran yang belum diperiksa diberi tanda Draft.',
    },
    {
      h: 'Siapa yang membuat',
      p: 'Dibuat oleh Fathul, untuk orang yang ingin naik pelan-pelan tanpa merasa dihakimi.',
    },
  ],
  en: [
    {
      h: 'What this is',
      p: 'Spanish Ladder is a levelled Spanish course for Indonesian speakers, from zero to C1. An optional Dasar rung covers sounds and spelling, then nine rungs follow. Each lesson is short, shows grammar through visuals you can touch, and always says what Indonesian does differently.',
    },
    {
      h: 'Which Spanish',
      p: 'The main model is neutral Latin American Spanish (Mexico City), spoken by about nine in ten Spanish speakers. España cards show where Spain differs: vosotros, the c and z sounds, and words like coche and carro.',
    },
    {
      h: 'About CEFR and DELE',
      p: 'CEFR is an international scale for language ability: A1 and A2 for beginners, B1 and B2 for intermediate, C1 for advanced. The official DELE exams from the Instituto Cervantes use the same levels. Topic order is checked against the Plan Curricular del Instituto Cervantes.',
    },
    {
      h: 'Your progress',
      p: 'There are no accounts and no tracking. Your progress lives only in this browser. You can export and import it in Settings.',
    },
    {
      h: 'How lessons are written',
      p: 'Lessons are drafted with AI help, then checked by a Spanish teacher before they are marked ready. Lessons not yet checked carry a Draft badge.',
    },
    {
      h: 'Who made it',
      p: 'Made by Fathul, for people who want to climb slowly without feeling judged.',
    },
  ],
};

export function AboutView() {
  const { t, lang } = useT<SpanishKey>();
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
        <p className="max-w-measure">
          {lang === 'en'
            ? 'Topic order is checked against the Plan Curricular del Instituto Cervantes (© Instituto Cervantes), cited by section; no text from it is copied. Verbs, grammar points, word bridges and lessons are written for this course.'
            : 'Urutan topik dicocokkan dengan Plan Curricular del Instituto Cervantes (© Instituto Cervantes), dikutip per bagian; tidak ada teksnya yang disalin. Kata kerja, poin tata bahasa, jembatan kata dan pelajaran ditulis untuk kursus ini.'}
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
