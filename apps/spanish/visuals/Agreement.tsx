'use client';

import { useState } from 'react';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { agreeAdj, article, plural, type Gender, type Num } from '@/lib/es/agree';
import { GenderChip } from '@/components/GenderChip';
import { Chips } from './Chips';

/** The nouns (DESIGN §7.2), with their authored gender; el problema and la mano are the exceptions. */
const NOUNS: Record<string, { gender: Gender; id: string; exception?: boolean }> = {
  casa: { gender: 'f', id: 'rumah' },
  libro: { gender: 'm', id: 'buku' },
  ciudad: { gender: 'f', id: 'kota' },
  problema: { gender: 'm', id: 'masalah', exception: true },
  mano: { gender: 'f', id: 'tangan', exception: true },
  carro: { gender: 'm', id: 'mobil' },
};
const NOUN_KEYS = Object.keys(NOUNS) as (keyof typeof NOUNS)[];
const ADJS = ['blanco', 'nuevo', 'grande'] as const;
const ADJ_ID: Record<(typeof ADJS)[number], string> = { blanco: 'putih', nuevo: 'baru', grande: 'besar' };

export type AgreementState = { noun: string; number: Num; adj: (typeof ADJS)[number] };

const TEXT = {
  id: { noun: 'Pilih kata benda', adj: 'Pilih kata sifat', plural: 'Jamak', on: 'Ya', off: 'Tidak', exception: 'pengecualian', why: { problema: '*Problema* berakhir -a tapi maskulin.', mano: '*Mano* berakhir -o tapi feminin.' } },
  en: { noun: 'Pick a noun', adj: 'Pick an adjective', plural: 'Plural', on: 'On', off: 'Off', exception: 'exception', why: { problema: '*Problema* ends in -a but is masculine.', mano: '*Mano* ends in -o but is feminine.' } },
};

/** A word split where it differs from `base`: the shared stem in ink, the changed ending in the accent. */
function Ending({ word, base, flip, delay }: { word: string; base: string; flip: string; delay: number }) {
  let n = 0;
  while (n < word.length && n < base.length && word[n] === base[n]) n++;
  // Show at least the inflection the noun/adjective carries (blanc|a, casa|s).
  const stem = word.slice(0, n);
  const end = word.slice(n);
  return (
    <span lang="es-419">
      {stem}
      {end && (
        <span key={flip} className="es-ending es-flip" style={{ animationDelay: `calc(var(--m-ripple-gap) * ${delay})` }}>
          {end}
        </span>
      )}
    </span>
  );
}

/**
 * Agreement (DESIGN §7.2): article · noun · adjective as linked tiles. Changing the noun or its number
 * changes the others, and the changed endings flip in, left to right (ripple). Forms come from lib/es.
 */
export function Agreement({ state, interactive = true, onStateChange, lang, initial }: VisualProps<AgreementState> & { initial?: Partial<AgreementState> }) {
  const t = TEXT[lang];
  const [own, setOwn] = useState<AgreementState>({ noun: initial?.noun ?? 'casa', number: initial?.number ?? 'sg', adj: initial?.adj ?? 'blanco' });
  const s = state ?? own;
  const set = (patch: Partial<AgreementState>) => {
    const next = { ...s, ...patch };
    setOwn(next);
    onStateChange?.(next);
  };
  const n = NOUNS[s.noun] ?? NOUNS.casa;
  const art = article(n.gender, s.number, true);
  const noun = s.number === 'pl' ? plural(s.noun) : s.noun;
  const adj = agreeAdj(s.adj, n.gender, s.number);
  const flip = `${s.noun}-${s.number}-${s.adj}`;
  const meaning = `${n.id}${s.number === 'pl' ? ` (${lang === 'en' ? 'plural' : 'jamak'})` : ''} ${ADJ_ID[s.adj]}`;
  const tile = 'flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-lg bg-surface px-4 py-2 shadow-e1 font-display text-[1.75rem]';

  return (
    <div className="flex flex-col gap-5" data-visual="agreement">
      <div className="flex flex-wrap items-center justify-center gap-2" aria-hidden>
        <span className={tile}>
          <span key={flip} lang="es-419" className="es-ending es-flip">
            {art}
          </span>
        </span>
        <span aria-hidden className="h-[2px] w-[16px] bg-rule" />
        <span className={tile}>
          <Ending word={noun} base={s.noun} flip={flip} delay={1} />
          <span className="flex items-center gap-1">
            <GenderChip gender={n.gender} />
            {n.exception && <span className="label rounded-sm px-1 text-off">⚠ {t.exception}</span>}
          </span>
        </span>
        <span aria-hidden className="h-[2px] w-[16px] bg-rule" />
        <span className={tile}>
          <Ending word={adj} base={s.adj.replace(/o$/, '')} flip={flip} delay={2} />
        </span>
      </div>
      <p className="text-center" lang="id">
        <span className="id-text">{meaning}</span>
      </p>
      {n.exception && <p className="text-small text-muted">{t.why[s.noun as 'problema' | 'mano'].replace(/\*/g, '')}</p>}
      <p className="sr-only" aria-live="polite">
        {`${art} ${noun} ${adj}: ${meaning}`}
      </p>
      {interactive && (
        <div className="flex flex-col gap-3">
          <Chips label={t.noun} options={NOUN_KEYS} value={s.noun} onChange={(v) => set({ noun: v })} lang="es-419" />
          <Chips label={t.adj} options={ADJS} value={s.adj} onChange={(v) => set({ adj: v })} lang="es-419" />
          <Toggle label={t.plural} checked={s.number === 'pl'} onChange={(on) => set({ number: on ? 'pl' : 'sg' })} onLabel={t.on} offLabel={t.off} />
        </div>
      )}
    </div>
  );
}
