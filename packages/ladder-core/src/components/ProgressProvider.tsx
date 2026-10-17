'use client';

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';
import * as store from '@ladder/core/lib/progress/store';
import type { ProgressState, Settings } from '@ladder/core/lib/progress/types';
import { translate, type StringKey, type UiLang } from '@ladder/core/lib/i18n';
import { useCourse } from '@ladder/core/course/context';
import { registerServiceWorker } from '@ladder/core/lib/sw';
import { setSfxEnabled } from '@ladder/core/lib/speech/sfx';

const Ctx = createContext<ProgressState | null>(null);

function applySettings(s: Settings, themeColor: { light: string; dark: string } | null) {
  const d = document.documentElement;
  if (s.theme === 'system') d.removeAttribute('data-theme');
  else d.setAttribute('data-theme', s.theme);
  if (s.textSize === 100) d.removeAttribute('data-text-size');
  else d.setAttribute('data-text-size', String(s.textSize));
  if (s.motion === 'reduce') d.setAttribute('data-motion', 'reduce');
  else d.removeAttribute('data-motion');
  d.setAttribute('lang', s.uiLang);
  if (themeColor) {
    // theme-color follows the in-app theme, not the OS (fixes.themeColorFollowsTheme).
    const dark =
      s.theme === 'dark' || (s.theme === 'system' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? themeColor.dark : themeColor.light);
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getServerState);
  const course = useCourse();
  const themeColor = (course.fixes?.themeColorFollowsTheme && course.themeColor) || null;
  useEffect(() => applySettings(state.settings, themeColor), [state.settings, themeColor]);
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

export type T<K extends string = never> = (key: StringKey | K, vars?: Record<string, string | number>) => string;

/** UI strings in the learner's language. Courses pass their own key union: useT<'my.key'>(). */
export function useT<K extends string = never>(): { t: T<K>; lang: UiLang } {
  const lang = useSettings().uiLang;
  const { strings } = useCourse();
  const t = useCallback<T<K>>((key, vars) => translate(strings, lang, key, vars), [strings, lang]);
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
      const m = motionQuery();
      m?.addEventListener('change', cb);
      return () => m?.removeEventListener('change', cb);
    },
    () => motionQuery()?.matches ?? false,
    () => false,
  );
  return pref === 'reduce' || sys;
}

function motionQuery(): MediaQueryList | null {
  return typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
}
