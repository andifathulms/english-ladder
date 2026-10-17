'use client';

import { useState } from 'react';
import type { Gloss } from '@ladder/core/lib/types';
import { useCourse } from '@ladder/core/course/context';
import { PlayButton } from './PlayButton';
import { usePlay } from '../useSpeech';
import { useT } from '../ProgressProvider';
import { TargetText } from '../ui/TargetText';

/** New words as chips: the word, its transliteration, its meaning, and audio (fixes.glossaryAudio). */
export function GlossaryChips({ words }: { words: Gloss[] }) {
  const { lang } = useT();
  const course = useCourse();
  const Translit = course.components?.Translit;
  const { Word, Extra } = course.glossary ?? {};
  const play = usePlay();
  const [playing, setPlaying] = useState<string | null>(null);
  const run = async (s: string) => {
    setPlaying(s);
    await play(s);
    setPlaying(null);
  };
  return (
    <ul className="flex flex-wrap gap-2">
      {words.map((g) => (
        <li key={g.key} className="card flex items-center gap-2 py-1 pe-1 ps-3">
          <span className="flex flex-col">
            {Word ? <Word gloss={g} /> : <TargetText size="small">{g.text}</TargetText>}
            <span className="flex flex-wrap items-baseline gap-x-2">
              {g.translit && Translit && <Translit text={g.translit} />}
              <span lang={lang === 'en' && g.meaning.en ? 'en' : 'id'} className="id-text text-small">
                {lang === 'en' ? (g.meaning.en ?? g.meaning.id) : g.meaning.id}
              </span>
              {Extra && <Extra gloss={g} />}
            </span>
          </span>
          <PlayButton text={g.text} onPlay={() => run(g.text)} playing={playing === g.text} small />
        </li>
      ))}
    </ul>
  );
}
