'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { StrokeOrder } from '@ladder/core/components/strokes/StrokeOrder';
import { useReducedMotion, useT } from '@ladder/core/components/ProgressProvider';
import { usePlay } from '@ladder/core/components/useSpeech';
import { IconClose } from '@ladder/core/components/ui/Icon';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { useRoving } from '@ladder/core/components/visuals/useRoving';
import type { JapaneseKey } from '@/i18n/overrides';
import { kanaKey } from '@/lib/ja/audio';
import { DAKUON_ROWS, SEION_ROWS, grid, kanaNote, yoon, type KanaEntry } from '@/lib/ja/kanaTable';
import { kanaToRomaji } from '@/lib/ja/romaji';
import { useJaText } from '@/components/ja/JaContext';
import { useVisualData } from './data';

export type KanaChartState = { script: 'hira' | 'kata'; dakuten: boolean; combos: boolean };
type Props = VisualProps<KanaChartState> & { initial?: Partial<KanaChartState>; highlight?: string[] };

const SCRIPTS = ['hira', 'kata'] as const;

/**
 * KanaChart (DESIGN §8.1): the gojūon grid, vowels across and consonant rows down, 56px cells with
 * the kana in Klee One and romaji beneath (Kana 1's fade decides when). Irregular readings carry a
 * corner mark. Tapping a cell plays it and opens its stroke order with the note in a sheet. Toggles:
 * script, dakuten rows, and the small-kana combinations grid.
 */
export function KanaChart({ state, interactive = true, onStateChange, lang, initial, highlight = [] }: Props) {
  const { t } = useT<JapaneseKey>();
  const { kana } = useVisualData();
  const ja = useJaText();
  const play = usePlay();
  const [own, setOwn] = useState<KanaChartState>({ script: 'hira', dakuten: false, combos: false, ...initial });
  const cur = state ?? own;
  const set = (patch: Partial<KanaChartState>) => {
    const next = { ...cur, ...patch };
    setOwn(next);
    onStateChange?.(next);
  };
  const [open, setOpen] = useState<KanaEntry | null>(null);
  const [said, setSaid] = useState('');
  const roving = useRoving(SCRIPTS, cur.script, (s) => set({ script: s }));
  const marks = useMemo(() => new Set(highlight), [highlight]);

  if (!kana) return null;
  const k = (e: KanaEntry) => (cur.script === 'kata' ? e.kata : e.hira);
  const romajiShown = (e: KanaEntry) => ja.romaji === 'show' || (ja.romaji === 'new' && (ja.kanaNew.has(e.hira) || ja.kanaNew.has(e.kata)));
  const rows = [...grid(kana.seion, SEION_ROWS), ...(cur.dakuten ? grid(kana.dakuon, DAKUON_ROWS) : [])];
  const combos = yoon(kana);

  const choose = (e: KanaEntry) => {
    void play(kanaKey(e.hira));
    const note = kanaNote(e);
    setSaid(note ? t(note.key, { ...note.vars, kana: k(e) }) : k(e));
    if (interactive) setOpen(e);
  };

  return (
    <div className="flex flex-col gap-4" data-visual="kana-chart">
      {interactive && (
        <div className="flex flex-wrap items-center gap-2">
          <div role="radiogroup" aria-label={t('kana.script')} className="flex gap-1 rounded-full bg-paper-2 p-1" onKeyDown={roving.onKeyDown}>
            {SCRIPTS.map((s, i) => (
              <button
                key={s}
                type="button"
                {...roving.itemProps(s, i)}
                lang="ja"
                className={`ja min-h-touch rounded-full px-4 font-ja-ui ${s === cur.script ? 'bg-accent text-accent-ink' : 'text-ink'}`}
              >
                {s === 'hira' ? 'ひらがな' : 'カタカナ'}
              </button>
            ))}
          </div>
          <button type="button" aria-pressed={cur.dakuten} onClick={() => set({ dakuten: !cur.dakuten })} className={`min-h-touch rounded-full border-2 px-4 ${cur.dakuten ? 'border-accent bg-accent-soft text-ink' : 'border-rule bg-surface text-ink'}`}>
            <span lang="ja" aria-hidden className="ja font-ja-ui">
              ゛゜{' '}
            </span>
            {t('kana.dakuten')}
          </button>
          <button type="button" aria-pressed={cur.combos} onClick={() => set({ combos: !cur.combos })} className={`min-h-touch rounded-full border-2 px-4 ${cur.combos ? 'border-accent bg-accent-soft text-ink' : 'border-rule bg-surface text-ink'}`}>
            <span lang="ja" aria-hidden className="ja font-ja-ui">
              ゃゅょ{' '}
            </span>
            {t('kana.combos')}
          </button>
        </div>
      )}
      <ChartGrid label={t('kana.chart')} rows={rows} cols={5} k={k} romajiShown={romajiShown} marks={marks} onChoose={choose} t={t} />
      {cur.combos && (
        <>
          <p className="text-small text-muted">{t('kana.combosTitle')}</p>
          <ChartGrid label={t('kana.combos')} rows={chunk(combos, 3)} cols={3} k={k} romajiShown={romajiShown} marks={marks} onChoose={choose} t={t} />
        </>
      )}
      <p className="sr-only" aria-live="polite">
        {said}
      </p>
      {open && <KanaSheet entry={open} k={k(open)} onClose={() => setOpen(null)} lang={lang} />}
    </div>
  );
}

