'use client';

import type { LessonSummary, Rung } from '@/lib/types';
import { rungState } from '@/lib/progress/derive';
import type { ProgressState } from '@/lib/progress/types';
import { RungRow } from './RungRow';

type Props = {
  rungs: Rung[];
  lessons: LessonSummary[];
  progress: ProgressState;
  hereId: string;
  selectedId?: string;
  onSelect?: (id: string, e: React.MouseEvent) => void;
  label: string;
};

/** The ladder: two wooden rails with rungs as rows between them, drawn bottom (Easy 1) to top. */
export function LadderRail({ rungs, lessons, progress, hereId, selectedId, onSelect, label }: Props) {
  const top = [...rungs].reverse();
  return (
    <nav aria-label={label} className="relative px-[18px] py-2">
      <span aria-hidden className="absolute bottom-0 left-[4px] top-0 w-[6px] rounded-full" style={{ background: 'var(--wood)' }} />
      <span aria-hidden className="absolute bottom-0 right-[4px] top-0 w-[6px] rounded-full" style={{ background: 'var(--wood)' }} />
      <ol className="relative flex flex-col gap-[10px]" reversed>
        {top.map((r) => (
          <RungRow
              key={r.id}
              rung={r}
              state={rungState(r, lessons, progress)}
              here={r.id === hereId}
              selected={r.id === selectedId}
              onSelect={onSelect ? (e) => onSelect(r.id, e) : undefined}
            />
        ))}
      </ol>
    </nav>
  );
}
