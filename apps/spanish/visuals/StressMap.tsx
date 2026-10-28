'use client';

import { useRef, useState } from 'react';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { AccentBar } from '@ladder/core/components/ui/AccentBar';
import { useReducedMotion } from '@ladder/core/components/ProgressProvider';
import { needsAccent, stressClass, stressOf, syllabify } from '@/lib/es/syllables';
import { Chips } from './Chips';

const PRESETS = ['café', 'casa', 'árbol', 'joven', 'música', 'ciudad', 'lápiz'] as const;
type Lane = 'aguda' | 'llana' | 'esdrujula';
const LANES: Lane[] = ['aguda', 'llana', 'esdrujula'];

const TEXT = {
  id: {
    choose: 'Pilih kata',
    type: 'Atau ketik kata',
    lane: { aguda: 'AGUDA · suku terakhir', llana: 'LLANA · suku kedua dari belakang', esdrujula: 'ESDRÚJULA · suku ketiga dari belakang' },
    rule: {
      aguda: 'Perlu aksen kalau berakhir dengan vokal, n atau s.',
      llana: 'Perlu aksen kalau tidak berakhir dengan vokal, n atau s.',
      esdrujula: 'Selalu perlu aksen.',
    },
    needs: 'perlu aksen',
    none: 'tanpa aksen',
    hiatus: 'í atau ú yang ditekan di samping vokal lain selalu ditulis dengan aksen.',
    alt: (w: string, s: string, lane: string, need: boolean) => `${w}: ${s}, ${lane}, ${need ? 'perlu aksen' : 'tanpa aksen'}.`,
  },
  en: {
    choose: 'Pick a word',
    type: 'Or type a word',
    lane: { aguda: 'AGUDA · last syllable', llana: 'LLANA · second to last', esdrujula: 'ESDRÚJULA · third to last' },
    rule: {
      aguda: 'Needs an accent if it ends in a vowel, n or s.',
      llana: "Needs an accent if it doesn't end in a vowel, n or s.",
      esdrujula: 'Always needs an accent.',
    },
    needs: 'needs an accent',
    none: 'no accent',
    hiatus: 'A stressed í or ú next to another vowel is always written with its accent.',
    alt: (w: string, s: string, lane: string, need: boolean) => `${w}: ${s}, ${lane}, ${need ? 'needs an accent' : 'no accent'}.`,
  },
};

/**
 * StressMap (DESIGN §7.1): a word as syllable blocks, the stressed one raised with an accent
 * underline, and the three lanes (aguda, llana, esdrújula) with their rule; the word's lane lights up
 * with ✓ or ´. Pick a preset or type any word; syllables and stress come from lib/es.
 */
export function StressMap({ state, interactive = true, onStateChange, lang, initial }: VisualProps<string> & { initial?: string }) {
  const t = TEXT[lang];
  const reduced = useReducedMotion();
  const [own, setOwn] = useState<string>(initial ?? 'café');
  const word = state ?? own;
  const set = (w: string) => {
    setOwn(w);
    onStateChange?.(w);
  };
  const input = useRef<HTMLInputElement>(null);
  const clean = word.normalize('NFC').toLowerCase().replace(/[^a-záéíóúüñ]/g, '');
  const syl = clean ? syllabify(clean) : [];
  const idx = clean ? stressOf(clean) : 0;
  const lane: Lane = syl.length ? stressClass(syl.length, idx) : 'llana';
  const need = syl.length > 1 && needsAccent(clean, idx);
  // The lane's own rule; a stressed í/ú beside a vowel needs its accent even when the rule says no.
  const vns = /[aeiouáéíóúns]$/.test(clean);
  const byRule = lane === 'esdrujula' || (lane === 'aguda' ? vns : !vns);
  const hiatus = need && !byRule;
  const alt = clean ? t.alt(clean, syl.map((s, i) => (i === idx ? s.toUpperCase() : s)).join('-'), lane, need) : '';

  return (
    <div className="flex flex-col gap-5" data-visual="stress-map">
      <div className="flex min-h-[72px] items-end justify-center gap-1 pt-2" aria-hidden>
        {syl.map((s, i) => (
          <span
            key={`${clean}-${i}`}
            lang="es-419"
            className={`flex h-[48px] min-w-[48px] items-center justify-center rounded-md px-3 font-display text-[1.5rem] ${i === idx ? 'bg-surface text-ink shadow-e1' : 'bg-paper text-muted'}`}
            style={{
              transform: i === idx ? 'translateY(-8px)' : undefined,
              borderBottom: i === idx ? '3px solid var(--accent)' : '3px solid transparent',
              transition: reduced ? 'none' : 'transform var(--m-object-d) var(--ease-object)',
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <ol className="flex flex-col gap-2">
        {LANES.map((l) => {
          const here = l === lane && syl.length > 1;
          return (
            <li
              key={l}
              className={`flex items-center gap-3 rounded-md px-3 py-2 ${here ? 'bg-surface shadow-e1' : ''}`}
              style={{ transition: reduced ? 'none' : 'background-color var(--m-base-d) var(--ease)' }}
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className={`label ${here ? 'text-accent' : 'text-muted'}`}>{t.lane[l]}</span>
                <span className="text-small">{t.rule[l]}</span>
              </span>
              {here && (
                <span className={`label whitespace-nowrap ${need ? 'text-accent' : 'text-good'}`}>
                  <span aria-hidden className="font-display text-[1.25rem]">
                    {need ? '´' : '✓'}
                  </span>{' '}
                  {need ? t.needs : t.none}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {hiatus && <p className="text-small text-muted">{t.hiatus}</p>}
      <p className="sr-only" aria-live="polite">
        {alt}
      </p>
      {interactive && (
        <div className="flex flex-col gap-3">
          <Chips label={t.choose} options={PRESETS} value={word as (typeof PRESETS)[number]} onChange={set} lang="es-419" />
          <label className="flex flex-col gap-2">
            <span className="label text-muted">{t.type}</span>
            <input
              ref={input}
              type="text"
              lang="es-419"
              value={word}
              onChange={(e) => set(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="min-h-pill w-full rounded-md bg-surface px-4 font-display text-[1.25rem] text-ink"
              style={{ boxShadow: 'inset 0 0 0 2px var(--rule)' }}
            />
          </label>
          <AccentBar target={input} />
        </div>
      )}
    </div>
  );
}
