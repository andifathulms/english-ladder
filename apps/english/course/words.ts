// My-words annotation for English: the a/an article badge and the irregular-plural suffix.
import type { Gloss } from '@ladder/core/lib/types';
import type { WordAnnotation } from '@ladder/core/course/types';
import { article } from '@/visuals/nounLogic';
import type { Noun } from './schema';

// wordData is the glossed nouns from course/content.ts (ContentModel.wordData).
const lookups = new WeakMap<object, Map<string, Noun>>();
const lookup = (nouns: Noun[]) => {
  let m = lookups.get(nouns);
  if (!m) lookups.set(nouns, (m = new Map(nouns.map((n) => [n.word.toLowerCase(), n]))));
  return m;
};

export function wordAnnotator(word: Gloss, data: unknown): WordAnnotation {
  const noun = Array.isArray(data) ? lookup(data as Noun[]).get(word.text.toLowerCase()) : undefined;
  if (!noun) return {};
  return {
    badge: article(noun),
    pluralSuffix: noun.plural_rule === 'irregular' ? noun.plural : undefined,
  };
}
