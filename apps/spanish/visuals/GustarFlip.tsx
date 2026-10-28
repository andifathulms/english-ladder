'use client';

import { useState } from 'react';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { Chips } from './Chips';

const PRONOUNS = ['me', 'te', 'le', 'nos', 'les'] as const;
type Pronoun = (typeof PRONOUNS)[number];
const WHO: Record<Pronoun, string> = { me: 'Saya', te: 'Kamu', le: 'Dia', nos: 'Kami', les: 'Mereka' };

export type GustarState = { who: Pronoun; plural: boolean };

const TEXT = {
  id: {
    who: 'Siapa yang suka?',
    plural: 'Yang disukai jamak',
    on: 'Ya',
    off: 'Tidak',
    idRow: 'BAHASA INDONESIA',
    esRow: 'ESPAÑOL',
    note: (thing: string, verb: string) => `Dalam bahasa Spanyol, ${thing} adalah subjeknya: dialah yang "menyenangkan" orang itu. Karena itu kata kerjanya ${verb}, mengikuti benda yang disukai.`,
    alt: (es: string, id: string) => `${es} ${id}. Yang disukai adalah subjek kalimat Spanyol.`,
  },
  en: {
    who: 'Who likes it?',
    plural: 'The thing liked is plural',
    on: 'On',
    off: 'Off',
    idRow: 'INDONESIAN',
    esRow: 'SPANISH',
    note: (thing: string, verb: string) => `In Spanish, ${thing} is the subject: it is what "pleases" the person. So the verb is ${verb}, agreeing with the thing liked.`,
    alt: (es: string, id: string) => `${es} ${id}. The thing liked is the subject of the Spanish sentence.`,
  },
};

/** Three boxes with an arrow from the doer to the thing: Indonesian left to right, Spanish reversed. */
function Row({ label, words, from, to, subject, lang }: { label: string; words: string[]; from: number; to: number; subject: number; lang: string }) {
  const forward = from < to;
  return (
    <div className="flex flex-col gap-1">
      <span className="label text-muted">{label}</span>
      <div className="relative flex w-fit items-center gap-2 pb-6" lang={lang}>
        {words.map((w, i) => (
          <span
            key={i}
            className={`rounded-md px-3 py-2 font-display text-[1.25rem] ${i === subject ? 'bg-accent-soft font-semibold text-accent' : 'bg-surface text-ink'}`}
            style={{ boxShadow: 'var(--e-1)' }}
          >
            {w}
          </span>
        ))}
        <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 start-0 h-[16px] w-full" aria-hidden>
          <line x1={forward ? 8 : 92} y1="6" x2={forward ? 88 : 12} y2="6" style={{ stroke: 'var(--accent)', strokeWidth: 1.5 }} vectorEffect="non-scaling-stroke" />
          <path d={forward ? 'M88 2 L95 6 L88 10' : 'M12 2 L5 6 L12 10'} style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 1.5 }} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}

/**
 * GustarFlip (DESIGN §7.5): *Saya suka kopi* against *Me gusta el café*. In Indonesian the person
 * likes the thing (arrow from Saya); in Spanish the thing pleases the person (arrow from el café, the
 * subject). The plural toggle switches gusta ↔ gustan; the pronoun picker changes me/te/le/nos/les.
 */
export function GustarFlip({ state, interactive = true, onStateChange, lang, initial }: VisualProps<GustarState> & { initial?: Partial<GustarState> }) {
  const t = TEXT[lang];
  const [own, setOwn] = useState<GustarState>({ who: initial?.who ?? 'me', plural: initial?.plural ?? false });
  const s = state ?? own;
  const set = (patch: Partial<GustarState>) => {
    const next = { ...s, ...patch };
    setOwn(next);
    onStateChange?.(next);
  };
  const thing = s.plural ? 'los libros' : 'el café';
  const thingId = s.plural ? 'buku-buku' : 'kopi';
  const verb = s.plural ? 'gustan' : 'gusta';
  const pron = s.who.charAt(0).toUpperCase() + s.who.slice(1);
  const es = `${pron} [[${verb}]] ${thing}.`;
  const id = `${WHO[s.who]} suka ${thingId}.`;

  return (
    <div className="flex flex-col gap-4" data-visual="gustar-flip">
      <Row label={t.idRow} words={[WHO[s.who], 'suka', thingId]} from={0} to={2} subject={0} lang="id" />
      <Row label={t.esRow} words={[pron, verb, thing]} from={2} to={0} subject={2} lang="es-419" />
      <Sentence en={es} id={id} size="body" />
      <p className="text-small text-muted">{t.note(thing, verb)}</p>
      <p className="sr-only" aria-live="polite">
        {t.alt(es.replace(/\[\[|\]\]/g, ''), id)}
      </p>
      {interactive && (
        <div className="flex flex-col gap-3">
          <Chips label={t.who} options={PRONOUNS} value={s.who} onChange={(who) => set({ who })} render={(p) => `${p} · ${WHO[p]}`} />
          <Toggle label={t.plural} checked={s.plural} onChange={(plural) => set({ plural })} onLabel={t.on} offLabel={t.off} />
        </div>
      )}
    </div>
  );
}
