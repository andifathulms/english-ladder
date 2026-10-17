'use client';

import { useState } from 'react';
import type { Bilingual } from '@ladder/core/lib/types';
import type { StrandCard } from '@ladder/core/course/types';
import { Prose } from '@ladder/core/components/lesson/Prose';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { useSpeak } from '@ladder/core/components/useSpeech';
import { useT } from '@ladder/core/components/ProgressProvider';
import { useCourse } from '@ladder/core/course/context';
import type { EnLesson } from '@/course/schema';

type Lang = 'id' | 'en';

/** A short exchange using the lesson's structure. Shown on the Examples step. */
export function TalkCard({ talk }: { talk: NonNullable<EnLesson['talk']> }) {
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
export function SoundCard({ sound, explain }: { sound: NonNullable<EnLesson['sound']>; explain: Lang }) {
  const { t } = useT();
  const { target } = useCourse();
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
          <li key={w} className="card flex items-center gap-1 py-1 ps-3 pe-1">
            <span lang={target.lang} dir={target.dir} className="font-display font-semibold">
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

// English Ladder's strand registry (CourseConfig.strands): Talk then Sound on Examples, Words on Contrast.
const en = (l: unknown) => l as EnLesson;
export const TalkStrand: StrandCard = ({ lesson }) => (en(lesson).talk ? <TalkCard talk={en(lesson).talk!} /> : null);
export const SoundStrand: StrandCard = ({ lesson, cardLang }) =>
  en(lesson).sound ? <SoundCard sound={en(lesson).sound!} explain={cardLang} /> : null;
export const WordsStrand: StrandCard = ({ lesson, cardLang }) =>
  en(lesson).words ? <WordsCard words={en(lesson).words!} explain={cardLang} /> : null;
