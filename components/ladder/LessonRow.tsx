'use client';

import Link from 'next/link';
import type { LessonSummary } from '@/lib/types';
import type { LessonState } from '@/lib/progress/derive';
import { lessonHref } from '@/lib/routes';
import { IconArrowRight, IconCheck, IconCircle, IconHalf } from '../ui/Icon';
import { useT } from '../ProgressProvider';
import { STEP_KEYS } from '../lesson/steps';

/** One node on the rung's lesson path. The current lesson opens up with its own resume button. */
export function LessonRow({ lesson, state, current }: { lesson: LessonSummary; state: LessonState; current?: boolean }) {
  const { t, lang } = useT();
  const done = state.kind === 'done' || state.kind === 'review';
  const sub = lang === 'en' ? null : lesson.title.id;

  let icon: React.ReactNode;
  let word: string;
  switch (state.kind) {
    case 'new':
      icon = <IconCircle size={14} />;
      word = t('lesson.state.new');
      break;
    case 'progress':
      icon = <IconHalf size={14} className="text-accent" />;
      word = t('lesson.state.progress', { n: state.step + 1 });
      break;
    case 'done':
      icon = <IconCheck size={14} className="text-good" />;
      word = t('lesson.state.done');
      break;
    case 'review':
      icon = <IconHalf size={14} className="text-off" />;
      word = t('lesson.state.review', { n: state.n });
      break;
  }

  return (
    <li className="relative grid grid-cols-[32px_1fr] gap-x-3">
      <span
        aria-hidden
        className={`label z-[1] mt-3 flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 tnum ${
          done
            ? 'border-accent bg-accent text-accent-ink'
            : current
              ? 'border-accent bg-surface text-accent'
              : 'border-rule bg-paper text-muted'
        }`}
        style={current ? { boxShadow: '0 0 0 4px var(--accent-soft)' } : undefined}
      >
        {done ? <IconCheck size={16} /> : lesson.order}
      </span>
      <Link
        href={lessonHref(lesson)}
        aria-current={current ? 'step' : undefined}
        className={`my-1 flex min-h-[60px] flex-col gap-1 rounded-lg px-3 py-2 text-ink no-underline transition-colors duration-quick ${
          current ? 'card' : 'hover:bg-paper-2'
        }`}
      >
        <span className="flex items-start justify-between gap-3">
          <span className="flex min-w-0 flex-col">
            <span className="sr-only">{t('home.lessonN', { n: lesson.order })}: </span>
            <span className="font-display font-bold leading-snug" lang="en">
              {lesson.title.en}
            </span>
            {sub && (
              <span className="id-text text-small" lang="id">
                {sub}
              </span>
            )}
          </span>
          <span className="label shrink-0 pt-[3px] tnum text-muted">{t('lesson.minutes', { n: lesson.minutes })}</span>
        </span>
        <span className="flex items-center gap-1 text-small text-muted">
          {icon} {word}
        </span>
        {current && (
          <>
            {state.kind === 'progress' && (
              <span aria-hidden className="flex gap-[3px] pt-1">
                {STEP_KEYS.map((k, i) => (
                  <span key={k} className={`h-[5px] w-[20px] rounded-full ${i <= state.step ? 'bg-accent' : 'bg-paper-2'}`} />
                ))}
              </span>
            )}
            <span aria-hidden className="btn btn-primary mt-1 min-h-[40px] self-start px-4 text-small">
              {state.kind === 'progress' ? t('rung.resume', { n: state.step + 1 }) : t('rung.startLesson')} <IconArrowRight size={16} />
            </span>
          </>
        )}
      </Link>
    </li>
  );
}
