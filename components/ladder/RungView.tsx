'use client';

import type { LessonSummary, Rung } from '@/lib/types';
import { useProgress, useT } from '../ProgressProvider';
import { AppHeader, BackLink } from '../ui/AppHeader';
import { Footer } from '../ui/Footer';
import { RungDetail } from './RungDetail';

type Props = { rung: Rung; rungs: Rung[]; lessons: LessonSummary[]; hasTest: boolean };

export function RungView({ rung, rungs, lessons, hasTest }: Props) {
  const progress = useProgress();
  const { t } = useT();
  return (
    <>
      <AppHeader />
      <main className="page flex max-w-lesson flex-col gap-4 py-5">
        <BackLink href="/" label={t('nav.home')} />
        <RungDetail rung={rung} rungs={rungs} lessons={lessons} progress={progress} hasTest={hasTest} />
      </main>
      <Footer />
    </>
  );
}
