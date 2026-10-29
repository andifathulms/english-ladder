'use client';

// My words for German (DESIGN §6): the word with its article chip, plural and gender clue for nouns;
// the separable marker (an|rufen) and the Perfekt (hat angerufen) for verbs; the meaning and a play
// button. Search ignores umlauts and ß (schon finds schön, Strasse finds Straße).
import type { Gloss } from '@ladder/core/lib/types';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { useT } from '@ladder/core/components/ProgressProvider';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useState } from 'react';
import { genderClue } from '@/lib/de/nouns';
import type { GlossaryEntry } from '@/course/types';
import type { GermanKey } from '@/i18n/overrides';
import { GenderChip } from './GenderChip';

/** Lower-case, umlauts as plain vowels (and their digraphs), ß as ss. */
export const foldDe = (s: string) =>
  s
    .normalize('NFC')
    .toLowerCase()
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .trim();

/** Search: German with or without umlauts, the plural, or the Indonesian/English meaning. */
export function matchesWord(word: Gloss, q: string): boolean {
  const needle = foldDe(q);
  if (!needle) return true;
  const g = word.raw as GlossaryEntry;
  return [g.de, g.plural, g.id, g.en].some((x) => !!x && foldDe(x).includes(needle));
}

/** A separable verb with its joint: an|rufen. */
function SeparableWord({ g }: { g: GlossaryEntry }) {
  if (!g.sep || !g.de.startsWith(g.sep)) return <>{g.de}</>;
  return (
    <>
      {g.sep}
      <span aria-hidden className="text-accent">
        |
      </span>
      {g.de.slice(g.sep.length)}
    </>
  );
}

export function WordsRow({ word }: { word: Gloss; data?: unknown }) {
  const { t, lang } = useT<GermanKey>();
  const play = usePlay();
  const [playing, setPlaying] = useState(false);
  const g = word.raw as GlossaryEntry;
  const spoken = g.pos === 'noun' && g.gender ? `${{ m: 'der', f: 'die', n: 'das' }[g.gender]} ${g.de}` : g.de;
  const clue = g.pos === 'noun' && g.gender ? genderClue(g.de) : null;
  const run = async () => {
    setPlaying(true);
    await play(spoken);
    setPlaying(false);
  };
  return (
    <li className="flex min-h-[64px] items-center gap-3 px-4 py-2">
      {g.pos === 'noun' && g.gender && <GenderChip gender={g.gender} />}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span lang="de" className="font-display text-[1.25rem] font-medium">
            <SeparableWord g={g} />
          </span>
          {g.pos === 'noun' && g.plural && (
            <span className="text-small text-muted">
              {t('words.plural')}{' '}
              <span lang="de">{g.plural === '—' ? t('words.noPlural') : `die ${g.plural}`}</span>
            </span>
          )}
          {g.pos === 'verb' && g.verb && (
            <span className="text-small text-muted">
              {t('words.perfekt')}{' '}
              <span lang="de">
                {g.verb.aux === 'sein' ? 'ist' : 'hat'} {g.verb.partizip}
              </span>
            </span>
          )}
          <span lang={lang === 'en' && g.en ? 'en' : 'id'} className="id-text text-small">
            {lang === 'en' ? (g.en ?? g.id) : g.id}
          </span>
        </span>
        {clue && clue.gender === g.gender && (
          <span className="text-small text-muted">
            {t('words.clue', { suffix: `-${clue.suffix}` })}
          </span>
        )}
      </span>
      <PlayButton text={spoken} onPlay={run} playing={playing} small />
    </li>
  );
}
