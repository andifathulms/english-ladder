'use client';

import { useState } from 'react';
import { useT } from '@ladder/core/components/ProgressProvider';
import { useCanPlay, usePlay } from '@ladder/core/components/useSpeech';
import { IconPlay } from '@ladder/core/components/ui/Icon';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { JapaneseKey } from '@/i18n/overrides';
import { pairKey } from '@/lib/ja/audio';
import { pitchPattern } from '@/lib/ja/kana';
import { toPlain } from '@/lib/ja/text';
import { JaInline } from '@/components/ja/JaInline';

export type PitchDrawing = 'bridge' | 'chopsticks' | 'rain' | 'candy';
export type PitchWord = { ja: string; kana: string; accent: number; id: string; en?: string; drawing?: PitchDrawing };
export type PitchLineState = { pair: number };
type Props = VisualProps<PitchLineState> & { pairs: [PitchWord, PitchWord][]; initial?: number };

const W = 40;
const HI = 14;
const LO = 46;

/**
 * PitchLine (DESIGN §8.4): a minimal pair side by side, each word's morae across with a line above in
 * --pitch, high morae on the upper rail and low on the lower, a small ⌝ after the accented mora, and
 * the following particle が in --muted so the drop onto it shows (はしが bridge vs はしが chopsticks).
 * Each word has a small line drawing and plays from its recording only (pairs never use speech).
 */
