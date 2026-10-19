'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion, useT } from '@ladder/core/components/ProgressProvider';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { JapaneseKey } from '@/i18n/overrides';
import type { KanaEntry } from '@/lib/ja/kanaTable';
import { useVisualData } from './data';

export type KanaOriginsState = { kana: string; script: 'hira' | 'kata' };
type Props = VisualProps<KanaOriginsState> & { initial?: Partial<KanaOriginsState>; kana?: string[] };

const SCRIPTS = ['hira', 'kata'] as const;

/**
 * KanaOrigins (DESIGN §8.2): a kana beside the kanji it came from (あ ← 安, ア ← 阿). The kanji, in
 * --muted, morphs (crossfade and scale, `morph`) into the kana in --ink; reduced motion shows both
 * at once. Chips choose the kana (the lesson's, in hiragana); a toggle switches the script.
 */
export function KanaOrigins({ state, interactive = true, onStateChange, initial, kana: only }: Props) {
  const { t } = useT<JapaneseKey>();
  const reduced = useReducedMotion();
  const { kana } = useVisualData();
  const entries: KanaEntry[] = (kana?.seion ?? []).filter((e) => !only || only.includes(e.hira) || only.includes(e.kata));
  const [own, setOwn] = useState<KanaOriginsState>({ kana: initial?.kana ?? entries[0]?.hira ?? 'あ', script: initial?.script ?? 'hira' });
  const cur = state ?? own;
  const set = (patch: Partial<KanaOriginsState>) => {
    const next = { ...cur, ...patch };
    setOwn(next);
    onStateChange?.(next);
  };
  // The morph replays whenever the kana or the script changes.
  const [run, setRun] = useState(0);
  useEffect(() => setRun((r) => r + 1), [cur.kana, cur.script]);
  const pick = useRoving(
    entries.map((e) => e.hira),
    cur.kana,
    (h) => set({ kana: h }),
  );
  const script = useRoving(SCRIPTS, cur.script, (s) => set({ script: s }));

  const e = entries.find((x) => x.hira === cur.kana) ?? entries[0];
  if (!e) return null;
  const k = cur.script === 'kata' ? e.kata : e.hira;
  const from = e.origin?.[cur.script];
  const said = from ? t('origins.label', { kana: k, kanji: from }) : t('origins.unknown', { kana: k });

  return (
    <div className="flex flex-col gap-4" data-visual="kana-origins">
      <div className="flex items-center justify-center gap-6 rounded-lg bg-paper-2 py-6" role="img" aria-label={said}>
        <span lang="ja" aria-hidden className="ja font-ja text-ja-glyph leading-none text-muted">
          {from ?? '?'}
        </span>
        <span aria-hidden className="text-h2 text-muted">
          →
        </span>
        <span aria-hidden className="relative inline-flex h-[1.2em] w-[1.2em] items-center justify-center text-ja-glyph leading-none">
          {from && !reduced && (
            <span key={`f${run}`} lang="ja" className="ja origin-from absolute inset-0 flex items-center justify-center font-ja text-muted">
              {from}
            </span>
          )}
          <span key={`k${run}`} lang="ja" className={`ja font-ja text-ink ${from && !reduced ? 'origin-to' : ''}`}>
            {k}
          </span>
        </span>
      </div>
      <p className="text-small text-muted">{cur.script === 'kata' ? t('origins.kataNote') : t('origins.hiraNote')}</p>
      {interactive && (
        <>
          <div role="radiogroup" aria-label={t('kana.script')} className="flex gap-1 self-start rounded-full bg-paper-2 p-1" onKeyDown={script.onKeyDown}>
            {SCRIPTS.map((s, i) => (
              <button key={s} type="button" {...script.itemProps(s, i)} lang="ja" className={`ja min-h-touch rounded-full px-4 font-ja-ui ${s === cur.script ? 'bg-accent text-accent-ink' : 'text-ink'}`}>
                {s === 'hira' ? 'ひらがな' : 'カタカナ'}
              </button>
            ))}
          </div>
          <div role="radiogroup" aria-label={t('origins.choose')} className="flex flex-wrap gap-2" onKeyDown={pick.onKeyDown}>
            {entries.map((x, i) => (
              <button
                key={x.hira}
                type="button"
                {...pick.itemProps(x.hira, i)}
                lang="ja"
                className={`ja flex h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 font-ja text-ja-body ${x.hira === cur.kana ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface text-ink'}`}
              >
                {cur.script === 'kata' ? x.kata : x.hira}
              </button>
            ))}
          </div>
        </>
      )}
      <p className="sr-only" aria-live="polite">
        {said}
      </p>
    </div>
  );
}
