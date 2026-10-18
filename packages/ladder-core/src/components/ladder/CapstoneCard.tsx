'use client';

import Link from 'next/link';
import { IconBook, IconCheck, IconChevron } from '../ui/Icon';
import { useT } from '../ProgressProvider';
import { useCourse } from '@ladder/core/course/context';

type Props = {
  href: string;
  kind: 'reading' | 'dialogue';
  title: string;
  meta: string;
  /** ISO date when done; shows a ✓ and the date (fixes.capstoneDone). */
  done?: string;
};

/** A rung capstone card: the reading, or the dialogue (with the course's badge and edge). */
export function CapstoneCard({ href, kind, title, meta, done }: Props) {
  const { t, lang } = useT();
  const dialogue = useCourse().capstones?.dialogue;
  const Badge = dialogue?.Icon ?? dialogue?.Badge;
  const isDialogue = kind === 'dialogue';
  const date = done ? new Date(done).toLocaleDateString(lang === 'en' ? 'en-GB' : 'id-ID', { day: 'numeric', month: 'short' }) : null;
  return (
    <Link
      href={href}
      className={`card flex min-h-[72px] items-center gap-4 p-4 text-ink no-underline transition-colors duration-quick hover:bg-paper-2 ${
        isDialogue ? (dialogue?.edgeClass ?? '') : ''
      }`}
    >
      <span
        className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-md ${
          isDialogue ? (dialogue?.iconClass ?? 'bg-accent-soft text-accent') : 'bg-accent-soft text-accent'
        }`}
      >
        {isDialogue && Badge ? <Badge /> : <IconBook />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-display text-card font-medium">{title}</span>
        <span className="text-small text-muted tnum">{meta}</span>
      </span>
      {date && (
        <span className="label flex shrink-0 items-center gap-1 text-good">
          <IconCheck size={16} /> {t('rung.capstoneDone', { date })}
        </span>
      )}
      <IconChevron className="shrink-0 text-muted" />
    </Link>
  );
}
