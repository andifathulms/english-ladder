// The verbal bracket (Satzklammer, CLAUDE.md §5.1): zones of a clause and which orders are valid.
// Pure. Tiles are the item's chunks ("um 6 Uhr" is one tile); zones come from the authored answer.

export type Zone = 'p1' | 'verb' | 'middle' | 'end';
export type ClauseType = 'main' | 'question' | 'sub';

const eqSeq = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

/**
 * Whether `given` is a valid order of the answer's tiles. Main clause: one constituent in position 1,
 * the finite verb second, the end zone (prefix, infinitive, participle) last in its authored order,
 * and the rest keeping their authored order (so any constituent may be fronted: "Heute stehe ich um 6
 * Uhr auf" for "Ich stehe heute um 6 Uhr auf"). Question (yes/no): the verb first. Subordinate: the
 * conjunction first, the finite verb last.
 */
export function validOrder(given: string[], answer: string[], zones: Zone[], clause: ClauseType = 'main'): boolean {
  if (given.length !== answer.length) return false;
  const verb = answer[zones.indexOf('verb')];
  const end = answer.filter((_, i) => zones[i] === 'end');
  const rest = answer.filter((_, i) => zones[i] === 'p1' || zones[i] === 'middle');
  const g = [...given];
  // The sentence's first word may differ in case (Heute / heute).
  const norm = (arr: string[]) => arr.map((x) => x.toLowerCase());
  if (clause === 'main') {
    if (g[1].toLowerCase() !== verb.toLowerCase()) return false;
    if (!eqSeq(g.slice(g.length - end.length), end)) return false;
    const front = g[0];
    const middle = g.slice(2, g.length - end.length);
    const i = norm(rest).indexOf(front.toLowerCase());
    if (i < 0) return false;
    const remaining = rest.filter((_, j) => j !== i);
    return eqSeq(norm(middle), norm(remaining));
  }
  if (clause === 'question') {
    if (g[0].toLowerCase() !== verb.toLowerCase()) return false;
    if (!eqSeq(g.slice(g.length - end.length), end)) return false;
    return eqSeq(norm(g.slice(1, g.length - end.length)), norm(rest));
  }
  // Subordinate: conjunction (p1) first, then the middle, then the end zone, the finite verb last.
  const conj = answer[zones.indexOf('p1')];
  if (g[0].toLowerCase() !== conj.toLowerCase()) return false;
  if (g[g.length - 1] !== verb) return false;
  const middleAnswer = answer.filter((_, i) => zones[i] === 'middle');
  return eqSeq(g.slice(1, g.length - 1), [...middleAnswer, ...end]);
}

/** The zones of a valid order, for showing the bracket in feedback (same positions as `given`). */
export function zonesOf(given: string[], answer: string[], zones: Zone[]): Zone[] {
  const verb = answer[zones.indexOf('verb')];
  const endCount = zones.filter((z) => z === 'end').length;
  return given.map((t, i) => (i === 0 ? 'p1' : i === 1 && t.toLowerCase() === verb.toLowerCase() ? 'verb' : i >= given.length - endCount ? 'end' : 'middle'));
}
