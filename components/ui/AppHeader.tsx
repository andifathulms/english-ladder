'use client';

import Link from 'next/link';
import { Mark } from './Mark';
import { IconBook, IconSettings } from './Icon';
import { useT } from '../ProgressProvider';

export function AppHeader() {
  const { t } = useT();
  return (
    <header className="page flex max-w-home items-center justify-between gap-3 pt-4">
      <Link href="/" className="flex items-center gap-2 text-ink no-underline">
        <Mark />
        <span className="font-display text-h2 font-bold leading-none">
          <span className="inline-block">English</span> <span className="inline-block">Ladder</span>
        </span>
      </Link>
      <nav className="flex items-center gap-1" aria-label="App">
        <Link
          href="/words/"
          className="flex min-h-touch min-w-touch items-center justify-center rounded-full text-muted hover:bg-accent-soft hover:text-accent"
          aria-label={t('nav.words')}
          title={t('nav.words')}
        >
          <IconBook />
        </Link>
        <Link
          href="/settings/"
          className="flex min-h-touch min-w-touch items-center justify-center rounded-full text-muted hover:bg-accent-soft hover:text-accent"
          aria-label={t('nav.settings')}
          title={t('nav.settings')}
        >
          <IconSettings />
        </Link>
      </nav>
    </header>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="label inline-flex min-h-touch items-center gap-1 text-muted no-underline hover:text-accent">
      <span aria-hidden>←</span> {label}
    </Link>
  );
}
