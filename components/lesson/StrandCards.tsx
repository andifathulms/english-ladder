'use client';

import { useState } from 'react';
import type { Bilingual, Lesson } from '@/lib/types';
import { Prose } from './Prose';
import { PlayButton } from './PlayButton';
import { Sentence } from './Sentence';
import { useSpeak } from '../useSpeech';
import { useT } from '../ProgressProvider';

type Lang = 'id' | 'en';

/** A short exchange using the lesson's structure. Shown on the Examples step. */
export function TalkCard({ talk }: { talk: NonNullable<Lesson['talk']> }) {
  const { t, lang } = useT();
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-paper-2 p-5" aria-labelledby="talk-title">
      <h3 id="talk-title" className="eyebrow">
        {t('lesson.talk')}
      </h3>
      <ol className="flex flex-col gap-4">
        {talk.map((line, i) => (
          <li key={i} className="flex flex-col gap-1">
            <span className="label text-muted">{line.who}</span>
            <Sentence en={line.en} id={line.id} size="body" />
            {line.note && (
              <p className="self-start rounded-sm bg-accent-soft px-3 py-1 text-small text-ink" role="note">
                {lang === 'en' ? line.note.en : line.note.id}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

/** One pronunciation point with words to play. Shown on the Examples step. */
export function SoundCard({ sound, explain }: { sound: NonNullable<Lesson['sound']>; explain: Lang }) {
  const { t } = useT();
  const speak = useSpeak();
  const [playing, setPlaying] = useState<string | null>(null);
  const play = async (w: string) => {
    setPlaying(w);
    await speak(w);
    setPlaying(null);
  };
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-rule p-5" aria-labelledby="sound-title">
      <h3 id="sound-title" className="eyebrow flex flex-wrap items-baseline gap-2">
        {t('lesson.sound')} <span className="font-mono normal-case tracking-normal text-accent">{sound.focus}</span>
      </h3>
      <ul className="flex flex-wrap gap-2">
        {sound.words.map((w) => (
          <li key={w} className="card flex items-center gap-1 py-1 pl-3 pr-1">
            <span lang="en" className="font-display font-semibold">
              {w}
            </span>
            <PlayButton text={w} onPlay={() => play(w)} playing={playing === w} small />
          </li>
        ))}
      </ul>
      <Prose text={explain === 'en' ? sound.tip.en : sound.tip.id} lang={explain} />
    </section>
  );
}

/** Where Indonesian and English split a meaning differently. Shown on the Contrast step. */
export function WordsCard({ words, explain }: { words: Bilingual; explain: Lang }) {
  const { t } = useT();
  return (
    <section className="flex flex-col gap-2 rounded-lg bg-accent-soft p-5" aria-labelledby="words-title">
      <h3 id="words-title" className="eyebrow">
        {t('lesson.words')}
      </h3>
      <Prose text={explain === 'en' ? words.en : words.id} lang={explain} />
    </section>
  );
}
