'use client';

import { useId, useRef, useState } from 'react';
import { useT } from '@ladder/core/components/ProgressProvider';
import { romajiToKana } from '@/lib/ja/romaji';
import type { JapaneseKey } from '@/i18n/overrides';

type Props = {
  label: string;
  script: 'hiragana' | 'katakana';
  disabled?: boolean;
  tone?: 'idle' | 'good' | 'off';
  /** The kana so far (romaji still pending is converted as if typing ended). */
  onChange: (kana: string) => void;
  onSubmit?: () => void;
  initial?: string;
};

/** Kana that are hard to type in romaji: tap to add them. */
const HELPERS = ['っ', 'ー', 'ゃ', 'ゅ', 'ょ'];

/**
 * Type romaji, see kana (DESIGN §6.7): ki → き, kk → っk, n' or nn → ん, - → ー. The kana preview sits
 * large above the field; helper keys add っ ー ゃ ゅ ょ. Kana typed directly (a Japanese keyboard) pass
 * through unchanged.
 */
export function KanaInput({ label, script, disabled, tone = 'idle', onChange, onSubmit, initial = '' }: Props) {
  const { t } = useT<JapaneseKey>();
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [raw, setRaw] = useState(initial);
  const live = romajiToKana(raw, script);
  const done = romajiToKana(raw, script, true);
  const kana = done.kana + done.pending;
  const set = (v: string) => {
    setRaw(v);
    const d = romajiToKana(v, script, true);
    onChange(d.kana + d.pending);
  };
  const helper = (k: string) => {
    const c = script === 'katakana' && k !== 'ー' ? String.fromCodePoint(k.codePointAt(0)! + 0x60) : k;
    set(raw + c);
    input.current?.focus();
  };
  const border = tone === 'good' ? 'var(--good)' : tone === 'off' ? 'var(--off)' : 'var(--rule)';
  return (
    <div className="flex flex-col gap-3">
      <p aria-hidden lang="ja" className="ja min-h-[1.6em] font-ja text-ja-sentence font-semibold text-ink" data-kana-preview>
        {live.kana}
        <span className="text-muted">{live.pending}</span>
      </p>
      <label htmlFor={id} className="text-small text-muted">
        {label}
      </label>
      <input
        ref={input}
        id={id}
        type="text"
        inputMode="text"
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        value={raw}
        disabled={disabled}
        aria-describedby={`${id}-kana`}
        data-kana-input
        onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSubmit) {
            e.preventDefault();
            onSubmit();
          }
        }}
        className="min-h-touch rounded-md border-2 bg-surface px-4 text-body text-ink outline-none focus:border-accent"
        style={{ borderColor: border }}
      />
      <span id={`${id}-kana`} className="sr-only" lang="ja" aria-live="polite">
        {kana}
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('check.kanaHelpers')}>
        {HELPERS.map((k) => (
          <button key={k} type="button" disabled={disabled} onClick={() => helper(k)} lang="ja" className="ja min-h-touch min-w-touch rounded-sm border-2 border-rule bg-surface font-ja text-ja-body">
            {script === 'katakana' && k !== 'ー' ? String.fromCodePoint(k.codePointAt(0)! + 0x60) : k}
          </button>
        ))}
      </div>
    </div>
  );
}
