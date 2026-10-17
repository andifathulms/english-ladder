// English text rules for CourseConfig.text: how grading, search and lint compare and
// segment the target language.
import type { TextRules, Token } from '@ladder/core/course/types';

/** Whitespace word tokeniser with character offsets (for speech-boundary highlighting). */
function tokenise(s: string): Token[] {
  const out: Token[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  return out;
}

export const text: TextRules = {
  normalise: (s) => s,
  // Ordered answers: the first word is case-sensitive, the rest case-insensitive.
  tokenEquals: (a, b, i) => (i === 0 ? a === b : a.toLowerCase() === b.toLowerCase()),
  trimPunct: /[.,!?;:]+$/u,
  tokenise,
};
