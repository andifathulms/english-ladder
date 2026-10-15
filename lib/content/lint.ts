import type { CheckItem, Lesson, Rung } from '../types';
import { stripMarkup } from '../markup';
import { getLexicon, getNouns, getTestPool } from './load';

export type Finding = { level: 'error' | 'warn'; message: string };

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
const STRUCTURE_RULES: Record<string, { name: string; re: RegExp }[]> = {
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

function itemTexts(item: CheckItem): string[] {
  switch (item.type) {
    case 'choice':
    case 'gap':
      return [item.prompt.replace('___', item.answer), ...item.options];
    case 'order':
      return [item.answer.join(' '), item.prompt ?? ''];
    case 'scene':
      return [...item.options, item.prompt ?? ''];
    case 'fix':
      return [item.wrong, ...item.options];
    case 'listen':
      return [item.audio, ...item.options, item.prompt ?? ''];
  }
}

/** Every English string a learner sees in a lesson, except explanations. */
export function englishTexts(l: Lesson): { where: string; text: string }[] {
  const out: { where: string; text: string }[] = [];
  l.examples.forEach((e, i) => out.push({ where: `examples[${i}]`, text: e.en }));
  l.worked?.forEach((e, i) => out.push({ where: `worked[${i}]`, text: e.en }));
  out.push({ where: 'pair.natural', text: l.pair.natural }, { where: 'pair.off', text: l.pair.off });
  l.check.forEach((c) => itemTexts(c).forEach((t) => out.push({ where: c.id, text: t })));
  l.glossary.forEach((g) => out.push({ where: 'glossary', text: g.en }));
  l.talk?.forEach((t, i) => out.push({ where: `talk[${i}]`, text: t.en }));
  return out.map((x) => ({ ...x, text: stripMarkup(x.text) })).filter((x) => x.text.trim());
}

export function words(text: string): string[] {
  return (text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? []).map((w) => w.toLowerCase());
}

function knownWord(w: string, lex: Set<string>): boolean {
  if (lex.has(w)) return true;
  if (w.endsWith("'s") && lex.has(w.slice(0, -2))) return true;
  if (w.endsWith('s') && lex.has(w.slice(0, -1))) return true;
  if (w.endsWith('es') && lex.has(w.slice(0, -2))) return true;
  if (w.endsWith('ies') && lex.has(`${w.slice(0, -3)}y`)) return true;
  return false;
}

export function lintLessons(rungs: Rung[], byRung: Map<string, Lesson[]>): Finding[] {
  const findings: Finding[] = [];
  const lexicon = getLexicon();
  const irregular = new Map(getNouns().map((n) => [n.plural.toLowerCase(), n.word.toLowerCase()]));
  const earlierInventory: string[] = [];
  const earlierWords: string[] = [];

  for (const rung of rungs) {
    const lessons = byRung.get(rung.id) ?? [];
    const allowedSoFar = [...earlierInventory];
    const rungLex = [...earlierWords, ...(lexicon[rung.id] ?? [])].map((w) => w.toLowerCase());
    const glossSoFar: string[] = [];
    const rules = STRUCTURE_RULES[rung.id] ?? [];

    for (const l of lessons) {
      const level: Finding['level'] = l.status === 'reviewed' ? 'error' : 'warn';
      const where = `${rung.id}/${l.slug}`;
      allowedSoFar.push(...l.introduces);
      l.glossary.forEach((g) => glossSoFar.push(...words(g.en)));
      const lex = new Set([...rungLex, ...glossSoFar]);
      const texts = englishTexts(l);

      // 1. Inventory: no structure before the lesson that teaches it.
      for (const [inv, re] of Object.entries(INVENTORY_DETECTORS)) {
        const taughtHere = rung.inventory.includes(inv) || earlierInventory.includes(inv);
        if (!taughtHere || allowedSoFar.includes(inv)) continue;
        for (const t of texts) {
          if (t.where === 'pair.off') continue;
          if (re.test(t.text)) {
            findings.push({ level, message: `${where}: ${t.where}: uses "${inv}" before it is taught: "${t.text}"` });
          }
        }
      }

      // 2. Structure lint: grammar from later rungs.
      for (const rule of rules) {
        for (const t of texts) {
          if (rule.re.test(t.text)) findings.push({ level, message: `${where}: ${t.where}: ${rule.name} is not taught in ${rung.name}: "${t.text}"` });
        }
      }

      // 3. Lexicon: unknown words.
      const unknown = new Set<string>();
      for (const t of texts) {
        for (const w of words(t.text)) {
          if (!knownWord(w, lex) && !(irregular.has(w) && lex.has(irregular.get(w)!))) unknown.add(w);
        }
      }
      if (unknown.size) findings.push({ level, message: `${where}: words not in the ${rung.name} lexicon or earlier glossaries: ${[...unknown].join(', ')}` });
    }

    // 4. Test pool: whole-rung lexicon and structure rules.
    const pool = getTestPool(rung.id);
    if (pool) {
      const lex = new Set([...rungLex, ...glossSoFar]);
      const unknown = new Set<string>();
      for (const item of pool.items) {
        for (const text of itemTexts(item).map(stripMarkup)) {
          for (const rule of rules) {
            if (rule.re.test(text)) findings.push({ level: 'error', message: `${rung.id}/test.yaml: ${item.id}: ${rule.name} is not taught in ${rung.name}: "${text}"` });
          }
          for (const w of words(text)) {
            if (!knownWord(w, lex) && !(irregular.has(w) && lex.has(irregular.get(w)!))) unknown.add(w);
          }
        }
      }
      if (unknown.size) findings.push({ level: 'warn', message: `${rung.id}/test.yaml: words not in the ${rung.name} lexicon or glossaries: ${[...unknown].join(', ')}` });
    }

    earlierInventory.push(...rung.inventory);
    earlierWords.push(...(lexicon[rung.id] ?? []), ...glossSoFar);
  }
  return findings;
}
