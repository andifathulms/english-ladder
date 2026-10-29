'use client';

import { useState } from 'react';
import { useVisualData } from '@ladder/core/components/visuals/VisualData';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { useReducedMotion } from '@ladder/core/components/ProgressProvider';
import { compound } from '@/lib/de/nouns';
import { GenderChip } from '@/components/GenderChip';
import { nounOf, type DeVisualData } from './data';

const DEFAULT = ['Krankenhaus', 'Handtuch', 'Arbeitsplatz', 'Wochenende', 'Kühlschrank'];

const COPY = {
  id: {
    pick: 'Pilih kata majemuk',
    join: 'Gabungkan',
    split: 'Pisahkan',
    rule: 'Kata majemuk ikut jenis kata terakhirnya.',
    joint: (j: string) => `sambungan -${j}-`,
    alt: (parts: string, word: string, art: string, mean: string) => `${parts} menjadi ${art} ${word} (${mean}).`,
  },
  en: {
    pick: 'Pick a compound',
    join: 'Join',
    split: 'Split',
    rule: 'A compound takes its last word’s gender.',
    joint: (j: string) => `the joint -${j}-`,
    alt: (parts: string, word: string, art: string, mean: string) => `${parts} make ${art} ${word} (${mean}).`,
  },
};

export type CompoundState = { word: string; joined: boolean };
type Props = VisualProps<CompoundState> & { compounds?: string[] };

/**
 * CompoundBuilder (DESIGN §7.6): word blocks snap together (Kranken + Haus, Arbeit + s + Platz). The
 * compound takes the last block's gender; the linking -s- or -n- shows as a small joint. Parts and
 * genders come from nouns.yaml; the joined word from lib/de compound().
 */
export function CompoundBuilder({ state, interactive = true, onStateChange, compounds = DEFAULT, lang }: Props) {
  const c = COPY[lang];
  const data = useVisualData<DeVisualData>();
  const reduced = useReducedMotion();
  const list = compounds.map((w) => nounOf(data, w)).filter((n): n is NonNullable<typeof n> => !!n?.parts);
  const [own, setOwn] = useState<CompoundState>({ word: list[0]?.de ?? '', joined: false });
  const s = state ?? own;
  const update = (patch: Partial<CompoundState>) => {
    const next = { ...s, ...patch };
    setOwn(next);
    onStateChange?.(next);
  };
  const roving = useRoving(
    list.map((n) => n.de),
    s.word,
    (w) => update({ word: w, joined: false }),
  );
  const n = list.find((x) => x.de === s.word) ?? list[0];
  if (!n) return null;
  const parts = n.parts!;
  const links = n.links ?? parts.slice(1).map(() => null);
  const last = nounOf(data, parts[parts.length - 1]);
  const built = compound(parts, links, last?.gender);
  const art = { m: 'der', f: 'die', n: 'das' }[n.gender];
  const alt = c.alt(parts.join(' + '), built.word, art, n.id.split(';')[0]);
  const gap = s.joined ? 0 : 12;

  return (
    <div className="flex flex-col gap-4" data-visual="compound-builder">
      <div className="flex flex-wrap items-end" style={{ gap }} data-blocks data-joined={s.joined}>
        {parts.map((p, i) => {
          const pn = nounOf(data, p);
          const isLast = i === parts.length - 1;
          return (
            <span key={p} className="flex items-end" style={{ gap, transition: reduced ? 'none' : 'gap 200ms cubic-bezier(.3,1.4,.5,1)' }}>
              <span className="flex flex-col items-start gap-1">
                {pn ? <GenderChip gender={pn.gender} /> : <span className="label text-muted">·</span>}
                <span
                  lang="de"
                  className="rounded-sm bg-surface px-3 py-2 font-display text-[1.375rem]"
                  style={{ boxShadow: `inset 0 0 0 ${isLast ? 2 : 1}px ${isLast ? 'var(--accent)' : 'var(--rule)'}` }}
                  data-part={p}
                >
                  {i > 0 && s.joined ? p.charAt(0).toLowerCase() + p.slice(1) : p}
                </span>
              </span>
              {!isLast && links[i] && (
                <span lang="de" className="mb-2 rounded-full bg-accent px-2 font-mono text-small text-accent-ink" title={c.joint(links[i]!)} data-joint>
                  {links[i]}
                </span>
              )}
            </span>
          );
        })}
      </div>
      {s.joined && (
        <p className="flex flex-wrap items-center gap-2" data-result>
          <GenderChip gender={n.gender} />
          <span lang="de" className="font-display text-sentence font-medium">
            {built.word}
          </span>
          <span lang="id" className="id-text">
            {n.id.split(';')[0]}
          </span>
        </p>
      )}
      <p className="text-small text-muted">{c.rule}</p>
      <p className="sr-only" aria-live="polite">
        {s.joined ? alt : parts.join(' + ')}
      </p>
      {interactive && (
        <>
          <button type="button" className="btn btn-primary self-start" onClick={() => update({ joined: !s.joined })}>
            {s.joined ? c.split : c.join}
          </button>
          <div role="radiogroup" aria-label={c.pick} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
            {list.map((x, i) => (
              <button key={x.de} type="button" {...roving.itemProps(x.de, i)} lang="de" className={`min-h-touch rounded-md border-2 px-3 ${x.de === n.de ? 'border-accent bg-accent-soft' : 'border-rule bg-surface'}`}>
                {x.de}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
