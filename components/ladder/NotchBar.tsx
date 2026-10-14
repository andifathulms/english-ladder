'use client';

import { useT } from '../ProgressProvider';

type Props = {
  total: number;
  done: number;
  climbed?: boolean;
  /** Index (0-based) of a notch that just filled: it shows gold first, then settles to accent. */
  fresh?: number;
  size?: 'sm' | 'md';
};

export function NotchBar({ total, done, climbed, fresh, size = 'sm' }: Props) {
  const { t } = useT();
  const h = size === 'md' ? 'h-[10px] w-[18px]' : 'h-[8px] w-[10px]';
  return (
    <span
      className="inline-flex items-center gap-[3px]"
      role="img"
      aria-label={climbed ? t('rung.climbed') : t('rung.inProgress', { n: done }).replace('/8', `/${total}`)}
    >
      {Array.from({ length: total }, (_, i) => {
        const filled = climbed || i < done;
        const bg = climbed ? 'var(--rung)' : filled ? 'var(--accent)' : 'transparent';
        return (
          <span
            key={i}
            aria-hidden
            className={`${h} rounded-[2px] border ${i === fresh && !climbed ? 'notch-settle' : ''}`}
            style={{
              background: bg,
              borderColor: climbed ? 'var(--rung)' : filled ? 'var(--accent)' : 'var(--rule)',
            }}
          />
        );
      })}
    </span>
  );
}
