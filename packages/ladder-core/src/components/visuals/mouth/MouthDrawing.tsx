'use client';

import { useReducedMotion } from '@ladder/core/components/ProgressProvider';

type Props = {
  /** The tongue's outline (a path in the 400×260 side section, facing left). */
  tongue: string;
  /** A key for the tongue shape, set as data-tongue (tests, transitions). */
  tongueKey: string;
  /** Where the sound is made: a ringed point. */
  place: [number, number];
  /** Text alternative for the drawing. */
  alt: string;
  /** Lips spread (default) or rounded and pushed forward (German ü, ö; DESIGN §7.1). */
  lips?: 'spread' | 'rounded';
  /** A puff of air in front of the lips (aspirated initials). */
  puff?: boolean;
  /** A short mono label in the top corner (the sounds made here). */
  label?: string;
};

/**
 * The shared mouth section (DESIGN §7.1 of German; Mandarin's MouthPlaces drawing, moved to core): a
 * face profile facing left, the roof of the mouth (ridge, hard palate, soft palate), lips, teeth, jaw
 * and the tongue, with the place of articulation ringed. Courses supply the tongue shapes and places.
 */
export function MouthDrawing({ tongue, tongueKey, place, alt, lips = 'spread', puff = false, label }: Props) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full max-w-[480px]" role="img" aria-label={alt}>
      {/* Face profile, facing left */}
      <path d="M60,40 C40,70 36,100 46,120 L58,128 C52,136 52,144 58,150 L50,160 C46,190 60,226 120,246" fill="none" style={{ stroke: 'var(--muted)', strokeWidth: 2 }} />
      {/* Roof of the mouth: ridge, hard palate, soft palate */}
      <path d="M92,128 C100,118 112,114 122,118 C150,96 200,88 236,94 C262,98 282,110 300,128" fill="none" style={{ stroke: 'var(--ink)', strokeWidth: 3, strokeLinecap: 'round' }} />
      {/* Lips: spread, or rounded and pushed forward */}
      {lips === 'rounded' ? (
        <g data-lips="rounded">
          <path d="M44,126 C54,118 78,120 92,128 L90,136 C78,134 60,134 48,138 C42,134 40,130 44,126 Z" style={{ fill: 'var(--card-side)' }} />
          <path d="M46,152 C58,148 80,150 92,156 L94,166 C78,170 58,168 48,162 C42,158 42,154 46,152 Z" style={{ fill: 'var(--card-side)' }} />
        </g>
      ) : (
        <>
          <path d="M58,128 C70,124 84,124 92,128 L90,136 C80,136 68,136 58,134 Z" style={{ fill: 'var(--card-side)' }} />
          <path d="M58,152 C70,150 82,152 92,156 L94,166 C80,168 66,166 56,160 Z" style={{ fill: 'var(--card-side)' }} />
        </>
      )}
      {/* Teeth */}
      <rect x="88" y="128" width="12" height="14" rx="3" style={{ fill: 'var(--surface)', stroke: 'var(--rule)', strokeWidth: 1.5 }} />
      <rect x="88" y="152" width="12" height="13" rx="3" style={{ fill: 'var(--surface)', stroke: 'var(--rule)', strokeWidth: 1.5 }} />
      {/* Jaw floor */}
      <path d="M96,170 C150,196 230,206 300,200" fill="none" style={{ stroke: 'var(--rule)', strokeWidth: 2 }} />
      {/* Tongue */}
      <path
        d={tongue}
        style={{ fill: 'color-mix(in srgb, var(--subject) 60%, var(--card-top))', transition: reduced ? 'none' : 'd var(--m-object-d) var(--ease-object)' }}
        data-tongue={tongueKey}
      />
      {/* The place */}
      <circle cx={place[0]} cy={place[1]} r="11" style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 3 }} />
      <circle cx={place[0]} cy={place[1]} r="4" style={{ fill: 'var(--accent)' }} />
      {/* A puff of air */}
      {puff && (
        <g aria-hidden style={{ stroke: 'var(--muted)', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }} className={reduced ? undefined : 'fade-in'}>
          <path d="M44,132 C34,134 28,138 22,136" />
          <path d="M44,142 C32,142 24,144 16,142" />
          <path d="M44,152 C34,150 28,154 22,152" />
        </g>
      )}
      {label !== undefined && (
        <text x="300" y="28" textAnchor="end" className="font-mono" style={{ fill: 'var(--muted)', fontSize: 13 }}>
          {label}
        </text>
      )}
    </svg>
  );
}
