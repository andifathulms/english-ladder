'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import type { JapaneseKey } from '@/i18n/overrides';

type Props = {
  /** Show the Furigana pill (the rung fades furigana: new or on-request). */
  furigana: boolean;
  furiganaOn: boolean;
  onFurigana: (v: boolean) => void;
  /** Show the Romaji pill (Kana 1 lessons 7–8, where romaji shows only on new kana). */
  romaji: boolean;
  romajiOn: boolean;
  onRomaji: (v: boolean) => void;
};

function Pill({ on, onClick, label, children }: { on: boolean; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-[32px] items-center gap-1 rounded-full px-3 text-small font-bold transition-colors duration-quick ${
        on ? 'bg-accent-soft text-accent' : 'bg-paper-2 text-muted hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Furigana and Romaji switches for the lesson top bar (DESIGN §6.5). Each appears only where the
 * fades allow it. Both are lesson-scoped: they reset when the lesson closes.
 */
export function LessonTopToggles({ furigana, furiganaOn, onFurigana, romaji, romajiOn, onRomaji }: Props) {
  const { t } = useT<JapaneseKey>();
  if (!furigana && !romaji) return <div aria-hidden className="shrink-0" />;
  return (
    <div role="group" aria-label={t('toggle.group')} className="flex shrink-0 items-center gap-1">
      {furigana && (
        <Pill on={furiganaOn} onClick={() => onFurigana(!furiganaOn)} label={t('toggle.furiganaLong')}>
          {t('toggle.furigana')}
        </Pill>
      )}
      {romaji && (
        <Pill on={romajiOn} onClick={() => onRomaji(!romajiOn)} label={t('toggle.romajiLong')}>
          {t('toggle.romaji')}
        </Pill>
      )}
    </div>
  );
}
