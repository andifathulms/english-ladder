// Spanish text rules for CourseConfig.text: how grading, search and lint compare and segment Spanish.
// Option and tile answers compare strictly (accents are part of the choice); typed answers go through
// the course item types, which apply the item's accent mode.
import type { TextRules, Token } from '@ladder/core/course/types';
import { normEs, PUNCT_END } from '@/lib/es/text';

/** Whitespace word tokeniser with character offsets (for speech-boundary highlighting). */
function tokenise(s: string): Token[] {
  const out: Token[] = [];
  for (const m of s.matchAll(/\S+/g)) out.push({ text: m[0], start: m.index!, end: m.index! + m[0].length });
  return out;
}

export const text: TextRules = {
  normalise: (s) => normEs(s),
  // Ordered answers: case and the opening ¿ ¡ never matter (PRD §5.4).
  tokenEquals: (a, b) => normEs(a) === normEs(b),
  trimPunct: PUNCT_END,
  tokenise,
};