export function PitchLine({ state, interactive = true, onStateChange, lang, pairs, initial = 0 }: Props) {
  const { t } = useT<JapaneseKey>();
  const [own, setOwn] = useState<PitchLineState>({ pair: initial });
  const cur = state ?? own;
  const set = (p: number) => {
    setOwn({ pair: p });
    onStateChange?.({ pair: p });
  };
  const ids = pairs.map((_, i) => i);
  const roving = useRoving(ids, cur.pair, set);
  const pair = pairs[cur.pair] ?? pairs[0];
  if (!pair) return null;

  return (
    <div className="flex flex-col gap-4" data-visual="pitch-line">
      <div className="grid gap-3 rounded-lg bg-paper-2 p-4 min-[480px]:grid-cols-2">
        {pair.map((w) => (
          <PitchCard key={`${w.ja}-${w.accent}`} word={w} lang={lang} t={t} />
        ))}
      </div>
      <p className="text-small text-muted">{t('pitch.contrast')}</p>
      {interactive && pairs.length > 1 && (
        <div role="radiogroup" aria-label={t('pitch.choose')} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
          {pairs.map((p, i) => (
            <button
              key={p[0].kana}
              type="button"
              {...roving.itemProps(i, i)}
              lang="ja"
              className={`ja min-h-touch rounded-full border-2 px-4 font-ja text-ja-body ${i === cur.pair ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface text-ink'}`}
            >
              {p[0].kana}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** The spoken pattern for the text alternative: each mora high or low, then the particle. */
export function pitchSaid(word: Pick<PitchWord, 'kana' | 'accent'>, t: (k: JapaneseKey, v?: Record<string, string | number>) => string): string {
  const { morae, particleHigh } = pitchPattern(word.kana, word.accent);
  const parts = morae.map((m) => `${m.mora} ${m.high ? t('pitch.high') : t('pitch.low')}`);
  return [...parts, t('pitch.particle', { level: particleHigh ? t('pitch.high') : t('pitch.low') })].join(', ');
}

function PitchCard({ word, lang, t }: { word: PitchWord; lang: 'id' | 'en'; t: (k: JapaneseKey, v?: Record<string, string | number>) => string }) {
  const play = usePlay();
  const audio = pairKey(word.ja);
  const canPlay = useCanPlay(audio);
  const { morae, particleHigh } = pitchPattern(word.kana, word.accent);
  const pts = [...morae.map((m) => m.high), particleHigh];
  const width = pts.length * W;
  const y = (h: boolean) => (h ? HI : LO);
  const x = (i: number) => i * W + W / 2;
  // The drop mark sits after the accented mora (none for heiban, which never drops).
  const drop = word.accent > 0 ? word.accent - 1 : -1;
  const meaning = lang === 'en' && word.en ? word.en : word.id;
  const label = t('pitch.label', { word: toPlain(word.ja), meaning, pattern: pitchSaid(word, t) });

  return (
    <div className="flex flex-col items-start gap-2 rounded-md bg-surface p-3" data-accent={word.accent}>
      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-ja-body">
          <JaInline text={word.ja} />
        </span>
        {word.drawing && <Drawing kind={word.drawing} />}
      </div>
      <span role="img" aria-label={label} className="flex flex-col items-start">
        <svg width={width} height={LO + 8} viewBox={`0 0 ${width} ${LO + 8}`} aria-hidden focusable={false}>
          <line x1={0} x2={width} y1={HI} y2={HI} stroke="var(--rule)" strokeWidth={1} strokeDasharray="2 4" />
          <line x1={0} x2={width} y1={LO} y2={LO} stroke="var(--rule)" strokeWidth={1} strokeDasharray="2 4" />
          <polyline points={pts.map((h, i) => `${x(i)},${y(h)}`).join(' ')} fill="none" stroke="var(--pitch)" strokeWidth={2} strokeLinejoin="round" />
          {pts.map((h, i) => (
            <circle key={i} cx={x(i)} cy={y(h)} r={4.5} fill={i === pts.length - 1 ? 'var(--surface)' : 'var(--pitch)'} stroke={i === pts.length - 1 ? 'var(--muted)' : 'var(--pitch)'} strokeWidth={1.5} />
          ))}
          {drop >= 0 && (
            <path data-drop d={`M${x(drop) + 8} ${HI - 8} h8 v8`} fill="none" stroke="var(--pitch)" strokeWidth={1.5} strokeLinecap="round" />
          )}
        </svg>
        <span aria-hidden lang="ja" className="ja flex font-ja text-ja-body leading-none">
          {morae.map((m, i) => (
            <span key={i} className="inline-block text-center" style={{ width: W }}>
              {m.mora}
            </span>
          ))}
          <span className="inline-block text-center text-muted" style={{ width: W }}>
            が
          </span>
        </span>
      </span>
      <div className="flex items-center gap-2">
        {canPlay && (
          <button type="button" onClick={() => void play(audio)} aria-label={`${t('pitch.play')}: ${toPlain(word.ja)}`} className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
            <IconPlay size={20} />
          </button>
        )}
        <span lang={lang === 'en' && word.en ? 'en' : 'id'} className="text-small text-muted">
          {meaning}
        </span>
      </div>
    </div>
  );
}

/** Small line drawings in the illustration system (DESIGN §8): 1.5px edges, the subject in --subject. */
function Drawing({ kind }: { kind: PitchDrawing }) {
  const s = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const subj = { ...s, stroke: 'var(--subject)' };
  return (
    <svg width={56} height={40} viewBox="0 0 56 40" aria-hidden focusable={false} data-drawing={kind}>
      {kind === 'bridge' && (
        <>
          <path d="M4 26 Q28 6 52 26" {...subj} />
          <path d="M4 30 H52" {...s} />
          <path d="M12 21 V30 M20 16 V30 M28 14 V30 M36 16 V30 M44 21 V30" {...s} />
          <path d="M2 36 Q8 33 14 36 T26 36 T38 36 T50 36" {...s} stroke="var(--muted)" />
        </>
      )}
      {kind === 'chopsticks' && (
        <>
          <path d="M10 34 L46 6" {...subj} />
          <path d="M16 36 L50 12" {...subj} />
          <ellipse cx={28} cy={36} rx={22} ry={2} fill="var(--ink)" opacity={0.08} />
        </>
      )}
      {kind === 'rain' && (
        <>
          <path d="M14 18 Q14 8 24 9 Q28 2 36 6 Q46 5 44 15 Q50 18 44 20 H16 Q10 20 14 18 Z" {...s} />
          <path d="M18 26 l-3 6 M28 26 l-3 6 M38 26 l-3 6" {...subj} />
        </>
      )}
      {kind === 'candy' && (
        <>
          <circle cx={28} cy={20} r={8} {...subj} />
          <path d="M20 20 L10 13 V27 Z M36 20 L46 13 V27 Z" {...s} />
        </>
      )}
    </svg>
  );
}
