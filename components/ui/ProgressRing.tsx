const R = 15;
const C = 2 * Math.PI * R;

/** A small ring for "n of total". Colour is the tier marker; the number carries the meaning. */
export function ProgressRing({ done, total, color, label }: { done: number; total: number; color: string; label: string }) {
  const frac = total ? Math.min(done / total, 1) : 0;
  return (
    <span role="img" aria-label={label} className="relative inline-flex h-[64px] w-[64px] shrink-0">
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden focusable={false}>
        <circle cx="18" cy="18" r={R} fill="none" stroke="var(--surface)" strokeWidth="4" />
        {frac > 0 && (
          <circle
            cx="18"
            cy="18"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${frac * C} ${C}`}
          />
        )}
      </svg>
      <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-small font-bold tnum">
        {done}/{total}
      </span>
    </span>
  );
}
