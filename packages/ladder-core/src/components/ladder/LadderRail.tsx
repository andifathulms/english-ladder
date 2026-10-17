'use client';

import Link from 'next/link';
import type { LessonSummary, Rung } from '@ladder/core/lib/types';
import { rungState, type RungState } from '@ladder/core/lib/progress/derive';
import type { ProgressState } from '@ladder/core/lib/progress/types';
import { rungHref } from '@ladder/core/lib/routes';
import { useT } from '../ProgressProvider';
import { tierName, tierRange } from '../ui/tier';
import { useCefr } from '../ui/useCefr';
import { TargetText } from '../ui/TargetText';
import { useCourse } from '@ladder/core/course/context';
import { NotchBar } from './NotchBar';

type Props = { rungs: Rung[]; lessons: LessonSummary[]; progress: ProgressState; hereId: string; label: string };

const TIERS: Rung['tier'][] = ['hard', 'medium', 'easy'];

/**
 * The whole climb as a map: grouped by tier, top (Hard 3) to bottom (Easy 1), drawn between
 * two wooden rails. Future rungs stay fully visible but compact; your rung is the big row.
 */
export function LadderRail({ rungs, lessons, progress, hereId, label }: Props) {
  const { ladder } = useCourse();
  const cefr = useCefr();
  const range = (tier: string) => tierRange(rungs, tier, cefr);
  return (
    <nav aria-label={label} className="flex flex-col gap-4">
      {(ladder?.tiers ?? TIERS).map((tier) => {
        const inTier = rungs.filter((r) => r.tier === tier).reverse();
        if (!inTier.length) return null;
        return (
          <section key={tier} aria-label={`${tierName(tier)} · ${range(tier)}`} className="flex flex-col gap-1">
            <p aria-hidden className="eyebrow flex items-center gap-2 px-2">
              <span className="h-[8px] w-[8px] rounded-full" style={{ background: `var(--${tier})` }} />
              {tierName(tier)} · {range(tier)}
            </p>
            <ol className="flex flex-col">
              {inTier.map((r) => (
                <LadderRow key={r.id} rung={r} state={rungState(r, lessons, progress)} here={r.id === hereId} />
              ))}
            </ol>
          </section>
        );
      })}
    </nav>
  );
}

function LadderRow({ rung, state, here }: { rung: Rung; state: RungState; here: boolean }) {
  const { t } = useT();
  const { ladder } = useCourse();
  const cefr = useCefr();
  const subtitle = ladder?.rungSubtitle?.(rung, 'rail') ?? null;
  const soon = state.kind === 'soon';
  const climbed = state.kind === 'climbed';
  const bar = climbed ? 'var(--rung)' : here ? 'var(--accent)' : 'var(--wood-dark)';
  return (
    <li>
      <Link
        href={rungHref(rung.id)}
        aria-current={here ? 'step' : undefined}
        className={`grid grid-cols-[20px_1fr_auto] items-center gap-3 rounded-md px-2 text-ink no-underline transition-colors duration-quick ${
          here ? 'min-h-[52px] bg-accent-soft' : climbed ? 'min-h-[44px] bg-rung-soft' : 'min-h-[44px] hover:bg-paper-2'
        }`}
      >
        {/* Rails and this rung */}
        <span aria-hidden className="relative h-full self-stretch">
          <span className="absolute -bottom-px -top-px start-[2px] w-[3px] rounded-full" style={{ background: 'var(--wood)' }} />
          <span className="absolute -bottom-px -top-px end-[2px] w-[3px] rounded-full" style={{ background: 'var(--wood)' }} />
          <span className="absolute start-[2px] end-[2px] top-1/2 h-[3px] -translate-y-1/2 rounded-full" style={{ background: bar }} />
        </span>
        <span className={`flex min-w-0 items-baseline ${ladder?.rungSubtitle ? 'flex-wrap gap-x-2' : 'gap-2'}`}>
          <span className={`font-display text-body ${soon ? 'text-muted' : 'font-semibold'}`}>{rung.name}</span>
          {subtitle && (
            <TargetText face="ui" className="hidden text-[1.05rem] leading-none text-muted min-[380px]:inline">
              {subtitle}
            </TargetText>
          )}
          <span className="label text-muted">{cefr(rung.cefr)}</span>
          {rung.optional && <span className="label text-muted">· {t('rung.optional')}</span>}
          {here && <span className="sr-only">· {t('home.youAreHere')}</span>}
        </span>
        <span className="flex items-center justify-end gap-2">
          {soon ? (
            <span className="label text-muted">{t('rung.soon')}</span>
          ) : (
            <>
              {climbed && <span className="text-small font-bold">{t('rung.climbed')}</span>}
              <NotchBar total={rung.lessons} done={state.kind === 'progress' ? state.done : 0} climbed={climbed} />
            </>
          )}
        </span>
      </Link>
    </li>
  );
}
