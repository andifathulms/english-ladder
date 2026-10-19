'use client';

// The shelf drawing (C8, from Mandarin Ladder's MeasureWords): objects on a wooden shelf, the chosen
// one lifted. Courses add the words (measure words, counters) and the controls around it.
import { useReducedMotion } from '@ladder/core/components/ProgressProvider';

export const SHELF_OBJECTS = ['book', 'cat', 'cup', 'shirt', 'paper', 'person', 'pen', 'apple'] as const;
export type ShelfObject = (typeof SHELF_OBJECTS)[number];

// Illustration tones (DESIGN §8): top lightest, front base, side darkest.
const f = (fill: string) => ({ style: { fill } });

/** The objects, drawn in the illustration system, centred on (0, 0) in a 70×70 box. */
export function ObjectShape({ o }: { o: ShelfObject }) {
  switch (o) {
    case 'book':
      return (
        <g>
          <polygon points="-26,-6 18,-6 28,-14 -16,-14" {...f('var(--card-top)')} />
          <rect x="-26" y="-6" width="44" height="22" {...f('var(--accent)')} />
          <polygon points="18,-6 28,-14 28,8 18,16" {...f('color-mix(in srgb, var(--accent) 70%, var(--ink))')} />
          <rect x="-26" y="2" width="44" height="3" {...f('var(--card-top)')} />
        </g>
      );
    case 'cat':
      return (
        <g>
          <ellipse cx="0" cy="8" rx="20" ry="13" {...f('var(--wood)')} />
          <circle cx="-14" cy="-8" r="11" {...f('var(--wood)')} />
          <polygon points="-24,-14 -21,-26 -14,-17" {...f('var(--wood-dark)')} />
          <polygon points="-10,-17 -5,-26 -3,-12" {...f('var(--wood-dark)')} />
          <path d="M18,10 C30,6 30,-6 22,-10" fill="none" style={{ stroke: 'var(--wood-dark)', strokeWidth: 4, strokeLinecap: 'round' }} />
          <circle cx="-17" cy="-9" r="1.6" {...f('var(--ink)')} />
          <circle cx="-10" cy="-9" r="1.6" {...f('var(--ink)')} />
        </g>
      );
    case 'cup':
      return (
        <g>
          <ellipse cx="0" cy="-10" rx="15" ry="5" {...f('var(--card-side)')} />
          <path d="M-15,-10 L-12,16 C-8,20 8,20 12,16 L15,-10 Z" {...f('var(--surface)')} />
          <path d="M-15,-10 L-12,16 C-8,20 8,20 12,16 L15,-10" fill="none" style={{ stroke: 'var(--card-side)', strokeWidth: 1.5 }} />
          <ellipse cx="0" cy="-10" rx="12" ry="3.5" {...f('color-mix(in srgb, var(--subject) 55%, var(--wood))')} />
          <path d="M14,-4 C24,-4 24,10 13,10" fill="none" style={{ stroke: 'var(--card-side)', strokeWidth: 3 }} />
        </g>
      );
    case 'shirt':
      return (
        <g>
          <path d="M-12,-20 L-28,-10 L-22,0 L-16,-4 L-16,22 L16,22 L16,-4 L22,0 L28,-10 L12,-20 C8,-14 -8,-14 -12,-20 Z" {...f('var(--medium)')} />
          <path d="M-12,-20 C-8,-14 8,-14 12,-20" fill="none" style={{ stroke: 'color-mix(in srgb, var(--medium) 60%, var(--ink))', strokeWidth: 2 }} />
        </g>
      );
    case 'paper':
      return (
        <g>
          <polygon points="-22,14 18,14 26,-16 -14,-16" {...f('var(--surface)')} />
          <polygon points="-22,14 18,14 26,-16 -14,-16" fill="none" style={{ stroke: 'var(--card-side)', strokeWidth: 1.5 }} />
          {[-8, -2, 4].map((y) => (
            <line key={y} x1={-12 + (y + 16) * -0.25} y1={y} x2={14 + (y + 16) * -0.25} y2={y} style={{ stroke: 'var(--rule)', strokeWidth: 1.5 }} />
          ))}
        </g>
      );
    case 'pen':
      return (
        <g>
          <polygon points="-24,6 18,-10 22,-4 -20,12" {...f('var(--medium)')} />
          <polygon points="18,-10 28,-12 22,-4" {...f('var(--card-side)')} />
          <polygon points="-24,6 -20,12 -28,12" {...f('color-mix(in srgb, var(--medium) 60%, var(--ink))')} />
        </g>
      );
    case 'apple':
      return (
        <g>
          <path d="M0,-8 C-10,-16 -24,-10 -22,4 C-20,18 -8,22 0,16 C8,22 20,18 22,4 C24,-10 10,-16 0,-8 Z" {...f('color-mix(in srgb, var(--off) 75%, var(--wood-dark))')} />
          <ellipse cx="-9" cy="-3" rx="4" ry="6" transform="rotate(-25 -9 -3)" {...f('color-mix(in srgb, var(--off) 45%, var(--card-top))')} />
          <path d="M0,-8 C0,-14 2,-18 5,-20" fill="none" style={{ stroke: 'var(--wood-dark)', strokeWidth: 2.5, strokeLinecap: 'round' }} />
          <ellipse cx="9" cy="-17" rx="6" ry="3" transform="rotate(-20 9 -17)" {...f('var(--easy)')} />
        </g>
      );
    case 'person':
      return (
        <g>
          <circle cx="0" cy="-18" r="9" {...f('var(--wood)')} />
          <path d="M-14,22 L-12,-2 C-10,-8 10,-8 12,-2 L14,22 Z" {...f('var(--subject)')} />
        </g>
      );
  }
}

type Props = { objects: readonly ShelfObject[]; lifted: ShelfObject; label: string };

/** The shelf with its objects in a row (78 apart, for up to six); the lifted one rises and its shadow narrows. */
export function ShelfDrawing({ objects, lifted, label }: Props) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 480 150" className="h-auto w-full" role="img" aria-label={label}>
      {/* Shelf */}
      <rect x="10" y="110" width="460" height="10" {...f('var(--wood)')} />
      <polygon points="10,110 470,110 462,102 18,102" {...f('color-mix(in srgb, var(--wood) 70%, var(--card-top))')} />
      <rect x="10" y="120" width="460" height="4" {...f('var(--wood-dark)')} />
      {objects.map((o, i) => {
        const up = o === lifted;
        const x = 45 + i * 78;
        return (
          <g
            key={o}
            style={{
              transform: `translate(${x}px, ${up ? 66 : 78}px)`,
              transition: reduced ? 'none' : 'transform var(--m-object-d) var(--ease-object)',
            }}
          >
            <ellipse cx="0" cy={up ? 32 : 22} rx={up ? 18 : 24} ry="3.5" style={{ fill: 'var(--ink)', opacity: 0.1 }} />
            <ObjectShape o={o} />
          </g>
        );
      })}
    </svg>
  );
}
