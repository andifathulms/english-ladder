'use client';

import { useState } from 'react';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import type { VisualProps } from '@ladder/core/components/visuals/types';

export const DEMONSTRATIVES = ['this', 'these', 'that', 'those'] as const;
export type Dem = (typeof DEMONSTRATIVES)[number];

const INFO: Record<Dem, { near: boolean; many: boolean; en: string; id: string }> = {
  this: { near: true, many: false, en: '[[This]] is a book.', id: 'Ini buku.' },
  these: { near: true, many: true, en: '[[These]] are books.', id: 'Ini buku-buku.' },
  that: { near: false, many: false, en: '[[That]] is a motorbike.', id: 'Itu motor.' },
  those: { near: false, many: true, en: '[[Those]] are motorbikes.', id: 'Itu motor-motor.' },
};

const altText = (d: Dem, lang: 'id' | 'en') => {
  const i = INFO[d];
  return lang === 'en'
    ? `${d}: ${i.near ? 'near' : 'far'}, ${i.many ? 'more than one' : 'one'}.`
    : `${d}: ${i.near ? 'dekat' : 'jauh'}, ${i.many ? 'lebih dari satu' : 'satu'}.`;
};

/** Small near/far × one/many diagram for lesson 4. */
export function NearFar({ state, interactive = true, onStateChange, lang }: VisualProps<Dem>) {
  const [own, setOwn] = useState<Dem>('this');
  const d = state && DEMONSTRATIVES.includes(state) ? state : own;
  const set = (v: Dem) => {
    setOwn(v);
    onStateChange?.(v);
  };
  const roving = useRoving(DEMONSTRATIVES, d, set);
  const cur = INFO[d];

  const Book = ({ x, y, s }: { x: number; y: number; s: number }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon points="0,0 34,0 44,-8 10,-8" style={{ fill: 'var(--card-top)' }} />
      <rect x="0" y="0" width="34" height="8" style={{ fill: 'var(--subject)' }} />
      <polygon points="34,0 44,-8 44,0 34,8" style={{ fill: 'var(--card-side)' }} />
    </g>
  );
  const Bike = ({ x, y, s }: { x: number; y: number; s: number }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="8" cy="0" r="8" style={{ fill: 'var(--wood-dark)' }} />
      <circle cx="44" cy="0" r="8" style={{ fill: 'var(--wood-dark)' }} />
      <path d="M8 -4 L22 -16 H38 L44 -4 Z" style={{ fill: 'var(--subject)' }} />
      <rect x="20" y="-22" width="14" height="5" rx="2" style={{ fill: 'var(--card-side)' }} />
    </g>
  );

  return (
    <div className="flex flex-col gap-4" data-visual="near-far">
      <svg viewBox="0 0 400 210" className="h-auto w-full" role="img" aria-label={altText(d, lang)}>
        <line x1="12" y1="176.5" x2="388" y2="176.5" style={{ stroke: 'var(--rule)', strokeWidth: 1.5 }} />
        {/* the speaker's spot: no people, just a marker */}
        <circle cx="30" cy="170" r="7" style={{ fill: 'var(--accent)' }} />
        <text x="12" y="200" className="font-mono" style={{ fill: 'var(--muted)', fontSize: 12 }}>
          <tspan lang="en">you</tspan>
        </text>
        {/* near: books, big */}
        <g style={{ opacity: cur.near ? 1 : 0.3, transition: 'opacity var(--m-base-d) var(--ease)' }}>
          <ellipse cx="142" cy="176" rx="56" ry="5" style={{ fill: 'var(--ink)', opacity: 0.08 }} />
          {(cur.many ? [0, 1, 2] : [0]).map((k) => (
            <Book key={k} x={92 + (k % 2) * 4} y={168 - k * 18} s={2.2} />
          ))}
          <text x="96" y="200" className="font-mono" style={{ fill: 'var(--muted)', fontSize: 12 }}>
            <tspan lang="en">near</tspan> · <tspan lang="id" fontStyle="italic">dekat</tspan>
          </text>
        </g>
        {/* far: motorbikes, smaller */}
        <g style={{ opacity: cur.near ? 0.3 : 1, transition: 'opacity var(--m-base-d) var(--ease)' }}>
          {(cur.many ? [246, 298, 350] : [298]).map((x) => (
            <Bike key={x} x={x} y={166} s={0.9} />
          ))}
          <text x="290" y="200" className="font-mono" style={{ fill: 'var(--muted)', fontSize: 12 }}>
            <tspan lang="en">far</tspan> · <tspan lang="id" fontStyle="italic">jauh</tspan>
          </text>
        </g>
      </svg>

      <p className="sr-only" aria-live="polite">
        {altText(d, lang)}
      </p>

      {interactive && (
        <>
          <div role="radiogroup" aria-label={lang === 'en' ? 'Near or far, one or many' : 'Dekat atau jauh, satu atau banyak'} onKeyDown={roving.onKeyDown} className="grid grid-cols-2 gap-2">
            {DEMONSTRATIVES.map((v, i) => (
              <button
                key={v}
                type="button"
                {...roving.itemProps(v, i)}
                className="flex min-h-pill flex-col items-start justify-center rounded-md border-2 px-4 py-1 text-start transition-colors duration-quick"
                style={
                  v === d
                    ? { background: 'var(--accent-soft)', borderColor: 'var(--accent)' }
                    : { background: 'var(--surface)', borderColor: 'var(--rule)' }
                }
              >
                <span lang="en" className="font-display font-semibold text-ink">{v}</span>
                <span className="text-small text-muted">
                  {lang === 'en'
                    ? `${INFO[v].near ? 'near' : 'far'} · ${INFO[v].many ? 'many' : 'one'}`
                    : `${INFO[v].near ? 'dekat' : 'jauh'} · ${INFO[v].many ? 'banyak' : 'satu'}`}
                </span>
              </button>
            ))}
          </div>
          <Sentence en={cur.en} id={cur.id} />
        </>
      )}
    </div>
  );
}
