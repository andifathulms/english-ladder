'use client';

import { useState } from 'react';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { useReducedMotion } from '@ladder/core/components/ProgressProvider';
import { sfx } from '@ladder/core/lib/speech/sfx';

type Side = 'ser' | 'estar';
type Chip = { es: string; side: Side; why: { id: string; en: string } };

/** The basic set (DESIGN §7.3): one woman, Lucía, described both ways. */
const SETS: Record<string, Chip[]> = {
  basic: [
    { es: 'Soy de Medan.', side: 'ser', why: { id: 'Asal: *ser*.', en: 'Origin: *ser*.' } },
    { es: 'Estoy en Madrid.', side: 'estar', why: { id: 'Tempat: *estar*.', en: 'Location: *estar*.' } },
    { es: 'Soy profesora.', side: 'ser', why: { id: 'Pekerjaan: *ser*.', en: 'Profession: *ser*.' } },
    { es: 'Estoy cansada.', side: 'estar', why: { id: 'Keadaan sementara: *estar*.', en: 'A passing state: *estar*.' } },
    { es: 'Soy alta.', side: 'ser', why: { id: 'Ciri tetap: *ser*.', en: 'A lasting trait: *ser*.' } },
    { es: 'Estoy contenta.', side: 'estar', why: { id: 'Perasaan: *estar*.', en: 'A feeling: *estar*.' } },
  ],
};

const TEXT = {
  id: {
    ser: 'identitas, asal, pekerjaan, sifat, waktu',
    estar: 'tempat, perasaan, keadaan sementara',
    pick: 'Pilih kalimat, lalu pilih SER atau ESTAR.',
    put: (s: string) => `Taruh di ${s}`,
    wrong: 'Belum tepat. Coba sisi lainnya.',
    done: 'Semua sudah di tempatnya.',
    footer: 'Kata yang sama, arti berbeda',
    boring: 'dia membosankan',
    bored: 'dia sedang bosan',
    person: 'Lucía, seorang perempuan',
  },
  en: {
    ser: 'identity, origin, job, character, time',
    estar: 'location, feelings, passing states',
    pick: 'Pick a sentence, then SER or ESTAR.',
    put: (s: string) => `Put it under ${s}`,
    wrong: 'Not yet. Try the other side.',
    done: 'Everything is in place.',
    footer: 'Same words, different meaning',
    boring: 'she is boring',
    bored: 'she is bored',
    person: 'Lucía, a woman',
  },
};

