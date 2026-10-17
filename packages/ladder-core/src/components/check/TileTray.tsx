'use client';

import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion, useT } from '../ProgressProvider';
import { useTextAttrs } from '../ui/TargetText';
import type { TileTrayProps } from '@ladder/core/course/types';

/** Word tiles that fly between the tray and the answer line (FLIP, --m-object). */
export function TileTray({ tiles, placed, onChange, locked, tone = 'idle', tileAttrs, tileClass, Label, AfterLine }: TileTrayProps) {
  const { t } = useT();
  const target = useTextAttrs();
  const reduced = useReducedMotion();
  const els = useRef(new Map<number, HTMLButtonElement>());
  const before = useRef(new Map<number, DOMRect>());

  const snapshot = () => {
    before.current.clear();
    els.current.forEach((el, i) => before.current.set(i, el.getBoundingClientRect()));
  };

  useLayoutEffect(() => {
    if (reduced || before.current.size === 0) return;
    els.current.forEach((el, i) => {
      const old = before.current.get(i);
      if (!old) return;
      const now = el.getBoundingClientRect();
      const dx = old.left - now.left;
      const dy = old.top - now.top;
      if (!dx && !dy) return;
      el.style.transition = 'none';
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => {
        el.style.transition = 'transform var(--m-object-d) var(--ease-object)';
        el.style.transform = '';
      });
    });
    before.current.clear();
  }, [placed, reduced]);

  const move = (i: number) => {
    if (locked) return;
    snapshot();
    onChange(placed.includes(i) ? placed.filter((x) => x !== i) : [...placed, i]);
  };

  const tile = (i: number, inLine: boolean) => {
    const attrs = tileAttrs ? tileAttrs(tiles[i]) : target;
    return (
    <button
      key={i}
      ref={(el) => {
        if (el) els.current.set(i, el);
        else els.current.delete(i);
      }}
      type="button"
      lang={attrs.lang}
      dir={attrs.dir}
      onClick={() => move(i)}
      disabled={locked}
      data-tile={tiles[i]}
      className={`min-h-pill min-w-touch rounded-sm border-2 px-4 font-body font-semibold ${tileClass ? tileClass(tiles[i]) : 'text-body'}`}
      style={{
        background: inLine && tone === 'good' ? 'var(--good-bg)' : 'var(--surface)',
        borderColor: inLine && tone === 'good' ? 'var(--good)' : inLine && tone === 'off' ? 'var(--off)' : 'var(--rule)',
        color: inLine && tone === 'good' ? 'var(--good)' : 'var(--ink)',
      }}
    >
      {Label ? <Label text={tiles[i]} /> : tiles[i]}
    </button>
    );
  };

  const tray = tiles.map((_, i) => i).filter((i) => !placed.includes(i));
  return (
    <div className="flex flex-col gap-4">
      <p className="text-small text-muted">{t('check.tapTiles')}</p>
      <div
        aria-label={t('check.answerLine')}
        role="group"
        className="flex min-h-[64px] flex-wrap items-center gap-2 border-b-2 border-rule pb-2"
      >
        {placed.map((i) => tile(i, true))}
      </div>
      {AfterLine && <AfterLine placed={placed.map((i) => tiles[i])} />}
      <div aria-label={t('check.tray')} role="group" className="flex min-h-[52px] flex-wrap gap-2">
        {tray.map((i) => tile(i, false))}
      </div>
    </div>
  );
}
