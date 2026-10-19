'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useSettings, useT } from '@ladder/core/components/ProgressProvider';
import { useCanPlay, usePlay } from '@ladder/core/components/useSpeech';
import { IconPlay } from '@ladder/core/components/ui/Icon';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import { audioFor } from '@ladder/core/lib/speech/audio';
import { blip } from '@ladder/core/lib/speech/sfx';
import type { JapaneseKey } from '@/i18n/overrides';
import { pairKey } from '@/lib/ja/audio';
import { beatCount, blocks, type Block } from '@/lib/ja/beats';
import { toPlain } from '@/lib/ja/text';

type Word = { ja: string; kana: string; id: string; en?: string };
export type MoraBeatsState = { word: number };
type Props = VisualProps<MoraBeatsState> & { words: Word[]; compare?: boolean; initial?: number };

/** One beat at 1×, from the `beat` motion token (DESIGN §5). */
const BEAT_MS = 220;
const tick = () => blip(1320, 20, 0.04);

/**
 * MoraBeats (DESIGN §8.3): a word on a row of beat blocks (40×40, 34 under 480px; --beat): っ an empty hatched block,
 * a long vowel one block across two beats, ん its own. Play lights the blocks in time with the audio
 * (or alone, with a soft tick, when nothing can play). Compare shows two words in rows with their beat
 * counts; minimal pairs play from recordings only.
 */
export function MoraBeats({ state, interactive = true, onStateChange, lang, words, compare = false, initial = 0 }: Props) {
  const { t } = useT<JapaneseKey>();
  const [own, setOwn] = useState<MoraBeatsState>({ word: initial });
  const cur = state ?? own;
  const set = (w: number) => {
    setOwn({ word: w });
    onStateChange?.({ word: w });
  };
  const ids = words.map((_, i) => i);
  const roving = useRoving(ids, cur.word, set);
  const shown = compare ? words : [words[cur.word] ?? words[0]];

  return (
    <div className="flex flex-col gap-4" data-visual="mora-beats">
      <div className="beats flex flex-col gap-4">
        {shown.map((w) => (
          <BeatRow key={w.ja} word={w} pair={compare} lang={lang} t={t} />
        ))}
      </div>
      {interactive && !compare && words.length > 1 && (
        <div role="radiogroup" aria-label={t('beats.choose')} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
          {words.map((w, i) => (
            <button
              key={w.ja}
              type="button"
              {...roving.itemProps(i, i)}
              lang="ja"
              className={`ja min-h-touch rounded-full border-2 px-4 font-ja text-ja-body ${i === cur.word ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface text-ink'}`}
            >
              {toPlain(w.ja)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BeatRow({ word, pair, lang, t }: { word: Word; pair: boolean; lang: 'id' | 'en'; t: (k: JapaneseKey, v?: Record<string, string | number>) => string }) {
  const reduced = useReducedMotion();
  const { rate } = useSettings();
  const play = usePlay();
  const audio = pair ? pairKey(word.ja) : word.ja;
  const canPlay = useCanPlay(audio);
  const bs = blocks(word.kana);
  const n = beatCount(bs);
  const [lit, setLit] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    // A recording sets the beat (its length over the morae); otherwise 220ms at the speech rate.
    const rec = audioFor(audio);
    const beat = rec ? rec.dur / n : BEAT_MS / (rate || 1);
    if (canPlay) void play(audio);
    let at = 0;
    bs.forEach((b, i) => {
      timers.current.push(
        setTimeout(() => {
          setLit(i);
          if (!canPlay) tick();
        }, reduced ? 0 : at),
      );
      at += beat * b.beats;
    });
    timers.current.push(setTimeout(() => setLit(-1), reduced ? 600 : at + 150));
  };

  const meaning = lang === 'en' && word.en ? word.en : word.id;
  const label = t('beats.label', { word: toPlain(word.ja), n });
  return (
    <div className="flex items-start gap-3">
      <button type="button" onClick={run} aria-label={`${t('beats.play')}: ${toPlain(word.ja)}`} className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
        <IconPlay size={20} />
      </button>
      <div className="flex min-w-0 flex-col gap-1">
        {/* One line of blocks, so the rows of a pair line up beat for beat. */}
        <span className="flex flex-wrap items-center gap-2">
          <span role="img" aria-label={`${label} · ${meaning}`} className="flex shrink-0 flex-nowrap items-center gap-[4px]">
            {bs.map((b, i) => (
              <BeatBlock key={i} b={b} lit={i === lit} />
            ))}
          </span>
          <span aria-hidden className="label tnum text-muted">
            {n}
          </span>
        </span>
        <span lang={lang === 'en' && word.en ? 'en' : 'id'} className="text-small text-muted">
          {meaning}
        </span>
      </div>
    </div>
  );
}

function BeatBlock({ b, lit }: { b: Block; lit: boolean }) {
  const hatch = b.kind === 'small-tsu' ? { backgroundImage: 'repeating-linear-gradient(135deg, var(--rule) 0 2px, transparent 2px 7px)' } : undefined;
  return (
    <span
      aria-hidden
      lang="ja"
      data-beats={b.beats}
      data-kind={b.kind}
      className={`ja flex shrink-0 items-center justify-center overflow-hidden rounded-[6px] font-ja text-ja-body leading-none transition-colors duration-quick ${lit ? 'bg-accent-soft' : 'bg-beat'}`}
      style={{ height: 'var(--beat-w)', width: b.beats === 2 ? 'calc(var(--beat-w) * 2 + 4px)' : 'var(--beat-w)', ...hatch }}
    >
      {b.text}
    </span>
  );
}
