'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { BALL_R, PLACE_SPEC, PLACES, isPlace, placeAlt, placeSentence, type Place, type Slot } from './placeLogic';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { useReducedMotion } from '@ladder/core/components/ProgressProvider';
import type { VisualProps } from '@ladder/core/components/visuals/types';

// Illustration tones (DESIGN §10). Light from the top-left: top lightest, front base, side darkest.
const WOOD_TOP = 'color-mix(in srgb, var(--wood) 70%, var(--card-top))';
const SUBJECT_LIGHT = 'color-mix(in srgb, var(--subject) 55%, var(--card-top))';
const SUBJECT_DARK = 'color-mix(in srgb, var(--subject) 75%, var(--ink))';
const f = (fill: string, extra: React.CSSProperties = {}) => ({ style: { fill, ...extra } });

function Ball({ place, from }: { place: Place; from: Place | null }) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGGElement>(null);
  const to = PLACE_SPEC[place];
  const start = from ? PLACE_SPEC[from] : to;

  useLayoutEffect(() => {
    const g = ref.current;
    if (!g) return;
    const target = `translate(${to.x}px, ${to.y}px)`;
    if (reduced || !from || from === place) {
      g.style.transform = target;
      return;
    }
    g.style.transition = 'none';
    g.style.transform = `translate(${start.x}px, ${start.y}px)`;
    const id = requestAnimationFrame(() => {
      g.style.transition = 'transform var(--m-object-d) var(--ease-object)';
      g.style.transform = target;
    });
    return () => cancelAnimationFrame(id);
  }, [place, from, reduced, to.x, to.y, start.x, start.y]);

  return (
    <g ref={ref} style={{ transform: `translate(${start.x}px, ${start.y}px)` }} data-ball={place}>
      {/* Ground shadow: smaller when the ball is lifted onto the box */}
      <ellipse
        cx={0}
        cy={BALL_R - 0.5}
        rx={to.lifted ? 8 : 13}
        ry={3.5}
        style={{ fill: 'var(--ink)', opacity: 0.12, transition: 'rx var(--m-object-d) var(--ease-object)' }}
      />
      <circle r={BALL_R} {...f(SUBJECT_DARK)} />
      <circle cx={-1.5} cy={-1.5} r={BALL_R - 1.5} {...f('var(--subject)')} />
      <ellipse cx={-BALL_R * 0.38} cy={-BALL_R * 0.42} rx={BALL_R * 0.3} ry={BALL_R * 0.2} transform="rotate(-35)" {...f(SUBJECT_LIGHT)} />
    </g>
  );
}

type Props = VisualProps<Place> & { initial?: Place };

export function PlaceScene({ state, interactive = true, onStateChange, lang, initial }: Props) {
  const [own, setOwn] = useState<Place>(isPlace(initial) ? initial : 'on');
  const place = isPlace(state) ? state : own;
  const prev = useRef<Place | null>(null);
  const [from, setFrom] = useState<Place | null>(null);

  const set = (p: Place) => {
    if (p === place) return;
    prev.current = place;
    setFrom(place);
    setOwn(p);
    onStateChange?.(p);
  };
  const roving = useRoving(PLACES, place, set);

  const slot: Slot = PLACE_SPEC[place].slot;
  const ball = (s: Slot) => (slot === s ? <Ball key={place} place={place} from={from} /> : null);
  const glass = place === 'in';
  const sentence = placeSentence(place);

  return (
    <div className="flex flex-col gap-4" data-visual="place-scene">
      <svg viewBox="0 0 400 260" className="h-auto w-full" role="img" aria-label={placeAlt(place, lang)}>
        <g transform="translate(-28 -80) scale(1.15)">
        {/* floor */}
        <line x1="16" y1="244.5" x2="384" y2="244.5" style={{ stroke: 'var(--rule)', strokeWidth: 1.5 }} />
        <ellipse cx="210" cy="240" rx="170" ry="9" style={{ fill: 'var(--ink)', opacity: 0.08 }} />
        {/* back legs */}
        <rect x="120" y="134" width="12" height="62" {...f('var(--wood-dark)')} />
        <rect x="348" y="134" width="12" height="62" {...f('var(--wood-dark)')} />

        {ball('under')}

        {/* table */}
        <polygon points="50,170 310,170 370,122 110,122" {...f(WOOD_TOP)} />
        <rect x="50" y="170" width="260" height="12" {...f('var(--wood)')} />
        <polygon points="310,170 370,122 370,134 310,182" {...f('var(--wood-dark)')} />
        <line x1="50" y1="170" x2="310" y2="170" style={{ stroke: 'var(--wood-dark)', strokeWidth: 1.5 }} />
        <rect x="60" y="182" width="12" height="62" {...f('var(--wood)')} />
        <rect x="288" y="182" width="12" height="62" {...f('var(--wood)')} />

        {/* box shadow on the table */}
        <ellipse cx="200" cy="150" rx="58" ry="6" style={{ fill: 'var(--ink)', opacity: 0.08 }} />

        {ball('behind')}

        {/* box: inner back first, so a ball "in" sits between back and see-through front */}
        <polygon points="148,124 168,108 252,108 252,136 232,152 148,152" {...f('var(--card-side)')} />

        {ball('inside')}

        <g style={{ opacity: glass ? 0.45 : 1, transition: 'opacity var(--m-base-d) var(--ease)' }}>
          <rect x="148" y="124" width="84" height="28" {...f('var(--card)')} />
          <polygon points="148,124 232,124 252,108 168,108" {...f('var(--card-top)')} />
        </g>
        <polygon points="232,124 252,108 252,136 232,152" {...f('var(--card-side)')} />
        <line x1="148" y1="124.5" x2="232" y2="124.5" style={{ stroke: 'var(--card-side)', strokeWidth: 1.5 }} />

        {ball('front')}

        {/* labels: English · Indonesian */}
        <text x="40" y="258" className="font-mono" style={{ fill: 'var(--muted)', fontSize: 10.5 }}>
          <tspan lang="en">table</tspan> · <tspan lang="id" fontStyle="italic">meja</tspan>
        </text>
        <text x="60" y="160" className="font-mono" style={{ fill: 'var(--muted)', fontSize: 11 }}>
          <tspan lang="en">box</tspan> · <tspan lang="id" fontStyle="italic">kotak</tspan>
        </text>
        </g>
      </svg>

      <p className="sr-only" aria-live="polite">
        {placeAlt(place, lang)}
      </p>

      {interactive && (
        <>
          <div role="radiogroup" aria-label={lang === 'en' ? 'Where is the ball?' : 'Di mana bolanya?'} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
            {PLACES.map((p, i) => (
              <button
                key={p}
                type="button"
                lang="en"
                {...roving.itemProps(p, i)}
                className="min-h-touch rounded-full border-2 px-4 font-body font-semibold transition-colors duration-quick"
                style={
                  p === place
                    ? { background: 'var(--accent)', color: 'var(--accent-ink)', borderColor: 'var(--accent)' }
                    : { background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--rule)' }
                }
              >
                {p}
              </button>
            ))}
          </div>
          <Sentence en={sentence.en} id={sentence.id} />
        </>
      )}
    </div>
  );
}
