'use client';

import { useMemo, useState } from 'react';
import type { Noun } from '@/lib/types';
import { SOUND_LABEL, RULE_LABEL, article, isTricky, pluralParts } from './nounLogic';
import { Sentence } from '../lesson/Sentence';
import type { VisualProps } from './types';

type Props = VisualProps<string> & { nouns: Noun[]; initial?: string; featured?: string[] };

const DEFAULT_FEATURED = ['hour', 'university', 'umbrella', 'motorbike', 'durian', 'box', 'city', 'knife', 'child', 'fish'];

export function NounBuilder({ nouns, state, interactive = true, onStateChange, lang, initial, featured }: Props) {
  const byWord = useMemo(() => new Map(nouns.map((n) => [n.word, n])), [nouns]);
  const chips = (featured ?? DEFAULT_FEATURED).filter((w) => byWord.has(w));
  const [own, setOwn] = useState<string>(initial && byWord.has(initial) ? initial : chips[0] ?? nouns[0]?.word);
  const word = state && byWord.has(state) ? state : own;
  const noun = byWord.get(word);
  const [shuffleIdx, setShuffleIdx] = useState(0);

  if (!noun) return null;
  const set = (w: string) => {
    setOwn(w);
    onStateChange?.(w);
  };
  const random = () => {
    // Deterministic walk through tricky and ordinary nouns alike, avoiding the current one.
    const step = (shuffleIdx * 37 + 11) % nouns.length;
    setShuffleIdx(shuffleIdx + 1);
    set(nouns[step].word === word ? nouns[(step + 1) % nouns.length].word : nouns[step].word);
  };

  const art = article(noun);
  const parts = pluralParts(noun);
  const L = (b: { en: string; id: string }) => (lang === 'en' ? b.en : b.id);
  const alt =
    lang === 'en'
      ? `${art} ${noun.word}: starts with a ${SOUND_LABEL[noun.initial_sound].en} ${noun.ipa_hint}. Plural: ${noun.plural}, rule ${RULE_LABEL[noun.plural_rule].en}.`
      : `${art} ${noun.word}: diawali ${SOUND_LABEL[noun.initial_sound].id} ${noun.ipa_hint}. Jamak: ${noun.plural}, aturan ${RULE_LABEL[noun.plural_rule].id}.`;

  return (
    <div className="flex flex-col gap-4" data-visual="noun-builder">
      {interactive && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2" role="group" aria-label={lang === 'en' ? 'Pick a noun' : 'Pilih kata benda'}>
            {chips.map((w) => (
              <button
                key={w}
                type="button"
                lang="en"
                aria-pressed={w === word}
                onClick={() => set(w)}
                className="min-h-touch rounded-full border-2 px-4 font-display font-medium transition-colors duration-quick"
                style={
                  w === word
                    ? { background: 'var(--accent)', color: 'var(--accent-ink)', borderColor: 'var(--accent)' }
                    : { background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--rule)' }
                }
              >
                {w}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-small text-muted">
              <span>{lang === 'en' ? 'More nouns' : 'Kata lain'}</span>
              <select
                value={word}
                onChange={(e) => set(e.target.value)}
                lang="en"
                className="min-h-touch rounded-sm border border-rule bg-surface px-2 text-ink"
              >
                {[...nouns].sort((a, b) => a.word.localeCompare(b.word)).map((n) => (
                  <option key={n.word} value={n.word}>
                    {n.word}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={random} className="btn btn-quiet min-h-touch px-3 text-small">
              {lang === 'en' ? 'Random' : 'Acak'}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2" aria-hidden={!interactive || undefined}>
        {/* a / an by sound */}
        <section className="flex flex-col gap-2 rounded-md bg-surface p-4">
          <h3 className="label text-muted">a / an</h3>
          <p className="font-mono text-small text-muted">
            <span lang="en">{noun.word}</span> → <span className="text-ink">{noun.ipa_hint}</span> · {L(SOUND_LABEL[noun.initial_sound])}
            {isTricky(noun) && <span className="ml-1 text-accent">*</span>}
          </p>
          <p lang="en" className="font-display text-sentence font-medium">
            <span className="focus-word">{art}</span> {noun.word}
          </p>
          <p lang="id" className="id-text">
            {noun.id}
          </p>
          {isTricky(noun) && (
            <p className="text-small text-muted">
              <span className="text-accent">* </span>
              {lang === 'en'
                ? 'The spelling misleads here. Listen to the first sound, not the first letter.'
                : 'Ejaannya menipu. Dengarkan bunyi pertamanya, bukan huruf pertamanya.'}
            </p>
          )}
        </section>

        {/* plural, step by step */}
        <section className="flex flex-col gap-2 rounded-md bg-surface p-4">
          <h3 className="label text-muted">{lang === 'en' ? 'more than one' : 'lebih dari satu'}</h3>
          <p className="font-mono text-small">
            <span className="rounded-full bg-accent-soft px-2 py-px text-ink">{L(RULE_LABEL[noun.plural_rule])}</span>
          </p>
          <p lang="en" className="font-display text-sentence font-medium" key={noun.word}>
            {noun.plural_rule === 'irregular' || noun.plural_rule === 'same' ? (
              <>
                <span className="text-muted">{noun.word}</span> → <span className="focus-word">{noun.plural}</span>
              </>
            ) : (
              <>
                <span>{parts.stem}</span>
                {parts.removed && <span className="off-text fade-in">{parts.removed}</span>}
                <span className="focus-word fade-in">{parts.added}</span>
              </>
            )}
          </p>
          <p className="text-small text-muted" lang="en">
            one {noun.word} · two {noun.plural}
          </p>
        </section>
      </div>

      {interactive && <Sentence en={`[[${art}]] ${noun.word} · two ${noun.plural}`} size="body" />}
      <p className="sr-only" aria-live="polite">
        {alt}
      </p>
    </div>
  );
}
