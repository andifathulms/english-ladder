import { useId } from 'react';

/**
 * The board pattern (DESIGN §8): Bauhaus, a 64px grid where each cell holds a circle, an inset
 * square, a quarter-arc, a half-circle or nothing, chosen by a fixed sequence so the board looks
 * composed rather than random. Strokes only; every fifth shape is brass. It fades out toward the
 * inline-start edge so text on the board sits on plain petrol. Generated in code.
 */
const T = 64;
const W = 768;
const H = 384;

export type BauhausParts = { shapes: string; brass: string };

const circle = (cx: number, cy: number, r: number) => `M${cx - r},${cy}A${r},${r} 0 1 1 ${cx + r},${cy}A${r},${r} 0 1 1 ${cx - r},${cy}Z`;
const square = (x: number, y: number, inset: number) => `M${x + inset},${y + inset}H${x + T - inset}V${y + T - inset}H${x + inset}Z`;
/** A quarter-arc from one corner of the cell, turning by `turn` (0–3). */
function quarter(x: number, y: number, turn: number) {
  const r = T - 16;
  const corners: [number, number][] = [
    [x + 8, y + T - 8],
    [x + 8, y + 8],
    [x + T - 8, y + 8],
    [x + T - 8, y + T - 8],
  ];
  const [cx, cy] = corners[turn];
  const dir: [number, number][] = [
    [1, -1],
    [1, 1],
    [-1, 1],
    [-1, -1],
  ];
  const [dx, dy] = dir[turn];
  return `M${cx + dx * r},${cy}A${r},${r} 0 0 ${turn % 2 === 0 ? 0 : 1} ${cx},${cy + dy * r}`;
}
/** A half-circle on one side of the cell, with its diameter drawn. */
function half(x: number, y: number, turn: number) {
  const r = T / 2 - 10;
  const cx = x + T / 2;
  const cy = y + T / 2;
  return turn % 2 === 0
    ? `M${cx - r},${cy}A${r},${r} 0 0 ${turn === 0 ? 1 : 0} ${cx + r},${cy}Z`
    : `M${cx},${cy - r}A${r},${r} 0 0 ${turn === 1 ? 1 : 0} ${cx},${cy + r}Z`;
}

// The cell sequence: a short, fixed pattern read across the grid with a row offset (no randomness).
const SEQ = ['circle', 'empty', 'quarter', 'square', 'half', 'empty', 'circle', 'quarter', 'empty', 'half', 'square', 'empty'] as const;

export function bauhausPaths(): BauhausParts {
  const shapes: string[] = [];
  const brass: string[] = [];
  let n = 0;
  for (let row = 0; row * T < H; row++) {
    for (let col = 0; col * T < W; col++) {
      const x = col * T;
      const y = row * T;
      const kind = SEQ[(col + row * 5) % SEQ.length];
      const turn = (col + row) % 4;
      let d = '';
      if (kind === 'circle') d = circle(x + T / 2, y + T / 2, T / 2 - 12);
      else if (kind === 'square') d = square(x, y, 14);
      else if (kind === 'quarter') d = quarter(x, y, turn);
      else if (kind === 'half') d = half(x, y, turn);
      if (!d) continue;
      n++;
      (n % 5 === 0 ? brass : shapes).push(d);
    }
  }
  return { shapes: shapes.join(''), brass: brass.join('') };
}

const P = bauhausPaths();

export function Bauhaus({ className = '' }: { className?: string }) {
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
        <linearGradient id={`bf-${id}`} x1="1" x2="0" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`bm-${id}`} maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill={`url(#bf-${id})`} />
        </mask>
      </defs>
      <g mask={`url(#bm-${id})`} fill="none" strokeWidth={1}>
        <path d={P.shapes} stroke="var(--board-ink)" strokeOpacity={0.07} />
        <path d={P.brass} stroke="var(--brass)" strokeOpacity={0.22} />
      </g>
    </svg>
  );
}
