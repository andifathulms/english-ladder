'use client';

import Link from 'next/link';
import { useT } from '../ProgressProvider';

export function Footer() {
  const { t } = useT();
  return (
    <footer className="page max-w-home py-7 text-small text-muted">
      <nav className="flex flex-wrap gap-4" aria-label="Footer">
        <Link href="/about/" className="text-muted">{t('nav.about')}</Link>
        <Link href="/words/" className="text-muted">{t('nav.words')}</Link>
        <Link href="/settings/" className="text-muted">{t('nav.settings')}</Link>
      </nav>
    </footer>
  );
}
