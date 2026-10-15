'use client';

import Link from 'next/link';
import type { LessonSummary } from '@/lib/types';
import type { ProgressState } from '@/lib/progress/types';
import { lessonState, type LessonState } from '@/lib/progress/derive';
import { lessonHref } from '@/lib/routes';
import { IconCheck } from '../ui/Icon';
import { useT, type T } from '../ProgressProvider';

export function stateWord(s: LessonState, t: T, minutes: number): string {
  switch (s.kind) {
    case 'new':
      return t('lesson.minutes', { n: minutes });
    case 'progress':
      return t('lesson.state.progress', { n: s.step + 1 });
    case 'done':
      return t('lesson.state.done');
    case 'review':
      return t('lesson.state.review', { n: s.n });
  }
}

/** The lessons of your rung, one swipe away on phones and a grid on wide screens. */
export function LessonStrip({ lessons, progress, currentId }: { lessons: LessonSummary[]; progress: ProgressState; currentId?: string }) {
  const { t } = useT();
  return (
    <ol className="relative -mx-gutter flex snap-x snap-mandatory scroll-px-gutter gap-3 overflow-x-auto px-gutter pb-2 min-[900px]:mx-0 min-[900px]:grid min-[900px]:grid-cols-4 min-[900px]:overflow-visible min-[900px]:px-0">
      {lessons.map((l) => {
        const s = lessonState(l, progress);
        const done = s.kind === 'done' || s.kind === 'review';
        const now = l.id === currentId;
        return (
          <li key={l.id} className="w-[148px] shrink-0 snap-start min-[900px]:w-auto">
            <Link
              href={lessonHref(l)}
              aria-current={now ? 'step' : undefined}
              className={`card flex h-full flex-col gap-2 p-3 text-ink no-underline transition-colors duration-quick hover:bg-paper-2 ${
                now ? 'outline outline-2 -outline-offset-2 outline-accent' : ''
              }`}
            >
              <span
                aria-hidden
                className={`label flex h-[28px] w-[28px] items-center justify-center rounded-full tnum ${
                  done ? 'bg-accent text-accent-ink' : now ? 'bg-accent-soft text-accent' : 'bg-paper-2 text-muted'
                }`}
              >
                {done ? <IconCheck size={14} /> : l.order}
              </span>
              <span className="font-display text-small font-bold leading-tight" lang="en">
                {l.title.en}
              </span>
              <span className="mt-auto text-small text-muted">
                <span className="sr-only">{t('home.lessonN', { n: l.order })} · </span>
                {stateWord(s, t, l.minutes)}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
