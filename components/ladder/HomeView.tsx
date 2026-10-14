'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { LessonSummary, Rung } from '@/lib/types';
import { completedCount, continueTarget, currentRung } from '@/lib/progress/derive';
import { lessonHref } from '@/lib/routes';
import { useProgress, useT } from '../ProgressProvider';
import { AppHeader } from '../ui/AppHeader';
import { Footer } from '../ui/Footer';
import { IconArrowRight } from '../ui/Icon';
import { ContinueCard } from './ContinueCard';
import { LadderRail } from './LadderRail';
import { RungDetail } from './RungDetail';
import { WeekStrip } from './WeekStrip';

type Props = { rungs: Rung[]; lessons: LessonSummary[]; testRungs: string[] };

export function HomeView({ rungs, lessons, testRungs }: Props) {
  const progress = useProgress();
  const { t } = useT();
  const here = currentRung(rungs, progress);
  const [selected, setSelected] = useState<string | null>(null);
  const selRung = rungs.find((r) => r.id === (selected ?? here.id)) ?? here;
  const target = continueTarget(rungs, lessons, progress);
  const first = lessons.filter((l) => l.rung === rungs[0].id).sort((a, b) => a.order - b.order)[0];
  const showReview = completedCount(lessons, progress) >= 2;

  const onSelect = (id: string, e: React.MouseEvent) => {
    if (window.matchMedia('(min-width: 900px)').matches) {
      e.preventDefault();
      setSelected(id);
    }
  };

  return (
    <>
      <AppHeader />
      <main className="page flex max-w-home flex-col gap-7 py-6">
        <h1 className="sr-only">English Ladder</h1>
        <ContinueCard target={target} firstLessonHref={first ? lessonHref(first) : null} rungs={rungs} />

        <div className="grid gap-7 min-[900px]:grid-cols-[320px_1fr]">
          <section aria-labelledby="ladder-title" className="flex flex-col gap-3">
            <h2 id="ladder-title" className="label text-muted">{t('home.ladder')}</h2>
            <LadderRail
              rungs={rungs}
              lessons={lessons}
              progress={progress}
              hereId={here.id}
              selectedId={selected ?? undefined}
              onSelect={onSelect}
              label={t('home.ladder')}
            />
          </section>
          <div className="hidden min-[900px]:block">
            <div className="card p-6">
              <RungDetail
                rung={selRung}
                rungs={rungs}
                lessons={lessons}
                progress={progress}
                hasTest={testRungs.includes(selRung.id)}
                headingLevel={2}
              />
            </div>
          </div>
        </div>

        {showReview && (
          <Link
            href="/review/"
            className="card flex min-h-[56px] items-center justify-between gap-3 px-5 py-3 font-display font-bold text-ink no-underline hover:text-accent"
          >
            {t('home.quickReview')} <IconArrowRight />
          </Link>
        )}
        <WeekStrip progress={progress} />
      </main>
      <Footer />
    </>
  );
}
