/** Two rails and three rungs drawn as one shape; the top rung in --rung gold. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden focusable={false}>
      <path
        d="M9 3v26M23 3v26M9 22h14M9 15h14"
        stroke="var(--accent)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M9 8h14" stroke="var(--rung)" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
