/**
 * Topographic contour lines for navy surfaces: elevation lines for a course about climbing.
 * Deterministic (no randomness), decorative only.
 */
function ring(cx: number, cy: number, r: number, phase: number): string {
  const pts: string[] = [];
  const n = 72;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + 0.13 * Math.sin(3 * a + phase) + 0.07 * Math.cos(5 * a - phase * 1.7) + 0.04 * Math.sin(7 * a + phase * 0.5);
    pts.push(`${(cx + Math.cos(a) * r * k).toFixed(1)},${(cy + Math.sin(a) * r * k * 0.82).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
}

const PEAKS = [
  { cx: 620, cy: 40, rings: 11, step: 34, phase: 0.6 },
  { cx: 80, cy: 330, rings: 7, step: 38, phase: 2.1 },
];

export function Contours({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox="0 0 720 360"
      preserveAspectRatio="xMaxYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {PEAKS.map((p) =>
        Array.from({ length: p.rings }, (_, i) => (
          <path
            key={`${p.cx}-${i}`}
            d={ring(p.cx, p.cy, 26 + i * p.step, p.phase + i * 0.18)}
            fill="none"
            stroke={i % 4 === 3 ? 'var(--brass)' : 'var(--board-ink)'}
            strokeOpacity={i % 4 === 3 ? 0.22 : 0.07}
            strokeWidth={1}
          />
        )),
      )}
    </svg>
  );
}
