'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Rung } from '@/course/types';

export type FuriganaMode = Rung['furigana'];
export type RomajiMode = 'show' | 'new' | 'hide';

export type JaTextState = {
  /** The rung's furigana fade (PRD §4.5); "—" on Kana 1 (no kanji). */
  furigana: FuriganaMode;
  /** The lesson's Furigana toggle: show all furigana. */
  showFurigana: boolean;
  /** F is held: show all furigana while held (new and on-request). */
  revealHeld: boolean;
  /** Romaji under kana (Kana 1 only): all, only on the lesson's new kana, or none. */
  romaji: RomajiMode;
  /** Kana introduced in this lesson (romaji "new"). */
  kanaNew: ReadonlySet<string>;
  /** Kanji introduced in this lesson and the previous two (furigana "new"). */
  recentKanji: ReadonlySet<string>;
  /** Kanji at or below the learner's rung; any other kanji always shows its furigana. */
  rungKanji: ReadonlySet<string> | null;
};

const DEFAULT: JaTextState = {
  furigana: 'always',
  showFurigana: false,
  revealHeld: false,
  romaji: 'hide',
  kanaNew: new Set(),
  recentKanji: new Set(),
  rungKanji: null,
};

const Ctx = createContext<JaTextState>(DEFAULT);

export function useJaText(): JaTextState {
  return useContext(Ctx);
}

/** Whether a kanji's furigana shows under the current fade (DESIGN §4.3). */
export function furiganaVisible(s: JaTextState, kanji: string, heldWord = false): boolean {
  // Kanji above the learner's rung always carry furigana, whatever the fade.
  if (s.rungKanji && !s.rungKanji.has(kanji)) return true;
  switch (s.furigana) {
    case '—':
    case 'always':
      return true;
    case 'new':
      return s.showFurigana || s.revealHeld || heldWord || s.recentKanji.has(kanji);
    case 'on-request':
      return s.showFurigana || s.revealHeld || heldWord;
    case 'off':
      return false;
  }
}

type Props = {
  furigana?: FuriganaMode;
  showFurigana?: boolean;
  romaji?: RomajiMode;
  kanaNew?: string[];
  recentKanji?: string[];
  rungKanji?: string[];
  children: React.ReactNode;
};

/**
 * Lesson-scoped Japanese text settings (CLAUDE.md §7.2). Holding F shows all furigana while held when
 * the rung fades it. Nothing here is saved: it resets when the lesson closes.
 */
export function JaTextProvider({ furigana = 'always', showFurigana = false, romaji = 'hide', kanaNew, recentKanji, rungKanji, children }: Props) {
  const [fKey, setFKey] = useState(false);
  useEffect(() => {
    if (furigana !== 'new' && furigana !== 'on-request') return;
    const typing = () => {
      const el = document.activeElement as HTMLElement | null;
      return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    };
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'f' || e.key === 'F') && !e.altKey && !e.ctrlKey && !e.metaKey && !typing()) setFKey(true);
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') setFKey(false);
    };
    const blur = () => setFKey(false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    };
  }, [furigana]);
  const value = useMemo<JaTextState>(
    () => ({
      furigana,
      showFurigana,
      revealHeld: fKey,
      romaji,
      kanaNew: new Set(kanaNew ?? []),
      recentKanji: new Set(recentKanji ?? []),
      rungKanji: rungKanji ? new Set(rungKanji) : null,
    }),
    [furigana, showFurigana, fKey, romaji, kanaNew, recentKanji, rungKanji],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Overrides inside a provider: reading tests hide furigana (false), the deck shows it (true). */
export function JaTextOverride({ showFurigana, romaji, children }: { showFurigana?: boolean; romaji?: RomajiMode; children: React.ReactNode }) {
  const s = useJaText();
  const value: JaTextState = {
    ...s,
    ...(showFurigana === undefined ? {} : { furigana: showFurigana ? 'always' : 'off', rungKanji: showFurigana ? null : s.rungKanji }),
    ...(romaji === undefined ? {} : { romaji }),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
