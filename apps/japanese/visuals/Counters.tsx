'use client';

import { useState } from 'react';
import { ShelfDrawing, type ShelfObject } from '@ladder/core/components/visuals/shelf/ShelfDrawing';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { usePlay } from '@ladder/core/components/useSpeech';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { useT } from '@ladder/core/components/ProgressProvider';
import type { JapaneseKey } from '@/i18n/overrides';
import { soundChange, type Counter } from '@/lib/ja/counters';
import { useVisualData } from './data';

/** The six counters on the shelf (DESIGN §8.8), each with its object and the Indonesian noun. */
export const SHELF: { counter: string; object: ShelfObject; id: string; en: string }[] = [
  { counter: '本', object: 'pen', id: 'pena', en: 'pen' },
  { counter: '枚', object: 'paper', id: 'kertas', en: 'paper' },
  { counter: '匹', object: 'cat', id: 'kucing', en: 'cat' },
  { counter: '冊', object: 'book', id: 'buku', en: 'book' },
  { counter: '個', object: 'apple', id: 'apel', en: 'apple' },
  { counter: '人', object: 'person', id: 'orang', en: 'person' },
];

/**
 * The plain number readings, used only to find what a counter changes (the highlight). Every reading
 * shown comes from content/data/counters.yaml.
 */
const NUMBERS = ['いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう', 'じゅう'];

export type CountersState = { counter: string; n: number };
type Props = VisualProps<CountersState> & { initial?: Partial<CountersState> };

/** The numbers 1–10 whose reading with this counter differs from number + counter. */
export function changedNumbers(c: Counter): number[] {
  return c.readings.flatMap((r, i) => (soundChange(r, NUMBERS[i] + c.reading) ? [i + 1] : []));
}

/**
 * Counters (DESIGN §8.8): the shelf with pens (本), paper (枚), a cat (匹), a book (冊), an apple (個)
 * and a person (人). A stepper picks 1–10; the reading shows its sound change in --accent
 * (いっぽん, さんぼん), a note lists the numbers that change, and the Indonesian classifier is shown
 * where there is one (sebatang pena).
 */
export function Counters({ state, interactive = true, onStateChange, lang, initial }: Props) {
  const { t } = useT<JapaneseKey>();
  const play = usePlay();
  const { counters = [] } = useVisualData();
  const [own, setOwn] = useState<CountersState>({ counter: initial?.counter ?? '本', n: initial?.n ?? 1 });
  const cur = state ?? own;
  const set = (patch: Partial<CountersState>) => {
    const next = { ...cur, ...patch };
    setOwn(next);
    onStateChange?.(next);
  };
  const roving = useRoving(
    SHELF.map((s) => s.counter),
    cur.counter,
    (c) => set({ counter: c }),
  );
  const shelf = SHELF.find((s) => s.counter === cur.counter) ?? SHELF[0];
  const c = counters.find((x) => x.counter === shelf.counter);
  if (!c) return null;
  const reading = c.readings[cur.n - 1];
  const change = soundChange(reading, NUMBERS[cur.n - 1] + c.reading);
  const changed = changedNumbers(c);
  const word = `${cur.n}${shelf.counter}`;
  const noun = lang === 'en' ? shelf.en : shelf.id;
  const said = `${word}, ${reading}: ${cur.n} ${noun}`;

  return (
    <div className="flex flex-col gap-4" data-visual="counters">
      <ShelfDrawing objects={SHELF.map((s) => s.object)} lifted={shelf.object} label={said} />
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2" role="group" aria-label={t('counters.number')}>
          <button type="button" className="btn btn-ghost min-h-touch px-4" aria-label={t('counters.minus')} disabled={cur.n <= 1} onClick={() => set({ n: cur.n - 1 })}>
            −
          </button>
          <span className="label tnum w-[2ch] text-center text-ink" aria-live="polite">
            {cur.n}
          </span>
          <button type="button" className="btn btn-ghost min-h-touch px-4" aria-label={t('counters.plus')} disabled={cur.n >= 10} onClick={() => set({ n: cur.n + 1 })}>
            +
          </button>
        </div>
        <p className="flex items-baseline gap-3">
          <span lang="ja" className="ja font-ja text-ja-sentence">
            {word}
          </span>
          <span lang="ja" className="ja font-ja text-ja-body" data-reading>
            {change ? (
              <>
                {reading.slice(0, change.start)}
                <span className="text-accent" data-change>
                  {reading.slice(change.start, change.end)}
                </span>
                {reading.slice(change.end)}
              </>
            ) : (
              reading
            )}
          </span>
          <PlayButton text={reading} onPlay={() => void play(reading)} small />
        </p>
      </div>
      <p className="text-small text-muted">
        {changed.length ? t('counters.changed', { list: changed.join(', ') }) : t('counters.none')}
        {' · '}
        <span lang={lang}>{lang === 'en' ? c.objects.en : c.objects.id}</span>
      </p>
      {c.id_classifier && lang !== 'en' && (
        <p className="text-small">
          {t('counters.id')}{' '}
          <span lang="id" className="id-text">
            se{c.id_classifier} {shelf.id}
          </span>
        </p>
      )}
      <p className="sr-only" aria-live="polite">
        {said}
      </p>
      {interactive && (
        <div role="radiogroup" aria-label={t('counters.choose')} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
          {SHELF.map((s, i) => (
            <button
              key={s.counter}
              type="button"
              {...roving.itemProps(s.counter, i)}
              className={`flex min-h-touch items-center gap-2 rounded-full border-2 px-4 ${s.counter === cur.counter ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface text-ink'}`}
            >
              <span lang="ja" className="ja font-ja text-ja-body">
                {s.counter}
              </span>
              <span lang={lang} className="text-small">
                {lang === 'en' ? s.en : s.id}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
