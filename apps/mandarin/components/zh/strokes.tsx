'use client';

// Mandarin's handwriting config for core StrokeOrder, TracePad and trace items: the eight basic
// strokes (DESIGN §8.5), named from authored data where lessons teach them, else by the heuristic.
import { useMemo } from 'react';
import type { StrokesConfig } from '@ladder/core/course/types';
import { useT } from '@ladder/core/components/ProgressProvider';
import { classifyStroke, STROKE_NAMES, type Point, type StrokeData, type StrokeName } from '@/lib/zh/trace';
import { useVisualData } from '@/visuals/data';
import { ZhText } from './ZhText';

/** Stroke names for a character: authored ones win, else the heuristic. */
export function useStrokeNames(ch: string, medians: Point[][] | undefined): StrokeName[] {
  const { strokeNames } = useVisualData();
  return useMemo(() => strokeNames[ch] ?? (medians ?? []).map((m) => classifyStroke(m)), [ch, medians, strokeNames]);
}

function StrokeNameView({ name, place }: { name: string; place: 'list' | 'quiz' }) {
  const { lang } = useT();
  const s = STROKE_NAMES[name as StrokeName];
  if (place === 'list')
    return (
      <span lang="zh-Hans" className="zh font-zh-ui text-small">
        {s.zh}
      </span>
    );
  return (
    <>
      <ZhText face="ui">{s.zh}</ZhText>
      <span lang="zh-Latn-pinyin">{s.py.normalize('NFD')}</span>
      <span className="text-small text-muted">{s[lang]}</span>
    </>
  );
}

/** Core passes the stroke file; Mandarin names strokes from its medians. */
const useNames = (ch: string, data: StrokeData | null | undefined) => useStrokeNames(ch, data?.medians);

const TraceChar = ({ char }: { char: string }) => <ZhText className="text-zh-body text-ink">{char}</ZhText>;

export const strokes: StrokesConfig = {
  useNames,
  allNames: ['heng', 'shu', 'pie', 'dian', 'na', 'ti', 'zhe', 'gou'],
  Name: StrokeNameView,
  announce: (name, lang) => {
    const s = STROKE_NAMES[name as StrokeName];
    return `${s.zh} ${s.py}, ${s[lang]}`;
  },
  Char: TraceChar,
};
