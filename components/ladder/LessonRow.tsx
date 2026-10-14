'use client';

import Link from 'next/link';
import type { LessonSummary } from '@/lib/types';
import type { LessonState } from '@/lib/progress/derive';
import { lessonHref } from '@/lib/routes';
import { IconCheck, IconCircle, IconHalf } from '../ui/Icon';
import { Badge } from '../ui/Badge';
import { useT } from '../ProgressProvider';

export function LessonRow({ lesson, state }: { lesson: LessonSummary; state: LessonState }) {
  const { t, lang } = useT();
  const title = lesson.title.en;
  const sub = lang === 'en' ? null : lesson.title.id;

  let icon: React.ReactNode;
  let word: string;
  switch (state.kind) {
    case 'new':
      icon = <IconCircle className="text-muted" />;
      word = t('lesson.state.new');
      break;
    case 'progress':
      icon = <IconHalf className="text-accent" />;
      word = t('lesson.state.progress', { n: state.step + 1 });
      break;
    case 'done':
      icon = <IconCheck className="text-good" />;
      word = t('lesson.state.done');
      break;
    case 'review':
      icon = <IconCheck className="text-good" />;
      word = t('lesson.state.review', { n: state.n });
      break;
  }

  return (
    <li>
      <Link
        href={lessonHref(lesson)}
        className="grid min-h-[56px] grid-cols-[2ch_1fr_auto] items-center gap-x-3 rounded-sm px-2 py-2 text-ink no-underline transition-colors duration-quick hover:bg-paper-2 sm:grid-cols-[2ch_1fr_auto_auto]"
      >
        <span className="label tnum text-muted">{lesson.order}</span>
        <span className="flex min-w-0 flex-col">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-display font-bold" lang="en">{title}</span>
            {lesson.status === 'draft' && <Badge>{t('lesson.draft')}</Badge>}
          </span>
          {sub && <span className="id-text text-small" lang="id">{sub}</span>}
          <span className="flex items-center gap-1 text-small text-muted sm:hidden">
            {icon} {word}
          </span>
        </span>
        <span className="hidden items-center gap-1 text-small text-muted sm:flex">
          {icon} <span>{word}</span>
        </span>
        <span className="label tnum text-muted">{t('lesson.minutes', { n: lesson.minutes })}</span>
      </Link>
    </li>
  );
}
