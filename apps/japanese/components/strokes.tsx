'use client';

// Japanese handwriting config for core StrokeOrder, TracePad and trace items (DESIGN §8.5): KanjiVG
// data, stroke names in the UI language with the Japanese ending term (とめ, はね, はらい) beside them.
import { useMemo } from 'react';
import type { StrokesConfig } from '@ladder/core/course/types';
import type { Point, StrokeData } from '@ladder/core/lib/strokes/trace';
import { useT } from '@ladder/core/components/ProgressProvider';
import { JA_STROKE_NAMES, JA_STROKE_ORDER, strokeNames, type JaStrokeName } from '@/lib/ja/strokeNames';
import { JaText } from './ja/JaText';

function useNames(_ch: string, data: StrokeData | null | undefined): string[] {
  return useMemo(() => (data ? strokeNames(data.types, data.medians as Point[][]) : []), [data]);
}

function StrokeNameView({ name, place }: { name: string; place: 'list' | 'quiz' }) {
  const { lang } = useT();
  const s = JA_STROKE_NAMES[name as JaStrokeName];
  if (place === 'list')
    return (
      <span className="text-small" lang={lang} title={s.ja}>
        {s[lang]}
      </span>
    );
  return (
    <>
      <span lang={lang}>{s[lang]}</span>
      <JaText face="ui" className="text-small text-muted">
        {s.ja}
      </JaText>
    </>
  );
}

const TraceChar = ({ char }: { char: string }) => <JaText className="text-ja-body text-ink">{char}</JaText>;

export const strokes: StrokesConfig = {
  useNames,
  allNames: JA_STROKE_ORDER,
  Name: StrokeNameView,
  announce: (name, lang) => {
    const s = JA_STROKE_NAMES[name as JaStrokeName];
    return `${s[lang]} (${s.ja})`;
  },
  Char: TraceChar,
};
