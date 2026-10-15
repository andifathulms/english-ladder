'use client';

import { weekDays } from '@/lib/progress/derive';
import { useHydrated, useProgress, useT } from '../ProgressProvider';

/** Days practised this week. Informs only: no streak count, no loss messaging. */
export function WeekStrip({ compact = false }: { compact?: boolean }) {
  const { t } = useT();
  const progress = useProgress();
  const hydrated = useHydrated();
  const short = t('days.short').split(',');
  const long = t('days.long').split(',');
  // Today depends on the visitor's clock, so the static HTML renders an empty week.
  const days = hydrated ? weekDays(progress) : weekDays(progress).map((d) => ({ ...d, today: false, practised: false }));
  const dot = compact ? 'h-[16px] w-[16px]' : 'h-[24px] w-[24px]';
  return (
    <section aria-label={t('home.thisWeek')} className="flex flex-col gap-2">
      <h2 className={compact ? 'eyebrow' : 'font-display text-body font-bold'}>{t('home.thisWeek')}</h2>
      <ol className={`flex justify-between rounded-md ${compact ? 'bg-paper px-2 py-2' : 'card px-4 py-3'}`}>
        {days.map((d, i) => (
          <li key={d.key} className="flex flex-col items-center gap-1">
            <span
              aria-hidden
              className={`${dot} rounded-full border-2`}
              style={{
                background: d.practised ? 'var(--accent)' : 'transparent',
                borderColor: d.practised ? 'var(--accent)' : d.today ? 'var(--ink)' : 'var(--rule)',
              }}
            />
            <span className={`label ${d.today ? 'text-ink' : 'text-muted'}`} aria-hidden>
              {short[i]}
            </span>
            <span className="sr-only">
              {long[i]}: {d.practised ? t('days.practised') : t('days.notPractised')}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
