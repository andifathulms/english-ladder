'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import { PageShell } from '@ladder/core/components/ui/PageShell';
import type { JapaneseKey } from '@/i18n/overrides';

const REPO = 'https://github.com/andifathulms/english-ladder';

const copy = {
  id: [
    {
      h: 'Apa ini',
      p: 'Japanese Ladder adalah kursus bahasa Jepang bertingkat untuk penutur bahasa Indonesia, mulai dari nol: belum kenal kana, belum kenal kata. Dua anak tangga Kana mengajarkan hiragana, katakana dan bunyi yang sering terlewat. Sesudah itu, setiap anak tangga mengikuti level JLPT, dari N5 sampai N1, dengan JFT-Basic ditandai di Medium 1.',
    },
    {
      h: 'Tentang JLPT dan JFT-Basic',
      p: 'JLPT adalah ujian kemampuan bahasa Jepang yang paling dikenal; JFT-Basic dipakai untuk jalur kerja Tokutei Ginou. JLPT tidak lagi menerbitkan daftar kata dan kanji resmi sejak 2010, jadi kartu kata dan kartu kanji di sini memakai daftar perkiraan. Bahasa Jepang butuh waktu: N4 biasanya butuh setahun belajar dengan tekun, dan N2 tiga tahun atau lebih.',
    },
    {
      h: 'Progresmu',
      p: 'Tidak ada akun dan tidak ada pelacakan. Progresmu hanya tersimpan di browser ini. Kamu bisa mengekspor dan mengimpornya di Pengaturan.',
    },
    {
      h: 'Cara pelajaran ditulis',
      p: 'Pelajaran disusun dengan bantuan AI, lalu diperiksa oleh guru bahasa Jepang sebelum ditandai siap. Pelajaran yang belum diperiksa diberi tanda Draft. Setiap bacaan dicek terhadap kamus JMdict.',
    },
    {
      h: 'Siapa yang membuat',
      p: 'Dibuat oleh Fathul, saudara dari English Ladder, Arabic Ladder dan Mandarin Ladder, untuk orang yang ingin naik pelan-pelan tanpa merasa dihakimi.',
    },
  ],
  en: [
    {
      h: 'What this is',
      p: 'Japanese Ladder is a levelled Japanese course for Indonesian speakers, starting from complete zero: no kana, no words. Two Kana rungs teach hiragana, katakana and the sounds learners tend to miss. After that, each rung follows a JLPT level from N5 to N1, with JFT-Basic marked at Medium 1.',
    },
    {
      h: 'About JLPT and JFT-Basic',
      p: "JLPT is the best-known Japanese proficiency exam; JFT-Basic is used for the Specified Skilled Worker route. JLPT has published no official word or kanji lists since 2010, so the word and kanji cards here use estimated lists. Japanese takes time: N4 usually takes a year of steady study, and N2 three years or more.",
    },
    {
      h: 'Your progress',
      p: 'There are no accounts and no tracking. Your progress lives only in this browser. You can export and import it in Settings.',
    },
    {
      h: 'How lessons are written',
      p: 'Lessons are drafted with AI help, then checked by a Japanese teacher before they are marked ready. Lessons not yet checked carry a Draft badge. Every reading is checked against the JMdict dictionary.',
    },
    {
      h: 'Who made it',
      p: 'Made by Fathul, as a sibling of English Ladder, Arabic Ladder and Mandarin Ladder, for people who want to climb slowly without feeling judged.',
    },
  ],
};

/** Third-party data and fonts, with their licences (CLAUDE.md §8). Derived data shares CC BY-SA. */
const CREDITS: { name: string; href: string; what: { id: string; en: string }; licence: string }[] = [
  {
    name: 'JMdict (EDRDG)',
    href: 'https://www.edrdg.org/jmdict/j_jmdict.html',
    what: { id: 'Bacaan, arti dan jenis kata', en: 'Word readings, meanings and word types' },
    licence: 'CC BY-SA 4.0',
  },
  {
    name: 'KANJIDIC2 (EDRDG)',
    href: 'https://www.edrdg.org/wiki/index.php/KANJIDIC_Project',
    what: { id: 'Bacaan kanji, jumlah goresan, kelas', en: 'Kanji readings, stroke counts, grades' },
    licence: 'CC BY-SA 4.0',
  },
  {
    name: 'KanjiVG',
    href: 'https://kanjivg.tagaini.net/',
    what: { id: 'Urutan dan bentuk goresan kana dan kanji', en: 'Stroke order and shapes of kana and kanji' },
    licence: 'CC BY-SA 3.0',
  },
  {
    name: 'Klee One (Fontworks)',
    href: 'https://github.com/fontworks-fonts/Klee',
    what: { id: 'Huruf Jepang untuk mengajar', en: 'Teaching typeface for Japanese' },
    licence: 'SIL Open Font License 1.1',
  },
  {
    name: 'Noto Sans JP',
    href: 'https://github.com/notofonts/noto-cjk',
    what: { id: 'Huruf Jepang kecil di antarmuka', en: 'Small interface Japanese' },
    licence: 'SIL Open Font License 1.1',
  },
];

export function AboutView() {
  const { t, lang } = useT<JapaneseKey>();
  return (
    <PageShell title={t('about.title')} back={{ href: '/me/', label: t('nav.me') }}>
      {copy[lang].map((s) => (
        <section key={s.h} className="flex flex-col gap-2">
          <h2 className="text-h2">{s.h}</h2>
          <p className="max-w-measure">{s.p}</p>
        </section>
      ))}
      <section className="flex flex-col gap-3">
        <h2 className="text-h2">{t('about.dataTitle')}</h2>
        <ul className="card flex flex-col divide-y divide-rule overflow-hidden">
          {CREDITS.map((c) => (
            <li key={c.name} className="flex flex-col gap-1 px-4 py-3">
              <a href={c.href} rel="noopener" className="font-bold">
                {c.name}
              </a>
              <span className="text-small">{c.what[lang]}</span>
              <span className="label text-muted">{c.licence}</span>
            </li>
          ))}
        </ul>
        <p className="max-w-measure text-small text-muted">
          {lang === 'en'
            ? 'Nothing is fetched from these sources while you use the app: the data, fonts and recordings ship with it. Data derived from CC BY-SA sources is shared under the same licence.'
            : 'Tidak ada yang diambil dari sumber-sumber ini saat kamu memakai aplikasi: data, huruf dan rekamannya ikut dikemas. Data turunan dari sumber CC BY-SA dibagikan dengan lisensi yang sama.'}
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
