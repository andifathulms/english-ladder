'use client';

import { useState } from 'react';
import { PlaceDrawing } from '@ladder/core/components/visuals/place/PlaceDrawing';
import { EXTRA_PLACES, PLACES, isAnyPlace, type AnyPlace } from '@ladder/core/components/visuals/place/geometry';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { article, type Gender, type Kase, type Num } from '@/lib/de/articles';
import { CASE_LABEL, CaseWord } from '@/components/de/CaseWord';

export const WECHSEL_PLACES: AnyPlace[] = ['in', 'on', 'under', 'next to', 'behind', 'in front of', 'above', 'between'];
/** The two-way prepositions for each place (DESIGN §7.5). */
export const PREP: Record<AnyPlace, string> = {
  in: 'in',
  on: 'auf',
  under: 'unter',
  'next to': 'neben',
  behind: 'hinter',
  'in front of': 'vor',
  above: 'über',
  between: 'zwischen',
};
/** The Indonesian place word (di …; ke … with movement). */
const ID_PLACE: Record<AnyPlace, string> = {
  in: 'dalam',
  on: 'atas',
  under: 'bawah',
  'next to': 'sebelah',
  behind: 'belakang',
  'in front of': 'depan',
  above: 'atas',
  between: 'antara',
};
/** The reference: the table for "under", the two boxes for "between", the box otherwise. */
const REF = (p: AnyPlace): { noun: string; gender: Gender; number: Num } =>
  p === 'under' ? { noun: 'Tisch', gender: 'm', number: 'sg' } : p === 'between' ? { noun: 'Kisten', gender: 'f', number: 'pl' } : { noun: 'Kiste', gender: 'f', number: 'sg' };

/** The phrase: preposition + article in the case + reference (in + dem → im; in + das → ins). */
export function wechselPhrase(p: AnyPlace, motion: boolean): { prep: string; art: string; noun: string; kase: Kase; contracted: boolean } {
  const kase: Kase = motion ? 'akk' : 'dat';
  const r = REF(p);
  const art = article('def', r.gender, r.number, kase)!;
  const prep = PREP[p];
  const contracted = prep === 'in' && (art === 'dem' || art === 'das');
  return { prep, art, noun: r.noun, kase, contracted };
}

const COPY = {
  id: {
    pick: 'Pilih posisi',
    motion: 'Ada gerakan (wohin?)',
    wo: 'wo? (di mana) → Dativ',
    wohin: 'wohin? (ke mana) → Akkusativ',
    bridgeWo: 'Bahasa Indonesia: di. Bola diam di tempatnya.',
    bridgeWohin: 'Bahasa Indonesia: ke. Bola bergerak ke tempatnya.',
    table: 'Tisch · meja',
    box: 'Kiste · kotak',
  },
  en: {
    pick: 'Pick a place',
    motion: 'Movement (wohin?)',
    wo: 'wo? (where) → dative',
    wohin: 'wohin? (where to) → accusative',
    bridgeWo: 'Indonesian: di. The ball stays where it is.',
    bridgeWohin: 'Indonesian: ke. The ball moves there.',
    table: 'Tisch · table',
    box: 'Kiste · box',
  },
};

export type WechselState = { place: AnyPlace; motion: boolean };
type Props = VisualProps<WechselState> & { initial?: AnyPlace; motion?: boolean };

/**
 * Wechselpräpositionen (DESIGN §7.5): the shared table, box and ball with eight places (G4 adds über
 * and zwischen) and a motion toggle. Without movement (wo?) the article is dative: "Der Ball liegt auf
 * der Kiste"; with a motion arrow (wohin?) accusative: "Ich lege den Ball auf die Kiste". The Indonesian
 * di / ke split is the bridge. Articles from lib/de.
 */
export function WechselScene({ state, interactive = true, onStateChange, initial = 'on', motion: motionInit = false, lang }: Props) {
  const c = COPY[lang];
  const [own, setOwn] = useState<WechselState>({ place: isAnyPlace(initial) ? initial : 'on', motion: motionInit });
  const [from, setFrom] = useState<AnyPlace | null>(null);
  const s = state ?? own;
  const update = (patch: Partial<WechselState>) => {
    const next = { ...s, ...patch };
    if (patch.place && patch.place !== s.place) setFrom(s.place);
    setOwn(next);
    onStateChange?.(next);
  };
  const roving = useRoving(WECHSEL_PLACES, s.place, (p) => update({ place: p }));
  const ph = wechselPhrase(s.place, s.motion);
  const before = s.motion ? 'Ich lege den Ball' : 'Der Ball liegt';
  const prepWord = ph.contracted ? (ph.art === 'dem' ? 'im' : 'ins') : ph.prep;
  const plain = `${before} ${prepWord}${ph.contracted ? '' : ` ${ph.art}`} ${ph.noun}.`;
  const ref = ph.noun === 'Tisch' ? 'meja' : ph.noun === 'Kisten' ? 'dua kotak' : 'kotak';
  const idLine = s.motion ? `Aku menaruh bola ke ${ID_PLACE[s.place]} ${ref}.` : `Bolanya di ${ID_PLACE[s.place]} ${ref}.`;
  const alt = `${plain} ${s.motion ? c.wohin : c.wo}.`;

  return (
    <div className="flex flex-col gap-4" data-visual="wechsel-scene">
      <div className="relative">
        <PlaceDrawing place={s.place} from={from} alt={alt} labels={{ table: c.table, box: c.box }} />
        {s.motion && (
          <svg aria-hidden viewBox="0 0 400 260" className="pointer-events-none absolute inset-0 h-full w-full" data-motion-arc>
            <path d="M40 40 C 110 0, 190 10, 222 70" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 5" />
            <path d="M213 61 L223 74 L229 58" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
          </svg>
        )}
      </div>
      <p lang="de" className="font-display text-sentence font-medium" data-sentence>
        {before} {prepWord}
        {!ph.contracted && (
          <>
            {' '}
            <CaseWord form={ph.art} kase={ph.kase} />
          </>
        )}{' '}
        {ph.noun}.{' '}
        <span className={`label case-${ph.kase} rounded-sm px-1 align-middle`} style={{ boxShadow: 'inset 0 0 0 1px currentColor' }}>
          {CASE_LABEL[ph.kase]}
        </span>
      </p>
      <p lang="id" className="id-text">
        {idLine}
      </p>
      <p className="text-small text-muted">{s.motion ? c.bridgeWohin : c.bridgeWo}</p>
      <p className="sr-only" aria-live="polite">
        {alt}
      </p>
      {interactive && (
        <>
          <div role="radiogroup" aria-label={c.pick} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
            {WECHSEL_PLACES.map((p, i) => (
              <button key={p} type="button" {...roving.itemProps(p, i)} lang="de" className={`min-h-touch rounded-md border-2 px-3 font-display text-[1.125rem] ${p === s.place ? 'border-accent bg-accent-soft' : 'border-rule bg-surface'}`}>
                {PREP[p]}
              </button>
            ))}
          </div>
          <div className="rounded-md bg-surface p-3">
            <Toggle label={c.motion} checked={s.motion} onChange={(on) => update({ motion: on })} onLabel="wohin?" offLabel="wo?" />
          </div>
        </>
      )}
    </div>
  );
}

// Every core place is covered (the six and the two opt-in ones).
export const ALL_CORE_PLACES = [...PLACES, ...EXTRA_PLACES];
