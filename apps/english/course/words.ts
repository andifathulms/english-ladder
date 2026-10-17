// My-words annotation for English: the a/an article badge and the irregular-plural suffix.
import type { Noun } from '@ladder/core/lib/types';
import type { WordAnnotation } from '@ladder/core/course/types';
import { article } from '@/visuals/nounLogic';

export function wordAnnotator(_word: string, noun: Noun | undefined): WordAnnotation {
  if (!noun) return {};
  return {
    badge: article(noun),
    pluralSuffix: noun.plural_rule === 'irregular' ? noun.plural : undefined,
  };
}
