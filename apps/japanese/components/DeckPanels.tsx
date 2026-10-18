'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import type { JapaneseKey } from '@/i18n/overrides';

/** Kartu kata / Kartu kanji until the decks open with Easy 1 (M9). */
export function DeckSoon() {
  const { t } = useT<JapaneseKey>();
  return (
    <div className="card flex flex-col gap-2 p-5">
      <p className="max-w-measure text-muted">{t('deck.soon')}</p>
      <p className="max-w-measure text-small text-muted">{t('words.estimate')}</p>
    </div>
  );
}
