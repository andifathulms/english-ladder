'use client';

import Link from 'next/link';
import type { Rung } from '@/lib/types';
import type { RungState } from '@/lib/progress/derive';
import { NotchBar } from './NotchBar';
import { TierDot } from '../ui/TierDot';
import { useT } from '../ProgressProvider';
import { rungHref } from '@/lib/routes';

type Props = {
  rung: Rung;
  state: RungState;
  here: boolean;
  selected?: boolean;
  onSelect?: (e: React.MouseEvent) => void;
};

export function RungRow({ rung, state, here, selected, onSelect }: Props) {
  const { t } = useT();
  const soon = state.kind === 'soon';
  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute -left-[14px] -right-[14px] bottom-[-7px] h-[4px] rounded-full"
        style={{ background: 'var(--wood-dark)' }}
      />
      {here && (
        <span
          aria-hidden
          className="absolute left-[-15px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[7px] border-l-[10px] border-y-transparent"
          style={{ borderLeftColor: 'var(--accent)' }}
        />
      )}
      <Link
        href={rungHref(rung.id)}
        onClick={onSelect}
        aria-current={here ? 'step' : undefined}
        className={`grid min-h-[52px] grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 rounded-sm px-3 py-2 no-underline transition-colors duration-quick ${
          selected ? 'bg-accent-soft' : 'hover:bg-paper-2'
        } ${state.kind === 'climbed' ? 'bg-rung-soft' : ''}`}
        style={{ borderLeft: `3px solid var(--${rung.tier})` }}
      >
        <TierDot tier={rung.tier} />
        <span className="flex min-w-0 items-baseline gap-2">
          <span className={`font-display font-bold ${soon ? 'text-muted' : 'text-ink'}`}>{rung.name}</span>
          <span className="label text-muted">{rung.cefr}</span>
          {here && <span className="sr-only">· {t('home.youAreHere')}</span>}
        </span>
        <span className="flex items-center justify-end gap-2">
          {soon ? (
            <span className="label text-muted">· {t('rung.soon')}</span>
          ) : (
            <>
              <NotchBar total={rung.lessons} done={state.kind === 'progress' ? state.done : 0} climbed={state.kind === 'climbed'} />
              {state.kind === 'climbed' && <span className="label text-ink">{t('rung.climbed')}</span>}
            </>
          )}
        </span>
      </Link>
    </li>
  );
}
