'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import type { SpanishKey } from '@/i18n/overrides';

/** Kartu kata (PRD §5.7). Until the A1 word lists land with the content (M7), the tab says when it opens. */
export function WordDeckPanel() {
  const { t } = useT<SpanishKey>();
  return <p className="max-w-measure text-muted">{t('deck.soon')}</p>;
}
