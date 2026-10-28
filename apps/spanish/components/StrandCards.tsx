'use client';

// Strand cards (DESIGN §6): Bunyi, España, Ngobrol and Tirukan on the Examples step; Kata on the
// Contrast step. Tirukan is core's card; the Sentence slot underlines the stressed syllables.
import { useState } from 'react';
import type { StrandCard } from '@ladder/core/course/types';
import { Prose } from '@ladder/core/components/lesson/Prose';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { TirukanCard } from '@ladder/core/components/lesson/TirukanCard';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useT } from '@ladder/core/components/ProgressProvider';
import { useLessonData } from '@ladder/core/components/lesson/LessonData';
import type { Lesson } from '@/course/types';
import type { SpanishKey } from '@/i18n/overrides';
import type { EsLessonData } from '@/course/lessonData';
import { EsLine } from './es/EsLine';

const sl = (l: unknown) => l as Lesson;

/** A word with its own play button, in the line's variety. */
function PlayWord({ text, variety = 'latam' }: { text: string; variety?: 'latam' | 'es' }) {
  const play = usePlay();
  const [playing, setPlaying] = useState(false);
  const run = async () => {
    setPlaying(true);
    await play(text, variety);
    setPlaying(false);
  };
  return (
    <span className="inline-flex items-center gap-2">
      <span lang={variety === 'es' ? 'es-ES' : 'es-419'} className="font-display text-[1.375rem] font-medium leading-tight">
        {text}
      </span>
      <PlayButton text={text} variety={variety} onPlay={run} playing={playing} small />
    </span>
  );
}

/** Bunyi: a sound or stress point; words to play, and minimal pairs side by side (pero ↔ perro). */
export function SoundCard({ sound }: { sound: NonNullable<Lesson['sound']> }) {
  const { t, lang } = useT<SpanishKey>();
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-paper-2 p-5" aria-labelledby="sound-title">
      <h3 id="sound-title" className="label text-muted">
        {t('lesson.sound')}
        {sound.focus && <span className="sr-only">: {sound.focus}</span>}
      </h3>
      {sound.words.length > 0 && (
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {sound.words.map((w) => (
            <li key={w}>
              <PlayWord text={w} />
            </li>
          ))}
        </ul>
      )}
      {sound.pairs && sound.pairs.length > 0 && (
        <ul className="flex flex-col gap-3" aria-label={t('sound.pairs')}>
          {sound.pairs.map(([a, b]) => (
            <li key={`${a}-${b}`} className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <PlayWord text={a} />
              <span aria-hidden className="text-muted">
                ↔
              </span>
              <PlayWord text={b} />
            </li>
          ))}
        </ul>
      )}
      <div className="text-small">
        <Prose text={lang === 'en' ? sound.tip.en : sound.tip.id} lang={lang} />
      </div>
    </section>
  );
}

/** España: Latin America ↔ Spain rows, each in its own accent, with a one-line note (DESIGN §6). */
export function SpainCard({ spain }: { spain: NonNullable<Lesson['spain']> }) {
  const { t, lang } = useT<SpanishKey>();
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-surface p-5 shadow-e1" style={{ borderInlineStart: '3px solid var(--es)' }} aria-labelledby="spain-title">
      <h3 id="spain-title" className="label text-es">
        <span aria-hidden>● </span>
        {t('lesson.spain')}
      </h3>
      <ul className="flex flex-col gap-4">
        {spain.rows.map((r, i) => (
          <li key={i} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="label text-muted">{t('lesson.spainLatam')}</span>
              <EsLine text={r.latam} size="body" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="label text-es">{t('lesson.spainEs')}</span>
              <EsLine text={r.es} size="body" variety="es" />
            </div>
          </li>
        ))}
      </ul>
      <div className="text-small text-muted">
        <Prose text={lang === 'en' ? spain.note.en : spain.note.id} lang={lang} />
      </div>
    </section>
  );
}

/** Kata: Indonesian ← Portuguese → Spanish bridges as a chain, and false friends with ⚠ (DESIGN §6). */
export function WordsCard({ words, data }: { words: NonNullable<Lesson['words']>; data: EsLessonData }) {
  const { t, lang } = useT<SpanishKey>();
  return (
    <section className="flex flex-col gap-3 rounded-lg bg-accent-soft p-5" aria-labelledby="words-title">
      <h3 id="words-title" className="eyebrow">
        {t('lesson.words')}
      </h3>
      {data.bridges.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label={t('words.bridges')}>
          {data.bridges.map((b) => (
            <li key={b.es} className="flex flex-wrap items-baseline gap-x-2">
              <em lang="id">{b.id}</em>
              <span aria-hidden className="text-muted">
                ←
              </span>
              <span lang="pt">{b.pt}</span>
              <span className="label text-muted">{t('words.portuguese')}</span>
              <span aria-hidden className="text-muted">
                {b.kind === 'off' ? '≠' : '='}
              </span>
              <strong lang="es-419">{b.es}</strong>
              {b.kind === 'off' && <span className="text-small text-off">{t('words.bridgeOff')}</span>}
            </li>
          ))}
        </ul>
      )}
      {data.falseFriends.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label={t('words.falseFriends')}>
          {data.falseFriends.map((f) => (
            <li key={f.es} className="flex flex-col gap-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span aria-hidden className="text-off">
                  ⚠
                </span>
                <strong lang="es-419">{f.es}</strong>
                <span>= {lang === 'en' ? f.means.en : f.means.id}</span>
              </span>
              <span className="text-small">
                <Prose text={lang === 'en' ? f.warn.en : f.warn.id} lang={lang} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <Prose text={lang === 'en' ? words.en : words.id} lang={lang} />
    </section>
  );
}

/** Ngobrol: a 2–4 line exchange. */
export function TalkCard({ talk }: { talk: NonNullable<Lesson['talk']> }) {
  const { t, lang } = useT<SpanishKey>();
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-paper-2 p-5" aria-labelledby="talk-title">
      <h3 id="talk-title" className="eyebrow">
        {t('lesson.talk')}
      </h3>
      <ol className="flex flex-col gap-4">
        {talk.lines.map((line, i) => (
          <li key={i} className="flex flex-col gap-1">
            <span className="label text-muted">{line.who}</span>
            <Sentence en={line.es} id={line.id} size="body" />
            {line.note && (
              <div className="self-start rounded-sm bg-accent-soft px-3 py-1 text-small text-ink" role="note">
                <Prose text={lang === 'en' ? line.note.en : line.note.id} lang={lang} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export const SoundStrand: StrandCard = ({ lesson }) => (sl(lesson).sound ? <SoundCard sound={sl(lesson).sound!} /> : null);
export const SpainStrand: StrandCard = ({ lesson }) => (sl(lesson).spain ? <SpainCard spain={sl(lesson).spain!} /> : null);
export const TalkStrand: StrandCard = ({ lesson }) => (sl(lesson).talk ? <TalkCard talk={sl(lesson).talk!} /> : null);
export const TirukanStrand: StrandCard = ({ lesson }) => {
  const x = sl(lesson).tirukan;
  return <TirukanCard line={{ text: x.es, meaning: { id: x.id, ...(x.en ? { en: x.en } : {}) }, raw: x }} />;
};
export const WordsStrand: StrandCard = ({ lesson }) => {
  const data = useLessonData<EsLessonData>();
  return sl(lesson).words ? <WordsCard words={sl(lesson).words!} data={data} /> : null;
};
