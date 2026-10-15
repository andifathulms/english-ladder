'use client';

import { weekDays } from '@/lib/progress/derive';
import type { ProgressState } from '@/lib/progress/types';
import { useT } from '../ProgressProvider';

/** Days practised this week. Informs only: no streak count, no loss messaging. */
export function WeekStrip({ progress }: { progress: ProgressState }) {
  const { t } = useT();
  const short = t('days.short').split(',');
  const long = t('days.long').split(',');
  const days = weekDays(progress);
  return (
    <section aria-labelledby="week-title" className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <h2 id="week-title" className="eyebrow">{t('home.thisWeek')}</h2>
      <ol className="flex gap-2">
        {days.map((d, i) => (
          <li key={d.key} className="flex w-[22px] flex-col items-center gap-1">
            <span className="label text-muted" aria-hidden>{short[i]}</span>
            <span
              aria-hidden
              className="h-[10px] w-[10px] rounded-full border"
              style={{
                background: d.practised ? 'var(--accent)' : 'transparent',
                borderColor: d.practised ? 'var(--accent)' : d.today ? 'var(--ink)' : 'var(--rule)',
              }}
            />
            <span className="sr-only">
              {long[i]}: {d.practised ? t('days.practised') : t('days.notPractised')}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
