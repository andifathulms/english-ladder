'use client';

import { AppHeader, BackLink } from './AppHeader';
import { Footer } from './Footer';
import { useT } from '../ProgressProvider';

export function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  const { t } = useT();
  return (
    <>
      <AppHeader />
      <main className="page flex max-w-lesson flex-col gap-6 py-5">
        <BackLink href="/" label={t('nav.home')} />
        <h1 className="text-h1">{title}</h1>
        {children}
      </main>
      <Footer />
    </>
  );
}
