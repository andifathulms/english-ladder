'use client';

import { useRef } from 'react';

/** Arrow keys move between option buttons in a radio group (roving tabindex).
 *  The horizontal keys mirror for `dir: 'rtl'`; vertical keys are unchanged. */
export function useRoving<T>(
  options: readonly T[],
  value: T,
  onChange: (v: T) => void,
  dir: 'ltr' | 'rtl' = 'ltr',
) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = options.indexOf(value);
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    let j = -1;
    if (e.key === forward || e.key === 'ArrowDown') j = (i + 1) % options.length;
    else if (e.key === backward || e.key === 'ArrowUp') j = (i - 1 + options.length) % options.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = options.length - 1;
    if (j < 0) return;
    e.preventDefault();
    e.stopPropagation();
    onChange(options[j]);
    refs.current[j]?.focus();
  };
  const itemProps = (opt: T, i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      refs.current[i] = el;
    },
    role: 'radio' as const,
    'aria-checked': opt === value,
    tabIndex: opt === value ? 0 : -1,
    onClick: () => onChange(opt),
  });
  return { onKeyDown, itemProps };
}
