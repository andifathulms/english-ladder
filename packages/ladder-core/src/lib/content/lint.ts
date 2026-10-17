import type { CheckItem, Lesson, Rung } from '../types';
import { stripMarkup } from '../markup';
import { getLexicon, getNouns, getReading, getTestPool } from './load';
import { INVENTORY_DETECTORS, STRUCTURE_RULES, knownWord, words } from './lint-rules';

export type Finding = { level: 'error' | 'warn'; message: string };

export { INVENTORY_DETECTORS, STRUCTURE_RULES, knownWord, words };

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

    // 5. Reading: the rung's whole lexicon plus its own glossary, and the structure rules.
    let reading = null;
    try {
      reading = getReading(rung.id);
    } catch {
      reading = null; // schema errors are reported by content-check
    }
    if (reading) {
      const lex = new Set([...rungLex, ...glossSoFar, ...reading.glossary.flatMap((g) => words(g.en))]);
      const texts = [reading.text, ...reading.items.flatMap((i) => itemTexts(i))].map(stripMarkup);
      const unknown = new Set<string>();
      for (const text of texts) {
        for (const rule of rules) {
          if (rule.re.test(text)) findings.push({ level: 'error', message: `${rung.id}/reading.yaml: ${rule.name} is not taught in ${rung.name}: "${text}"` });
        }
        for (const w of words(text)) {
          if (!knownWord(w, lex) && !(irregular.has(w) && lex.has(irregular.get(w)!))) unknown.add(w);
        }
      }
      if (unknown.size) findings.push({ level: 'warn', message: `${rung.id}/reading.yaml: words not in the ${rung.name} lexicon or glossaries: ${[...unknown].join(', ')}` });
    }

    earlierInventory.push(...rung.inventory);
    earlierWords.push(...(lexicon[rung.id] ?? []), ...glossSoFar);
  }
  return findings;
}
