'use client';

import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from '@ladder/core/components/ProgressProvider';

/**
 * FLIP for keyed chips moving between zones (DESIGN §5 shift / fly): measure before the change, then
 * slide each element from its old place. Instant with reduced motion. `dep` changes with the layout.
 */
export function useFlip(dep: unknown, duration = 'var(--m-object-d)') {
  const els = useRef(new Map<string, HTMLElement>());
  const before = useRef(new Map<string, DOMRect>());
  const reduced = useReducedMotion();
  const snapshot = () => {
    before.current.clear();
    els.current.forEach((el, k) => before.current.set(k, el.getBoundingClientRect()));
  };
  useLayoutEffect(() => {
    if (reduced) return;
    els.current.forEach((el, k) => {
      const a = before.current.get(k);
      if (!a) return;
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (!dx && !dy) return;
      el.style.transition = 'none';
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => {
        el.style.transition = `transform ${duration} var(--ease-object)`;
        el.style.transform = '';
      });
    });
    before.current.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
  const ref = (key: string) => (el: HTMLElement | null) => {
    if (el) els.current.set(key, el);
    else els.current.delete(key);
  };
  return { ref, snapshot };
}
