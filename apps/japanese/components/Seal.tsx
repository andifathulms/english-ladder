import { JaText } from './ja/JaText';

/**
 * The 済 seal (DESIGN §2, §6.9): a vermilion square with 済 (sumi, "done") in white Klee One 600,
 * stamped in at a slight angle. 64px on the lesson-done screen, larger on the climb moment.
 */
export function Seal({ size = 64, label }: { size?: number; label?: string }) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="seal-stamp inline-flex shrink-0 items-center justify-center rounded-[6px] bg-seal shadow-e1"
      style={{ width: size, height: size }}
    >
      <JaText className="font-semibold leading-none text-seal-ink" style={{ fontSize: size * 0.56 }} aria-hidden>
        済
      </JaText>
    </span>
  );
}
