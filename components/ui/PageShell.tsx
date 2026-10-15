'use client';

import { AppShell } from './AppShell';
import { BackLink } from './AppHeader';

type Props = {
  title: string;
  subtitle?: React.ReactNode;
  /** Where the back link goes; tab roots have none. */
  back?: { href: string; label: string };
  children: React.ReactNode;
};

export function PageShell({ title, subtitle, back, children }: Props) {
  return (
    <AppShell>
      <main className="page flex max-w-lesson flex-col gap-6 py-5 min-[900px]:py-8">
        <header className="flex flex-col gap-1">
          {back && <BackLink href={back.href} label={back.label} />}
          <h1 className="text-h1 tracking-[-0.015em]">{title}</h1>
          {subtitle && <p className="text-muted">{subtitle}</p>}
        </header>
        {children}
      </main>
    </AppShell>
  );
}
