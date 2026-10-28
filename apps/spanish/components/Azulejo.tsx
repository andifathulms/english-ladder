import { useId } from 'react';

/**
 * The board pattern (DESIGN §8): Azulejo, a four-fold tile repeat on 64px squares. Each tile has a
 * quatrefoil of four arcs and a small centred diamond; circles on the grid corners read as quarter
 * circles that join across tiles. Every fourth tile's quatrefoil is brass. It fades out toward the
 * inline-start edge so text on the board sits on plain terracotta. Generated in code.
 */
const T = 64;
const W = 768;
const H = 384;
const LOBE = 11;
const DIAMOND = 4;
const CORNER = 12;

export type AzulejoParts = { tiles: string; brass: string };

/** A quatrefoil: four half-circle lobes on the sides of a square centred at (cx, cy). */
function quatrefoil(cx: number, cy: number, a: number): string {
  const arc = (x: number, y: number) => `A${a},${a} 0 0 1 ${x},${y}`;
  return `M${cx - a},${cy - a}${arc(cx + a, cy - a)}${arc(cx + a, cy + a)}${arc(cx - a, cy + a)}${arc(cx - a, cy - a)}Z`;
}
const diamond = (cx: number, cy: number, d: number) => `M${cx},${cy - d}L${cx + d},${cy}L${cx},${cy + d}L${cx - d},${cy}Z`;
const circle = (cx: number, cy: number, r: number) => `M${cx - r},${cy}A${r},${r} 0 1 1 ${cx + r},${cy}A${r},${r} 0 1 1 ${cx - r},${cy}Z`;

export function azulejoPaths(): AzulejoParts {
  const tiles: string[] = [];
  const brass: string[] = [];
  let i = 0;
  for (let y = 0; y < H; y += T) {
    for (let x = 0; x < W; x += T) {
      const cx = x + T / 2;
      const cy = y + T / 2;
      (i % 4 === 3 ? brass : tiles).push(quatrefoil(cx, cy, LOBE));
      tiles.push(diamond(cx, cy, DIAMOND));
      i++;
    }
    // Shift the count per row so the brass tiles step diagonally.
    i += 1;
  }
  for (let y = 0; y <= H; y += T) for (let x = 0; x <= W; x += T) tiles.push(circle(x, y, CORNER));
  return { tiles: tiles.join(''), brass: brass.join('') };
}

const P = azulejoPaths();

export function Azulejo({ className = '' }: { className?: string }) {
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
        <linearGradient id={`af-${id}`} x1="1" x2="0" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`am-${id}`} maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill={`url(#af-${id})`} />
        </mask>
      </defs>
      <g mask={`url(#am-${id})`} fill="none" strokeWidth={1}>
        <path d={P.tiles} stroke="var(--board-ink)" strokeOpacity={0.07} />
        <path d={P.brass} stroke="var(--brass)" strokeOpacity={0.22} />
      </g>
    </svg>
  );
}
