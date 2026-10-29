'use client';

import { stripMarkup } from '@ladder/core/lib/markup';
import { useLessonData } from '@ladder/core/components/lesson/LessonData';
import { stressSplit } from '@/lib/de/syllables';
import type { DeLessonData } from '@/course/lessonData';

const WORD = /([A-Za-zÄÖÜäöüß]+)/u;

/**
 * A plain German string with each word's stressed syllable lightly underlined (Tirukan, DESIGN §6):
 * the authored stress (data/stress.yaml, through the lesson data) first, else the rule.
 */
export function StressWords({ text }: { text: string }) {
  const exceptions = useLessonData<DeLessonData | undefined>()?.stress ?? {};
  const parts = stripMarkup(text).split(WORD);
  return (
    <>
      {parts.map((p, i) => {
        if (i % 2 === 0) return p;
        const { syllables, stress } = stressSplit(p, exceptions);
        if (syllables.length < 2) return p;
        return (
          <span key={i}>
            {syllables.slice(0, stress).join('')}
            <span className="de-stress">{syllables[stress]}</span>
            {syllables.slice(stress + 1).join('')}
          </span>
        );
      })}
    </>
  );
}
