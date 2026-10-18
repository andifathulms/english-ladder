'use client';

import { Fragment } from 'react';
import { parseInline } from '@ladder/core/lib/markup';
import { hasJapanese, parseRuby } from '@/lib/ja/text';
import { Furigana } from './Furigana';
import { furiganaVisible, useJaText } from './JaContext';

/**
 * A short line that may mix Japanese (ruby markup, words separated by spaces) with Indonesian
 * (*italic*, **bold**): prompts, cues, options and tiles. Japanese words get furigana per the fade
 * (or per `furigana` when the item says so) and lang="ja"; a ___ is a blank (or the filled answer).
 */
export function JaInline({ text, furigana, fill, className = '' }: { text: string; furigana?: boolean; fill?: string; className?: string }) {
  const ctx = useJaText();
  const visible = (k: string) => furigana ?? furiganaVisible(ctx, k);
  const ja = (s: string, focus = false) => (
    <span lang="ja" className={`ja font-ja ja-line ${focus ? 'ja-focus' : ''}`}>
      {parseRuby(s).map((w, i) => (
        <Fragment key={i}>
          {i > 0 && !w.isPunct && <wbr />}
          <Furigana word={w} visible={visible} />
        </Fragment>
      ))}
    </span>
  );
  const blank = fill ? (
    ja(fill, true)
  ) : (
    <>
      <span aria-hidden className="mx-1 inline-block w-[3em] border-b-2 border-ink align-baseline">
        &nbsp;
      </span>
      <span className="sr-only">blank</span>
    </>
  );
  // Indonesian runs keep their *italic* / **bold** markup; Japanese runs are ruby'd words.
  const latin = (s: string, key: number) => (
    <Fragment key={key}>
      {parseInline(s).map((tok, j) =>
        tok.t === 'em' ? (
          <em key={j}>{tok.v}</em>
        ) : tok.t === 'strong' || tok.t === 'focus' ? (
          hasJapanese(tok.v) ? <Fragment key={j}>{ja(tok.v, true)}</Fragment> : <strong key={j} className="text-accent">{tok.v}</strong>
        ) : (
          <Fragment key={j}>{tok.v}</Fragment>
        ),
      )}
    </Fragment>
  );
  const part = (s: string, key: number) => {
    if (!hasJapanese(s)) return latin(s, key);
    // Split into runs of Japanese tokens and Latin tokens, keeping the spaces in Latin runs.
    const tokens = s.split(/(\s+)/);
    const out: React.ReactNode[] = [];
    let buf: string[] = [];
    let mode: 'ja' | 'latin' | null = null;
    const flush = () => {
      if (!buf.length) return;
      const text = buf.join('');
      out.push(mode === 'ja' ? <Fragment key={out.length}>{ja(text.trim())}</Fragment> : latin(text, out.length));
      buf = [];
    };
    for (const tk of tokens) {
      const m: 'ja' | 'latin' | null = /^\s+$/.test(tk) ? mode : hasJapanese(tk) || /^[{[]/.test(tk) ? 'ja' : 'latin';
      if (m !== mode && !/^\s+$/.test(tk)) {
        flush();
        mode = m;
      }
      buf.push(tk);
    }
    flush();
    return <Fragment key={key}>{out}</Fragment>;
  };
  const [a, b] = text.split('___');
  return (
    <span className={className}>
      {part(a, 0)}
      {b !== undefined && (
        <>
          {blank}
          {part(b, 1)}
        </>
      )}
    </span>
  );
}
