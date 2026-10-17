// Pure English content-lint rule data. No filesystem imports, so it is safe to pull into
// a course config that the client bundle references. The runner lives in lint.ts.
// TODO(ladder-core): in the hooks step these move into apps/english/course and the runner
// takes them from CourseConfig.lint.

/** Matches target-language words (English: letters with an optional apostrophe group). */
export const WORD_REGEX = /[A-Za-z]+(?:'[A-Za-z]+)?/g;

/**
 * Patterns that reveal a structure from the grammar inventory. A lesson may only use structures
 * from earlier rungs plus its own rung's inventory up to and including the lesson (CLAUDE.md §6.1).
 */
export const INVENTORY_DETECTORS: Record<string, RegExp> = {
  'subject-pronouns': /\b(he|she|it|they)\b|\b(he|she|it)'s\b|\bthey're\b/i,
  'articles-a-an': /\b(a|an)\b/,
  demonstratives: /\b(this|that|these|those)\b|\bthat's\b/i,
  'have-present': /\b(have|has)\b/i,
  'possessive-adj': /\b(my|your|his|her|its|our|their)\b/i,
  'possessive-s': /\b(?!(?:it|he|she|that|what|who|where|there|here|let)'s\b)[A-Za-z]+'s\b/i,
  'prep-place-basic': /\b(in|on|under|behind|next to|in front of)\b/i,
  'be-questions-negatives': /\b(isn't|aren't|not)\b|^(am|is|are)\b[^.]*\?/im,
};

/** Untaught grammar per rung (structure lint). */
export const STRUCTURE_RULES: Record<string, { name: string; re: RegExp }[]> = {
  // Starter teaches fixed chunks (Can you…? How do you…?), so only tense is checked.
  starter: [
    { name: 'past -ed form', re: /\b(?!(?:red|bed|need|tired|bored|married|hundred|speed|seed|shed)\b)[a-z]{2,}ed\b/i },
    { name: 'will', re: /\b(will|won't|'ll)\b/i },
    { name: 'going to', re: /\bgoing to\b/i },
    { name: 'past of be', re: /\b(was|were|wasn't|weren't)\b/i },
  ],
  'easy-1': [
    { name: 'past -ed form', re: /\b(?!(?:red|bed|need|tired|bored|married|hundred|speed|seed|shed)\b)[a-z]{2,}ed\b/i },
    { name: 'will', re: /\b(will|won't|'ll)\b/i },
    { name: 'going to', re: /\bgoing to\b/i },
    { name: 'have been', re: /\b(have|has) been\b/i },
    {
      name: '-ing after be',
      re: /\b(am|is|are|was|were|'m|'re|'s|isn't|aren't)\s+(?!(?:morning|evening|nothing|something|thing|king|ring|spring|building|ceiling|wedding)\b)[a-z]+ing\b/i,
    },
    { name: 'modal verb', re: /\b(can|can't|cannot|could|would|should|must|may|might|shall)\b/i },
    { name: 'do-support', re: /\b(do|does|did|don't|doesn't|didn't)\b/i },
    { name: 'past of be', re: /\b(was|were|wasn't|weren't)\b/i },
  ],
};

export function words(text: string): string[] {
  return (text.match(WORD_REGEX) ?? []).map((w) => w.toLowerCase());
}

export function knownWord(w: string, lex: Set<string>): boolean {
  if (lex.has(w)) return true;
  if (w.endsWith("'s") && lex.has(w.slice(0, -2))) return true;
  if (w.endsWith('s') && lex.has(w.slice(0, -1))) return true;
  if (w.endsWith('es') && lex.has(w.slice(0, -2))) return true;
  if (w.endsWith('ies') && lex.has(`${w.slice(0, -3)}y`)) return true;
  return false;
}
