'use client';

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';
import * as store from '@/lib/progress/store';
import type { ProgressState, Settings } from '@/lib/progress/types';
import { translate, type StringKey, type UiLang } from '@/lib/i18n';
import { registerServiceWorker } from '@/lib/sw';
import { setSfxEnabled } from '@/lib/speech/sfx';

const Ctx = createContext<ProgressState | null>(null);

function applySettings(s: Settings) {
  const d = document.documentElement;
  if (s.theme === 'system') d.removeAttribute('data-theme');
  else d.setAttribute('data-theme', s.theme);
  if (s.textSize === 100) d.removeAttribute('data-text-size');
  else d.setAttribute('data-text-size', String(s.textSize));
  if (s.motion === 'reduce') d.setAttribute('data-motion', 'reduce');
  else d.removeAttribute('data-motion');
  d.setAttribute('lang', s.uiLang);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getServerState);
  useEffect(() => applySettings(state.settings), [state.settings]);
  useEffect(() => setSfxEnabled(state.settings.sfx), [state.settings.sfx]);
  useEffect(() => registerServiceWorker(), []);
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export function useProgress(): ProgressState {
  const s = useContext(Ctx);
  if (!s) throw new Error('useProgress outside ProgressProvider');
  return s;
}

export function useSettings(): Settings {
  return useProgress().settings;
}

export type T = (key: StringKey, vars?: Record<string, string | number>) => string;

export function useT(): { t: T; lang: UiLang } {
  const lang = useSettings().uiLang;
  const t = useCallback<T>((key, vars) => translate(lang, key, vars), [lang]);
  return { t, lang };
}

/** True once the client has read stored progress (false during static HTML and hydration). */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
const noopSubscribe = () => () => {};

export function useReducedMotion(): boolean {
  const pref = useSettings().motion;
  const sys = useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
  return pref === 'reduce' || sys;
}
