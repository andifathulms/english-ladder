'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { IconArrowLeft, IconArrowRight } from '@ladder/core/components/ui/Icon';
import { useT } from '@ladder/core/components/ProgressProvider';
import type { JapaneseKey } from '@/i18n/overrides';
import { JaSentence } from '@/components/ja/JaSentence';
import { JaInline } from '@/components/ja/JaInline';
import { toPlain } from '@/lib/ja/text';

export type TrainCar = { ja: string; particle: string; id: string };
/** The Indonesian sentence in its own (SVO) order: each word points at a car or at the verb. */
export type TrainWord = { text: string; ref: number | 'verb' };
export type ParticleTrainState = { order: number[] };
type Props = VisualProps<ParticleTrainState> & { cars: TrainCar[]; verb: { ja: string; id: string }; indonesian: TrainWord[]; initial?: number[] };

/** The Japanese sentence for an order of cars: each noun with its particle, the verb last. */
export function trainSentence(cars: TrainCar[], order: number[], verb: string): string {
  return [...order.map((i) => `${cars[i].ja} ${cars[i].particle}`), verb, '。'].join(' ');
}

/** Moves the car at position `at` one step (−1 left, +1 right), within the cars. */
export function moveCar(order: number[], at: number, step: -1 | 1): number[] {
  const to = at + step;
  if (to < 0 || to >= order.length) return order;
  const next = [...order];
  [next[at], next[to]] = [next[to], next[at]];
  return next;
}

/**
 * ParticleTrain (DESIGN §8.6): a sentence as a train. Noun cars in --card tones carry their particle
 * tag on the coupling (は を に で へ が); the verb is the locomotive in --board, always last. Drag a
 * car or use its arrows to reorder: the sentence above updates and still works, because the particles
 * carry the roles. The locomotive can't move. The Indonesia toggle shows the SVO sentence below,
 * linked word by word.
 */
export function ParticleTrain({ state, interactive = true, onStateChange, lang, cars, verb, indonesian, initial }: Props) {
  const { t } = useT<JapaneseKey>();
  const [own, setOwn] = useState<number[]>(initial ?? cars.map((_, i) => i));
  const order = state?.order ?? own;
  const set = (o: number[]) => {
    setOwn(o);
    onStateChange?.({ order: o });
  };
  const [compare, setCompare] = useState(false);
  const ja = trainSentence(cars, order, verb.ja);
  const idText = `${indonesian.map((w) => w.text).join(' ')}.`;
  const drag = useRef<{ at: number; x: number } | null>(null);

  const onPointerDown = (at: number) => (e: React.PointerEvent) => {
    if (!interactive) return;
    drag.current = { at, x: e.clientX };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const w = (e.currentTarget as HTMLElement).getBoundingClientRect().width;
    if (Math.abs(dx) > w / 2) {
      const step = dx > 0 ? 1 : -1;
      const next = moveCar(order, d.at, step);
      if (next !== order) {
        set(next);
        drag.current = { at: d.at + step, x: e.clientX };
      }
    }
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  // Lines from each Indonesian word up to its car or the locomotive.
  const box = useRef<HTMLDivElement>(null);
  const carEls = useRef<(HTMLElement | null)[]>([]);
  const locoEl = useRef<HTMLElement | null>(null);
  const idEls = useRef<(HTMLElement | null)[]>([]);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  useLayoutEffect(() => {
    if (!compare) return;
    const b = box.current?.getBoundingClientRect();
    if (!b) return;
    setLines(
      indonesian.flatMap((w, j) => {
        const top = w.ref === 'verb' ? locoEl.current : carEls.current[order.indexOf(w.ref)];
        const a = top?.getBoundingClientRect();
        const c = idEls.current[j]?.getBoundingClientRect();
        if (!a || !c) return [];
        return [{ x1: a.left + a.width / 2 - b.left, y1: a.bottom - b.top, x2: c.left + c.width / 2 - b.left, y2: c.top - b.top }];
      }),
    );
  }, [compare, order, indonesian]);

  return (
    <div className="flex flex-col gap-4" data-visual="particle-train">
      <JaSentence ja={ja} id={idText} />
      <div ref={box} className="relative flex flex-col gap-10">
        <ol className="flex flex-wrap items-end gap-x-1 gap-y-3 border-b-[3px] pb-1" style={{ borderColor: 'var(--wood-dark)' }} aria-label={t('train.label')}>
          {order.map((i, at) => (
            <li
              key={i}
              ref={(el) => {
                carEls.current[at] = el;
              }}
              className="flex touch-pan-y select-none items-end"
              onPointerDown={onPointerDown(at)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              data-car={i}
            >
              <span className="flex flex-col items-center gap-1 rounded-md px-3 py-2 [&_rt]:text-current" style={{ background: 'var(--card)', color: 'var(--board)' }}>
                <JaInline text={cars[i].ja} className="text-ja-body" />
                <span className="text-small" lang={lang}>
                  {cars[i].id}
                </span>
                {interactive && (
                  <span className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => set(moveCar(order, at, -1))}
                      disabled={at === 0}
                      aria-label={t('train.left', { car: toPlain(cars[i].ja) })}
                      className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-surface text-ink disabled:opacity-40"
                    >
                      <IconArrowLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => set(moveCar(order, at, 1))}
                      disabled={at === order.length - 1}
                      aria-label={t('train.right', { car: toPlain(cars[i].ja) })}
                      className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-surface text-ink disabled:opacity-40"
                    >
                      <IconArrowRight size={18} />
                    </button>
                  </span>
                )}
              </span>
              {/* The particle tag on the coupling */}
              <span lang="ja" className="ja mb-3 rounded-full bg-accent px-2 font-ja text-ja-body leading-tight text-accent-ink" data-particle>
                {cars[i].particle}
              </span>
            </li>
          ))}
          <li
            ref={(el) => {
              locoEl.current = el;
            }}
            className="flex flex-col items-center gap-1 rounded-md rounded-tr-xl bg-board px-4 py-3 text-board-ink"
            data-loco
          >
            <JaInline text={verb.ja} className="text-ja-body [&_rt]:text-current" />
            <span className="text-small text-board-muted" lang={lang}>
              {verb.id}
            </span>
          </li>
        </ol>
        {compare && (
          <>
            <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
              {lines.map((l, i) => (
                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} style={{ stroke: 'var(--rule)', strokeWidth: 1.5 }} />
              ))}
            </svg>
            <p className="flex flex-wrap gap-x-3 gap-y-2" lang="id" data-indonesian>
              {indonesian.map((w, j) => (
                <span
                  key={j}
                  ref={(el) => {
                    idEls.current[j] = el;
                  }}
                  className={`rounded-sm px-2 py-1 ${w.ref === 'verb' ? 'bg-board text-board-ink' : 'bg-paper-2 text-ink'}`}
                >
                  {w.text}
                </span>
              ))}
            </p>
          </>
        )}
      </div>
      <p className="text-small text-muted">{t('train.verbLast')}</p>
      {interactive && <Toggle label={t('train.compare')} checked={compare} onChange={setCompare} onLabel={t('settings.on')} offLabel={t('settings.off')} />}
      <p className="sr-only" aria-live="polite">
        {toPlain(ja).replace(/\s/g, '')}
      </p>
    </div>
  );
}
