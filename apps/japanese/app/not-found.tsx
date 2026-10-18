'use client';

import Link from 'next/link';
import { useT } from '@ladder/core/components/ProgressProvider';
import { PageShell } from '@ladder/core/components/ui/PageShell';
import type { JapaneseKey } from '@/i18n/overrides';

export default function NotFound() {
  const { t } = useT<JapaneseKey>();
  return (
    <PageShell title={t('notFound.title')}>
      <p className="max-w-measure">{t('notFound.body')}</p>
      <Link href="/" className="btn btn-primary self-start no-underline">
        {t('nav.home')}
      </Link>
    </PageShell>
  );
}
