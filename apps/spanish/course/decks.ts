// Build-time only: Kartu kata (PRD §5.7). One A1 deck from the word lists of Dasar, Easy 1 and Easy 2
// (content/data/words/<rung>.yaml), ordered by frequency (content/data/vendor/frequency.json): the
// most common words come first. The level tag is an estimate (SOURCE.md).
// Circular with content.ts (wordsPageData calls decksData): used only inside functions, after both load.
import { plural } from '@/lib/es/agree';
import { conjugate, PERSONS } from '@/lib/es/conjugate';
import type { EsDeckWord } from '@/components/decks';
import { getCurriculum, getData, getFrequency, getLessons } from './content';
import { wordIdOf } from './lessonData';
import type { GlossaryEntry, Lesson } from './types';

/** The rungs whose word lists make the A1 deck. */
export const A1_RUNGS = ['dasar', 'easy-1', 'easy-2'];

/** A word's rank: its most frequent listed form (casa or casas; hablar or habla …). */
function rankOf(g: GlossaryEntry, freq: Record<string, number>): number {
  const forms = [g.es, g.plural ?? (g.pos === 'noun' ? plural(g.es) : undefined), ...(g.forms ?? [])];
  if (g.pos === 'verb') {
    const v = getData().verbs.find((x) => x.inf === g.es);
    if (v) forms.push(...PERSONS.map((p) => conjugate(v, 'presente', p).replace(/^(me|te|se|nos|os) /, '')));
  }
  const ranks = forms.filter((f): f is string => !!f).flatMap((f) => (freq[f.toLowerCase()] ? [freq[f.toLowerCase()]] : []));
  return ranks.length ? Math.min(...ranks) : Infinity;
}

export function decksData(): { words: { rung: string; name: string; level: string; words: EsDeckWord[] }[] } {
  const freq = getFrequency();
  const { wordLists } = getData();
  const lessons: Lesson[] = getCurriculum()
    .filter((r) => A1_RUNGS.includes(r.id))
    .flatMap((r) => getLessons(r.id, { includeDrafts: true }));
  const taughtIn = new Map<string, Lesson>();
  for (const l of lessons) for (const g of l.glossary) if (!taughtIn.has(wordIdOf(g.es))) taughtIn.set(wordIdOf(g.es), l);
  const seen = new Set<string>();
  const words: EsDeckWord[] = [];
  for (const rung of A1_RUNGS) {
    for (const g of wordLists[rung] ?? []) {
      const id = wordIdOf(g.es);
      if (seen.has(id)) continue;
      seen.add(id);
      const lesson = taughtIn.get(id);
      const ex = lesson?.examples.find((e) => e.es.toLowerCase().replace(/\[\[|\]\]/g, '').includes(g.es.toLowerCase()));
      const rank = rankOf(g, freq);
      words.push({
        id,
        es: g.es,
        mean: g.id,
        ...(g.en ? { en: g.en } : {}),
        pos: g.pos,
        ...(g.gender ? { gender: g.gender } : {}),
        ...(g.el ? { el: true } : {}),
        ...(g.pos === 'noun' ? { plural: g.plural ?? plural(g.es) } : {}),
        ...(g.es_es ? { es_es: g.es_es } : {}),
        ...(lesson ? { lesson: lesson.id } : {}),
        ...(ex ? { ex: { es: ex.es, id: ex.id } } : {}),
        ...(Number.isFinite(rank) ? { rank } : {}),
      });
    }
  }
  words.sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));
  return words.length ? { words: [{ rung: 'easy-1', name: 'A1', level: 'A1', words }] } : { words: [] };
}
