// German text rules for CourseConfig.text: how grading, search and lint compare and segment German.
// Case is kept: a noun's capital carries meaning. Option and tile answers compare exactly (after
// trailing punctuation); typed answers go through the course item types and their spelling notes.
import type { TextRules, Token } from '@ladder/core/course/types';
import { baseDe, PUNCT_END } from '@/lib/de/text';

/** Whitespace word tokeniser with character offsets (for speech-boundary highlighting). */
function tokenise(s: string): Token[] {
  const out: Token[] = [];
  for (const m of s.matchAll(/\S+/g)) out.push({ text: m[0], start: m.index!, end: m.index! + m[0].length });
  return out;
}

export const text: TextRules = {
  normalise: (s) => baseDe(s),
  // Ordered answers: exact words; only the sentence's first word may differ in case (Heute / heute).
  tokenEquals: (a, b, i) => (i === 0 ? baseDe(a).toLowerCase() === baseDe(b).toLowerCase() : baseDe(a) === baseDe(b)),
  trimPunct: PUNCT_END,
  tokenise,
};
