'use client';

import { stripMarkup } from '@ladder/core/lib/markup';
import { stressOf, syllabify } from '@/lib/es/syllables';

const WORD = /([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)/u;

/** A plain Spanish string with each word's stressed syllable lightly underlined (Tirukan, DESIGN §6). */
export function StressWords({ text }: { text: string }) {
  const parts = stripMarkup(text).split(WORD);
  return (
    <>
      {parts.map((p, i) => {
        if (i % 2 === 0) return p;
        const syl = syllabify(p);
        if (syl.length < 2) return p;
        const s = stressOf(p);
        return (
          <span key={i}>
            {syl.slice(0, s).join('')}
            <span className="es-stress">{syl[s]}</span>
            {syl.slice(s + 1).join('')}
          </span>
        );
      })}
    </>
  );
}
