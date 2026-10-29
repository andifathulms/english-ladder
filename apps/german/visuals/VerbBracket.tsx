'use client';

import { useState } from 'react';
import { useVisualData } from '@ladder/core/components/visuals/VisualData';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { conjugate, conjugateParts, type Person } from '@/lib/de/conjugate';
import type { Zone } from '@/lib/de/bracket';
import { BRACKET_DEFAULTS, verbOf, type DeVisualData } from './data';
import { useFlip } from './useFlip';

const PERSON_OF: Record<string, Person> = { ich: 'ich', du: 'du', er: 'er', sie: 'er', es: 'er', wir: 'wir', ihr: 'ihr', Sie: 'sie' };
const ZONES: Zone[] = ['p1', 'verb', 'middle', 'end'];

const COPY = {
  id: { zone: { p1: 'Posisi 1', verb: 'Verb', middle: 'Tengah', end: 'Akhir' }, move: (w: string) => `Pindahkan ${w} ke posisi 1`, modal: (m: string) => `Tambah ${m}`, sub: 'Jadikan anak kalimat dengan weil', frame: 'Kerangka kalimat' },
  en: { zone: { p1: 'Position 1', verb: 'Verb', middle: 'Middle', end: 'End' }, move: (w: string) => `Move ${w} to position 1`, modal: (m: string) => `Add ${m}`, sub: 'Make it a weil clause', frame: 'Sentence frame' },
};

export type BracketState = { front: string; modal: boolean; sub: boolean };
type Props = VisualProps<BracketState> & {
  /** The main verb (verbs.yaml): aufstehen shows the separable prefix flying to the end. */
  verb?: string;
  subject?: keyof typeof PERSON_OF;
  /** Middle constituents ("um 6 Uhr", "heute"). */
  parts?: string[];
  /** The modal the toggle adds (können, müssen, möchten …); none hides the toggle. */
  modal?: string | null;
  /** From Easy 3: the weil toggle. */
  weil?: boolean;
  /** The Indonesian line, unchanged whatever happens (the contrast is the point). */
  id?: string;
};

/**
 * VerbBracket (DESIGN §7.4): the sentence as a frame of four zones. The finite verb holds position 2;
 * tap any chip to move it to position 1 and the subject slides into the middle. The modal toggle puts
 * the modal in the verb zone and the main verb, as an infinitive, at the end; a separable prefix flies
 * to the end; the weil toggle (Easy 3) sends the verb to the very end. Forms come from lib/de.
 */
export function VerbBracket({ state, interactive = true, onStateChange, verb = BRACKET_DEFAULTS.verb, subject = 'ich', parts = ['um 6 Uhr'], modal = BRACKET_DEFAULTS.modal, weil = false, id, lang }: Props) {
  const c = COPY[lang];
  const data = useVisualData<DeVisualData>();
  const [own, setOwn] = useState<BracketState>({ front: subject, modal: false, sub: false });
  const s = state ?? own;
  const flip = useFlip(JSON.stringify(s));
  const update = (patch: Partial<BracketState>) => {
    flip.snapshot();
    const next = { ...s, ...patch };
    setOwn(next);
    onStateChange?.(next);
  };
  const v = verbOf(data, verb);
  const m = modal ? verbOf(data, modal) : undefined;
  const person = PERSON_OF[subject];
  if (!v) return null;

  // The verbal bracket: finite part and the end part (prefix or infinitive).
  const useModal = s.modal && !!m;
  const p = conjugateParts(v, 'praesens', person)!;
  const finite = useModal ? conjugate(m!, 'praesens', person) : p.finite;
  const endWords = useModal ? [v.inf] : p.rest ? [p.rest] : [];
  const chunks = [subject, ...parts];
  const zones: Record<Zone, string[]> = { p1: [], verb: [], middle: [], end: [] };
  if (s.sub && weil) {
    // weil clause: the conjunction first, everything in order, the finite verb last (a separable verb joins: aufsteht).
    zones.p1 = ['weil'];
    zones.middle = chunks;
    zones.end = useModal ? [v.inf, finite] : p.rest ? [`${p.rest}${p.finite}`] : [finite];
  } else {
    const front = chunks.includes(s.front) ? s.front : subject;
    zones.p1 = [front];
    zones.verb = [finite];
    zones.middle = chunks.filter((x) => x !== front);
    zones.end = endWords;
  }
  const words = ZONES.flatMap((z) => zones[z]);
  const sentence = words.map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w === 'Ich' ? 'ich' : w)).join(' ');
  const shown = (w: string, first: boolean) => (first ? w.charAt(0).toUpperCase() + w.slice(1) : ['ich'].includes(w.toLowerCase()) ? w.toLowerCase() : w);

  return (
    <div className="flex flex-col gap-4" data-visual="verb-bracket">
      <div role="group" aria-label={c.frame} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ZONES.map((z) => (
          <section
            key={z}
            aria-label={c.zone[z]}
            data-zone={z}
            className="flex min-h-[88px] flex-col gap-2 rounded-md p-2"
            style={{ boxShadow: `inset 0 0 0 ${z === 'verb' ? 2 : 1}px ${z === 'verb' ? 'var(--accent)' : 'var(--rule)'}`, background: z === 'verb' && zones.verb.length ? 'var(--accent-soft)' : 'var(--paper-2)' }}
          >
            <span className="label text-muted">{c.zone[z]}</span>
            <span className="flex flex-wrap gap-1">
              {zones[z].map((w) => {
                const first = words[0] === w;
                const movable = interactive && !(s.sub && weil) && z === 'middle' && chunks.includes(w);
                const chip = (
                  <span lang="de" className="font-display text-[1.125rem]">
                    {shown(w, first)}
                  </span>
                );
                return movable ? (
                  <button key={w} ref={flip.ref(w)} type="button" onClick={() => update({ front: w })} aria-label={c.move(w)} className="min-h-touch rounded-sm bg-surface px-2 shadow-e1">
                    {chip}
                  </button>
                ) : (
                  <span key={w} ref={flip.ref(w)} className="inline-flex min-h-touch items-center rounded-sm bg-surface px-2" data-chip={w}>
                    {chip}
                  </span>
                );
              })}
            </span>
          </section>
        ))}
      </div>
      <p lang="de" className="font-display text-sentence font-medium" aria-live="polite" data-sentence>
        {sentence}
        {s.sub && weil ? ' …' : '.'}
      </p>
      {id && (
        <p lang="id" className="id-text">
          {id}
        </p>
      )}
      {interactive && (m || weil) && (
        <div className="flex flex-col gap-3 rounded-md bg-surface p-3">
          {m && <Toggle label={c.modal(conjugate(m, 'praesens', person))} checked={s.modal} onChange={(on) => update({ modal: on })} onLabel={conjugate(m, 'praesens', person)} offLabel="—" />}
          {weil && <Toggle label={c.sub} checked={s.sub} onChange={(on) => update({ sub: on })} onLabel="weil" offLabel="—" />}
        </div>
      )}
    </div>
  );
}
