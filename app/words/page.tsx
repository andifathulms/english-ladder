import { getAllSummaries, getNouns } from '@/lib/content/load';
import { WordsView } from '@/components/WordsView';

export const metadata = { title: 'Kata-kataku' };

export default function WordsPage() {
  const lessons = getAllSummaries();
  // Only nouns that appear in a glossary, so the client gets a small, authored lookup.
  const glossed = new Set(lessons.flatMap((l) => l.glossary.map((g) => g.en.toLowerCase())));
  const nouns = getNouns().filter((n) => glossed.has(n.word.toLowerCase()));
  return <WordsView lessons={lessons} nouns={nouns} />;
}
