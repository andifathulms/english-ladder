import type { Content } from '@ladder/core/lib/content/load';
import { WordsView } from '@ladder/core/components/WordsView';

/** My words: the glossaries of opened lessons. */
export function wordsPage(content: Content) {
  return function WordsPage() {
    const lessons = content.getAllSummaries();
    return <WordsView lessons={lessons} rungs={content.getCurriculum()} wordData={content.model.wordData?.(lessons)} />;
  };
}
