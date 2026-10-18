'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import type { Bilingual } from '@/course/types';
import { kanjiOf, parseRuby, toPlain, type Word } from '@/lib/ja/text';
import { kanaToRomaji } from '@/lib/ja/romaji';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { Prose } from '@ladder/core/components/lesson/Prose';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useT } from '@ladder/core/components/ProgressProvider';
import type { JapaneseKey } from '@/i18n/overrides';
import { Furigana } from './Furigana';
import { furiganaVisible, useJaText } from './JaContext';

export type JaSize = 'sentence' | 'body' | 'small' | 'glyph';

type Props = {
  /** Authored Japanese with ruby markup, words separated by spaces (CLAUDE.md §5.2). */
  ja: string;
  id?: string;
  en?: string;
  size?: JaSize;
  play?: boolean;
  /** Note revealed by tapping the focus word. */
  note?: Bilingual | true;
  /** The "terdengar aneh" side of a pair: raspberry with strikethrough, no audio. */
  off?: boolean;
  /** Override the fade: reading items pass false, the deck passes true. */
  showFurigana?: boolean;
  className?: string;
};

const SIZE: Record<JaSize, string> = {
  sentence: 'text-ja-sentence font-semibold',
  body: 'text-ja-body',
  small: 'text-ja-small',
  glyph: 'text-ja-glyph font-semibold',
};

const HOLD_MS = 350;

/** Character offsets of each word in the spoken kana (spaces removed), for speech boundaries. */
function kanaOffsets(words: Word[]): { start: number; end: number }[] {
  let pos = 0;
  return words.map((w) => {
    const start = pos;
    pos += w.kana.length;
    return { start, end: pos };
  });
}

/**
 * The Japanese sentence block (DESIGN §6.4): Klee One with furigana per kanji (per the fade), romaji
 * under each word in Kana 1, the translation below, and a play button. Words break only between
 * words; the focus is an underline, never bold. Screen readers get the text, then its reading in
 * brackets, so furigana is never read interleaved (DESIGN §12).
 */
export function JaSentence({ ja, id, en, size = 'sentence', play = true, note, off, showFurigana, className = '' }: Props) {
  const { t, lang } = useT<JapaneseKey>();
  const ctx = useJaText();
  const playText = usePlay();
  const words = useMemo(() => parseRuby(ja), [ja]);
  const plain = useMemo(() => toPlain(ja), [ja]);
  const reading = useMemo(() => words.map((w) => w.kana).join(''), [words]);
  const [spokenIdx, setSpokenIdx] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [held, setHeld] = useState<number | null>(null);
  const [showNote, setShowNote] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const translation = lang === 'en' ? (en ?? id) : id;
  const noteText = note === true ? t('lesson.focusNote') : note ? (lang === 'en' ? note.en : note.id) : null;
  const offs = kanaOffsets(words);

  const onPlay = async () => {
    setPlaying(true);
    // Recordings count words (punctuation aside); speech reports character offsets in the reading.
    const wordIdx = words.map((w, i) => (w.isPunct ? -1 : i)).filter((i) => i >= 0);
    await playText(ja, {
      onWord: (k) => setSpokenIdx(wordIdx[k] ?? null),
      onChar: (charIndex) => {
        const k = offs.findIndex((o) => charIndex >= o.start && charIndex < o.end);
        if (k >= 0) setSpokenIdx(k);
      },
    });
    setPlaying(false);
    setSpokenIdx(null);
  };

  const canHold = ctx.furigana === 'new' || ctx.furigana === 'on-request';
  const visible = (i: number) => (kanji: string) => showFurigana ?? furiganaVisible(ctx, kanji, held === i);
  const romajiFor = (w: Word) => {
    if (w.isPunct || ctx.romaji === 'hide' || off) return null;
    if (ctx.romaji === 'new' && ![...w.kana].some((c) => ctx.kanaNew.has(c))) return null;
    return kanaToRomaji(w.kana);
  };
  const anyRomaji = ctx.romaji !== 'hide' && !off;
  const hasKanji = kanjiOf(plain).length > 0;

  const line = (
    <p
      lang="ja"
      className={`ja-line ja font-ja ${SIZE[size]} ${off ? 'off-text' : 'text-ink'} ${size === 'glyph' ? 'text-center' : ''} min-w-0`}
    >
      {words.map((w, i) => {
        const focus = w.segs.some((s) => s.focus) && !off;
        const cls = [focus ? 'ja-focus' : '', spokenIdx === i ? 'ja-speaking' : ''].filter(Boolean).join(' ');
        const holdProps = canHold
          ? {
              onPointerDown: () => {
                if (timer.current) clearTimeout(timer.current);
                timer.current = setTimeout(() => setHeld(i), HOLD_MS);
              },
              onPointerUp: () => {
                if (timer.current) clearTimeout(timer.current);
                setHeld(null);
              },
              onPointerLeave: () => {
                if (timer.current) clearTimeout(timer.current);
                setHeld(null);
              },
              onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
            }
          : {};
        const romaji = romajiFor(w);
        const text = <Furigana word={w} visible={visible(i)} />;
        const body = anyRomaji && !w.isPunct ? (
          <span className="inline-flex flex-col items-center align-top">
            <span>{text}</span>
            <span lang="ja-Latn" className={`romaji leading-tight ${romaji ? '' : 'invisible'}`} aria-hidden={romaji ? undefined : true}>
              {romaji ?? '·'}
            </span>
          </span>
        ) : (
          text
        );
        const sep = i > 0 && !w.isPunct ? <wbr /> : null;
        if (focus && noteText) {
          return (
            <Fragment key={i}>
              {sep}
              <button type="button" onClick={() => setShowNote((v) => !v)} aria-expanded={showNote} aria-label={w.plain} className={`ja-word ${cls}`} {...holdProps}>
                {body}
              </button>
            </Fragment>
          );
        }
        return (
          <Fragment key={i}>
            {sep}
            <span className={`ja-word ${cls}`} {...holdProps}>
              {body}
            </span>
          </Fragment>
        );
      })}
      {hasKanji && (
        <span className="sr-only" lang="ja">
          {' '}({reading})
        </span>
      )}
    </p>
  );

  return (
    <div className={`flex flex-col ${className}`} data-ja-sentence>
      <div className={`flex items-start gap-2 ${size === 'glyph' ? 'justify-center' : ''}`}>
        <div className={size === 'glyph' ? 'practice-grid rounded-md bg-paper-2 px-6' : 'min-w-0 flex-1'}>{line}</div>
        {play && !off && size !== 'glyph' && (
          <span className={size === 'sentence' ? 'mt-5' : 'mt-3'}>
            <PlayButton text={ja} onPlay={onPlay} playing={playing} small={size !== 'sentence'} />
          </span>
        )}
      </div>
      {translation && (
        <p lang={lang === 'en' && en ? 'en' : 'id'} className="id-text">
          {translation}
        </p>
      )}
      {showNote && noteText && (
        <div className="fade-in mt-2 self-start rounded-sm bg-accent-soft px-3 py-1 text-small text-ink" role="note">
          <Prose text={noteText} lang={lang} />
        </div>
      )}
    </div>
  );
}
