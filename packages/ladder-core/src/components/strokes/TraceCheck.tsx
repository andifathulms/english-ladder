'use client';

import { useMemo, useState } from 'react';
import { useCourse } from '@ladder/core/course/context';
import { useT } from '../ProgressProvider';
import { TracePad } from './TracePad';
import { useStrokes } from './useStrokes';
import { PracticeGrid, strokeStyle, strokeTransform } from './StrokePaths';

/** A trace item: the character to write, and whether its faint guide shows. */
type Props = { item: { char: string; guide?: 'on' | 'off' }; solved?: boolean; onDone: (misses: number) => void };

/**
 * The keyboard and screen-reader alternative to tracing (PRD §9, DESIGN §12): the strokes drawn so far,
 * and "which stroke comes next?" with stroke names. A wrong pick is a miss for that stroke.
 */
function StrokeQuiz({ char, onDone }: { char: string; onDone: (misses: number) => void }) {
  const { t } = useT();
  const strokes = useCourse().strokes!;
  const ALL = strokes.allNames;
  const { Name } = strokes;
  const data = useStrokes(char);
  const names = strokes.useNames(char, data);
  const [k, setK] = useState(0);
  const [misses, setMisses] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const n = names.length;
  // Four options: the right name and three others, in a fixed order per stroke.
  const options = useMemo(() => {
    if (!names[k]) return [];
    const others = ALL.filter((x) => x !== names[k]);
    const pick = [0, 1, 2].map((i) => others[(k * 3 + i * 2) % others.length]);
    const set = [names[k], ...pick.filter((x, i, a) => a.indexOf(x) === i)].slice(0, 4);
    return ALL.filter((x) => set.includes(x));
  }, [names, k, ALL]);
  if (!data) return null;
  const choose = (s: string) => {
    if (s === names[k]) {
      setWrong([]);
      if (k + 1 >= n) onDone(misses);
      setK(k + 1);
    } else if (!wrong.includes(s)) {
      setMisses((m) => m + 1);
      setWrong((w) => [...w, s]);
    }
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 1024 1024" className="h-[160px] w-[160px] rounded-md bg-surface" role="img" aria-label={t('trace.quizSoFar', { ch: char, n: k, total: n })}>
        <PracticeGrid />
        <g transform={strokeTransform(data)}>
          {data.strokes.map((d, i) => (
            <path key={i} d={d} style={strokeStyle(data, i < k ? 'var(--ink)' : 'var(--rule)')} />
          ))}
        </g>
      </svg>
      {k < n ? (
        <fieldset className="flex flex-col items-center gap-2">
          <legend className="mb-2 text-small text-muted">{t('trace.quizAsk', { n: k + 1, total: n })}</legend>
          <div className="flex flex-wrap justify-center gap-2">
            {options.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => choose(s)}
                disabled={wrong.includes(s)}
                className={`flex min-h-pill items-center gap-2 rounded-full border-2 px-4 ${wrong.includes(s) ? 'border-off-bg bg-off-bg text-off line-through' : 'border-rule bg-surface text-ink hover:border-accent'}`}
                data-stroke-option={s}
              >
                <Name name={s} place="quiz" />
              </button>
            ))}
          </div>
        </fieldset>
      ) : (
        <p className="text-small text-good">{t('trace.done')}</p>
      )}
    </div>
  );
}

/**
 * trace items (PRD §5.4): draw the character stroke by stroke over a faint guide; each stroke is
 * checked for direction, order and rough shape. Two misses or fewer counts as correct. A keyboard
 * alternative names the next stroke instead.
 */
export function TraceCheck({ item, solved, onDone }: Props) {
  const { t } = useT();
  const { Char } = useCourse().strokes!;
  const data = useStrokes(item.char);
  const [mode, setMode] = useState<'draw' | 'keys'>('draw');
  const [key, setKey] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  if (data === undefined) return <p className="text-small text-muted">{t('strokes.loading')}</p>;
  if (data === null) return <p className="text-small text-muted">{t('strokes.none')}</p>;

  const done = (misses: number) => {
    setResult(misses);
    onDone(misses);
  };

  return (
    <div className="flex flex-col items-center gap-3" data-trace>
      <p className="flex items-center gap-2 text-small text-muted">
        {t('trace.prompt')} <Char char={item.char} />
      </p>
      {mode === 'draw' ? (
        <TracePad key={key} data={data} guide={item.guide === 'on'} onDone={done} disabled={solved} />
      ) : (
        <StrokeQuiz key={key} char={item.char} onDone={done} />
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {result !== null && result > 2 && !solved && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setResult(null);
              setKey((k) => k + 1);
            }}
          >
            {t('trace.again')}
          </button>
        )}
        <button type="button" className="btn btn-quiet" onClick={() => setMode(mode === 'draw' ? 'keys' : 'draw')} aria-pressed={mode === 'keys'}>
          {mode === 'draw' ? t('trace.useKeys') : t('trace.useDraw')}
        </button>
      </div>
    </div>
  );
}