const chunk = <T,>(a: T[], n: number): T[][] => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

type GridProps = {
  label: string;
  rows: (KanaEntry | null)[][];
  cols: number;
  k: (e: KanaEntry) => string;
  romajiShown: (e: KanaEntry) => boolean;
  marks: Set<string>;
  onChoose: (e: KanaEntry) => void;
  t: (key: JapaneseKey, vars?: Record<string, string | number>) => string;
};

/** One grid of cells; arrow keys move between cells (a single tab stop), Enter or Space opens one. */
function ChartGrid({ label, rows, cols, k, romajiShown, marks, onChoose, t }: GridProps) {
  const cells = rows.flatMap((r, y) => r.map((e, x) => ({ e, x, y }))).filter((c): c is { e: KanaEntry; x: number; y: number } => !!c.e);
  const [focus, setFocus] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (dx: number, dy: number) => {
    const c = cells[focus];
    let best = focus;
    if (dy === 0) best = Math.max(0, Math.min(cells.length - 1, focus + dx));
    else {
      // The nearest cell in the next row in that direction.
      const ys = [...new Set(cells.map((x) => x.y))].sort((a, b) => a - b);
      const ny = ys[ys.indexOf(c.y) + dy];
      if (ny !== undefined) {
        const row = cells.map((x, i) => ({ ...x, i })).filter((x) => x.y === ny);
        best = row.reduce((a, b) => (Math.abs(b.x - c.x) < Math.abs(a.x - c.x) ? b : a)).i;
      }
    }
    setFocus(best);
    refs.current[best]?.focus();
  };
  const onKeyDown = (ev: React.KeyboardEvent) => {
    const d = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[ev.key];
    if (!d) return;
    ev.preventDefault();
    move(d[0], d[1]);
  };
  return (
    <div role="group" aria-label={label} className="overflow-x-auto" onKeyDown={onKeyDown}>
      <div className="grid w-max gap-[6px]" style={{ gridTemplateColumns: `repeat(${cols}, 56px)` }}>
        {rows.flatMap((r, y) =>
          (r.length === 1 && cols === 5 ? [r[0], null, null, null, null] : r).map((e, x) => {
            if (!e) return <span key={`${y}-${x}`} aria-hidden />;
            const i = cells.findIndex((c) => c.e === e);
            const kana = k(e);
            const romaji = kanaToRomaji(kana, { particles: false });
            const shown = romajiShown(e);
            return (
              <button
                key={e.hira}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                tabIndex={i === focus ? 0 : -1}
                onFocus={() => setFocus(i)}
                onClick={() => onChoose(e)}
                aria-label={shown ? t('kana.cell', { kana, romaji }) : kana}
                data-kana={e.hira}
                className={`relative flex h-[56px] w-[56px] flex-col items-center justify-center rounded-md bg-surface ${marks.has(e.hira) || marks.has(e.kata) ? 'ring-2 ring-accent' : ''}`}
              >
                <span lang="ja" aria-hidden className="ja font-ja text-[1.75rem] leading-none">
                  {kana}
                </span>
                {shown && (
                  <span lang="ja-Latn" aria-hidden className="romaji leading-none">
                    {romaji}
                  </span>
                )}
                {e.note && (
                  <span aria-hidden title={t('kana.irregularMark')} className="absolute end-[3px] top-[3px] h-0 w-0 border-s-[8px] border-t-[8px] border-s-transparent border-t-accent" />
                )}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}

/** The cell sheet: the kana large with its stroke order, and its note. Esc and the close button dismiss it. */
function KanaSheet({ entry, k, onClose, lang }: { entry: KanaEntry; k: string; onClose: () => void; lang: 'id' | 'en' }) {
  const { t } = useT<JapaneseKey>();
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLElement | null>(null);
  const note = kanaNote(entry);
  useEffect(() => {
    back.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      back.current?.focus?.();
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-[rgb(var(--shadow-rgb)/0.35)]" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('kana.sheetTitle', { kana: k })}
        className={`${reduced ? '' : 'sheet-up'} page flex max-w-lesson flex-col items-center gap-3 rounded-t-xl bg-surface pb-6 pt-4 shadow-e2`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-end">
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t('kana.close')} className="flex h-[44px] w-[44px] items-center justify-center rounded-full text-ink hover:bg-paper-2">
            <IconClose />
          </button>
        </div>
        <StrokeOrder char={k} size={200} autoplay lang={lang} />
        {note && <p className="text-body">{t(note.key, { ...note.vars, kana: k })}</p>}
      </div>
    </div>
  );
}
