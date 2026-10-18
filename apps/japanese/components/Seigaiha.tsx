import { useId } from 'react';

/**
 * The board pattern (DESIGN §9): Seigaiha, overlapping concentric wave arcs (three rings per wave) on
 * a 64 × 32 tile, rows offset by half a tile; every fifth wave's outer ring in brass. It fades out
 * toward the inline-start edge so text on the board always sits on plain sumi. Generated in code.
 */
const TW = 64;
const TH = 32;
const W = 768;
const H = 384;
const RINGS = [32, 22, 12];

export type SeigaihaParts = { rings: string; brass: string };

/** Upper half-circle arc of radius r centred at (cx, cy). */
const arc = (cx: number, cy: number, r: number) => `M${cx - r},${cy}A${r},${r} 0 0 1 ${cx + r},${cy}`;

export function seigaihaPaths(): SeigaihaParts {
  const rings: string[] = [];
  const brass: string[] = [];
  let i = 0;
  for (let row = 0, y = TH; y <= H + TH; row++, y += TH / 2) {
    const offset = row % 2 ? TW / 2 : 0;
    for (let x = -TW + offset; x <= W + TW; x += TW) {
      const cx = x + TW / 2;
      RINGS.forEach((r, k) => {
        const d = arc(cx, y, r);
        if (k === 0 && i % 5 === 4) brass.push(d);
        else rings.push(d);
      });
      i++;
    }
    // Offset the counting per row so the accents don't line up in columns.
    i += 2;
  }
  return { rings: rings.join(''), brass: brass.join('') };
}

const P = seigaihaPaths();

export function Seigaiha({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMaxYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        {/* 100% at the inline-end edge, 0% at 55% across: the shell is LTR, so end is right. */}
        <linearGradient id={`sf-${id}`} x1="1" x2="0" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`sm-${id}`} maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill={`url(#sf-${id})`} />
        </mask>
      </defs>
      <g mask={`url(#sm-${id})`} fill="none" strokeWidth={1}>
        <path d={P.rings} stroke="var(--board-ink)" strokeOpacity={0.07} />
        <path d={P.brass} stroke="var(--brass)" strokeOpacity={0.22} />
      </g>
    </svg>
  );
}
