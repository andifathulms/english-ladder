'use client';

import type { LessonSummary, Rung } from '@/lib/types';
import { useProgress } from '../ProgressProvider';
import { AppShell } from '../ui/AppShell';
import { RungDetail, type TestInfo } from './RungDetail';

type Props = { rung: Rung; rungs: Rung[]; lessons: LessonSummary[]; test: TestInfo | null };

export function RungView({ rung, rungs, lessons, test }: Props) {
  const progress = useProgress();
  return (
    <AppShell>
      <main className="page flex max-w-lesson flex-col py-4 min-[900px]:py-8">
        <RungDetail rung={rung} rungs={rungs} lessons={lessons} progress={progress} test={test} />
      </main>
    </AppShell>
  );
}
