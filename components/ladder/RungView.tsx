'use client';

import type { LessonSummary, Rung } from '@/lib/types';
import { useProgress } from '../ProgressProvider';
import { AppShell } from '../ui/AppShell';
import { RungDetail } from './RungDetail';

type Props = { rung: Rung; rungs: Rung[]; lessons: LessonSummary[]; hasTest: boolean };

export function RungView({ rung, rungs, lessons, hasTest }: Props) {
  const progress = useProgress();
  return (
    <AppShell>
      <main className="page flex max-w-lesson flex-col py-4 min-[900px]:py-8">
        <RungDetail rung={rung} rungs={rungs} lessons={lessons} progress={progress} hasTest={hasTest} />
      </main>
    </AppShell>
  );
}