/** One friendly person in the illustration system (three tones, 1.5px edges, a ground shadow). */
function Person({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 120 150" className="h-[120px] w-auto" role="img" aria-label={label}>
      <ellipse cx="60" cy="142" rx="34" ry="6" style={{ fill: 'rgb(var(--shadow-rgb) / 0.12)' }} />
      <path d="M30 140 C30 104 42 92 60 92 C78 92 90 104 90 140 Z" style={{ fill: 'var(--accent)', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
      <circle cx="60" cy="58" r="26" style={{ fill: 'var(--card)', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
      {/* Hair and face in --wood-dark, which stays dark in both themes (--ink turns light in dark). */}
      <path d="M34 56 C34 30 86 28 86 56 C80 44 66 40 52 44 C44 46 38 50 34 56 Z" style={{ fill: 'var(--wood-dark)' }} />
      <circle cx="51" cy="60" r="2.2" style={{ fill: 'var(--wood-dark)' }} />
      <circle cx="69" cy="60" r="2.2" style={{ fill: 'var(--wood-dark)' }} />
      <path d="M52 71 Q60 77 68 71" style={{ fill: 'none', stroke: 'var(--wood-dark)', strokeWidth: 1.5, strokeLinecap: 'round' }} />
    </svg>
  );
}

const plain = (s: string) => s.replace(/\*/g, '');

/**
 * SerEstar (DESIGN §7.3): Lucía in the middle, SER on one side and ESTAR on the other. Sentence chips
 * are dragged, or tapped and then placed (tap a panel, or press S / E), onto a side. A right placement
 * settles with its reason; a wrong one goes back with a hint. Footer: es aburrida vs está aburrida.
 */
export function SerEstar({ interactive = true, lang, set = 'basic' }: VisualProps<never> & { set?: string }) {
  const t = TEXT[lang];
  const reduced = useReducedMotion();
  const chips = SETS[set] ?? SETS.basic;
  const [placed, setPlaced] = useState<Record<number, Side>>({});
  const [picked, setPicked] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [shake, setShake] = useState<number | null>(null);

  const place = (i: number, side: Side) => {
    const c = chips[i];
    if (c.side === side) {
      setPlaced((p) => ({ ...p, [i]: side }));
      setPicked(null);
      setMessage(`${c.es} ${plain(lang === 'en' ? c.why.en : c.why.id)}`);
      sfx('correct');
    } else {
      setShake(i);
      setMessage(`${c.es} ${t.wrong}`);
      sfx('wrong');
      setTimeout(() => setShake(null), reduced ? 0 : 380);
    }
  };
  const left = chips.map((_, i) => i).filter((i) => !placed[i]);
  const allDone = left.length === 0;

  const panel = (side: Side) => (
    <section
      aria-label={side.toUpperCase()}
      className="flex min-h-[160px] flex-1 flex-col gap-2 rounded-lg bg-surface p-3 shadow-e1"
      onDragOver={(e) => interactive && e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const i = Number(e.dataTransfer.getData('text/plain'));
        if (!Number.isNaN(i)) place(i, side);
      }}
    >
      <button
        type="button"
        disabled={!interactive || picked === null}
        onClick={() => picked !== null && place(picked, side)}
        aria-label={picked !== null ? `${t.put(side.toUpperCase())}: ${chips[picked].es}` : side.toUpperCase()}
        className="flex flex-col items-start rounded-md text-start disabled:cursor-default"
      >
        <span className="font-display text-h2 font-semibold text-accent">{side.toUpperCase()}</span>
        <span className="text-small text-muted">{t[side]}</span>
      </button>
      <ul className="flex flex-col gap-2">
        {chips.map((c, i) =>
          placed[i] === side ? (
            <li key={i} lang="es-419" className="fade-in rounded-md bg-good-bg px-3 py-2 font-display text-[1.125rem]">
              {c.es}
              <span lang={lang} className="block font-body text-small text-muted">
                {plain(lang === 'en' ? c.why.en : c.why.id)}
              </span>
            </li>
          ) : null,
        )}
      </ul>
    </section>
  );

  return (
    <div
      className="flex flex-col gap-4"
      data-visual="ser-estar"
      onKeyDown={(e) => {
        if (picked === null) return;
        if (e.key === 's' || e.key === 'S') place(picked, 'ser');
        if (e.key === 'e' || e.key === 'E') place(picked, 'estar');
      }}
    >
      <div className="flex justify-center min-[480px]:hidden">
        <Person label={t.person} />
      </div>
      <div className="flex items-stretch gap-3">
        {panel('ser')}
        <div className="hidden shrink-0 items-center min-[480px]:flex">
          <Person label={t.person} />
        </div>
        {panel('estar')}
      </div>
      {interactive && !allDone && (
        <>
          <p className="text-small text-muted">{t.pick}</p>
          <ul className="flex flex-wrap gap-2">
            {left.map((i) => (
              <li key={i}>
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', String(i))}
                  onClick={() => setPicked(picked === i ? null : i)}
                  aria-pressed={picked === i}
                  lang="es-419"
                  className={`min-h-pill rounded-full border-2 px-4 font-display text-[1.125rem] transition-colors duration-quick ${
                    picked === i ? 'border-accent bg-accent-soft' : 'border-rule bg-surface'
                  } ${shake === i ? 'text-off' : 'text-ink'}`}
                  style={{ transform: shake === i && !reduced ? 'translateX(-6px)' : undefined, transition: 'transform var(--m-quick-d) var(--ease)' }}
                >
                  {chips[i].es}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <p aria-live="polite" className="min-h-[1.5em] text-small">
        {allDone ? t.done : message}
      </p>
      <div className="flex flex-col gap-1 rounded-md bg-surface px-4 py-3">
        <span className="label text-muted">{t.footer}</span>
        <p>
          <span lang="es-419" className="font-display text-[1.125rem]">
            Ella <span className="focus-word">es</span> aburrida.
          </span>{' '}
          <span className="id-text">{t.boring}</span>
        </p>
        <p>
          <span lang="es-419" className="font-display text-[1.125rem]">
            Ella <span className="focus-word">está</span> aburrida.
          </span>{' '}
          <span className="id-text">{t.bored}</span>
        </p>
      </div>
    </div>
  );
}
