'use client';

// My words for Spanish (PRD §5.7): the word with its gender chip, plural, the Spain form where it
// differs, the Indonesian meaning and a play button. Search ignores accents (cafe finds café).
import type { Gloss } from '@ladder/core/lib/types';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { useT } from '@ladder/core/components/ProgressProvider';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useState } from 'react';
import { foldAccents } from '@/lib/es/text';
import type { GlossaryEntry } from '@/course/types';
import type { SpanishKey } from '@/i18n/overrides';
import { GenderChip } from './GenderChip';

const fold = (s: string) => foldAccents(s.normalize('NFC').toLowerCase()).trim();

/** Search: Spanish with or without accents, the Spain form, or the Indonesian/English meaning. */
export function matchesWord(word: Gloss, q: string): boolean {
  const needle = fold(q);
  if (!needle) return true;
  const g = word.raw as GlossaryEntry;
  return [g.es, g.plural, g.es_es, g.id, g.en].some((x) => !!x && fold(x).includes(needle));
}

export function WordsRow({ word }: { word: Gloss }) {
  const { t, lang } = useT<SpanishKey>();
  const play = usePlay();
  const [playing, setPlaying] = useState(false);
  const g = word.raw as GlossaryEntry;
  const run = async () => {
    setPlaying(true);
    await play(g.es);
    setPlaying(false);
  };
  return (
    <li className="flex min-h-[64px] items-center gap-3 px-4 py-2">
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span lang="es-419" className="font-display text-[1.25rem] font-medium">
            {g.es}
          </span>
          {g.pos === 'noun' && g.plural && (
            <span lang="es-419" className="text-small text-muted">
              {t('words.plural')} {g.plural}
            </span>
          )}
          <span lang={lang === 'en' && g.en ? 'en' : 'id'} className="id-text text-small">
            {lang === 'en' ? (g.en ?? g.id) : g.id}
          </span>
        </span>
        {g.es_es && (
          <span className="flex items-baseline gap-2 text-small">
            <span className="label text-es">{t('lesson.spainEs')}</span>
            <span lang="es-ES">{g.es_es}</span>
          </span>
        )}
      </span>
      {g.pos === 'noun' && g.gender && <GenderChip gender={g.gender} el={g.el} />}
      <PlayButton text={g.es} onPlay={run} playing={playing} small />
    </li>
  );
}
