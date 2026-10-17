// Build-time only: English Ladder's content model (schemas, adapter, data files, check hooks).
import { createContent, type ContentModel } from '@ladder/core/lib/content/load';
import { adapter } from './adapter';
import { CurriculumSchema, LessonFrontmatterSchema, LexiconSchema, NounsSchema, ReadingSchema, TestPoolSchema, type Noun } from './schema';
import { lintLessons } from './wordLint';

let nounsCache: Noun[] | null = null;
export function getNouns(): Noun[] {
  if (!nounsCache) nounsCache = content.exists('data/nouns.yaml') ? NounsSchema.parse(content.readYaml('data/nouns.yaml')) : [];
  return nounsCache;
}

export function getLexicon(): Record<string, string[]> {
  return content.exists('lexicon/core.yaml') ? LexiconSchema.parse(content.readYaml('lexicon/core.yaml')) : {};
}

export const model: ContentModel = {
  schemas: {
    curriculum: CurriculumSchema,
    lesson: LessonFrontmatterSchema,
    testPool: TestPoolSchema,
    reading: ReadingSchema,
  },
  adapter,
  // The noun builder needs the authored noun list; nothing else needs page data.
  visualData: (ids) => (ids.has('noun-builder') ? getNouns() : undefined),
  // Only nouns that appear in a glossary, so the client gets a small, authored lookup.
  wordData: (summaries) => {
    const glossed = new Set(summaries.flatMap((l) => l.glossary.map((g) => g.text.toLowerCase())));
    return getNouns().filter((n) => glossed.has(n.word.toLowerCase()));
  },
  check: {
    requiresTestPool: (_rung, lessons) => lessons >= 8,
    extra: (ctx) => {
      // Nouns
      try {
        const seen = new Set<string>();
        for (const n of getNouns()) {
          if (seen.has(n.word)) ctx.err(`data/nouns.yaml: duplicate noun "${n.word}"`);
          seen.add(n.word);
        }
      } catch (e) {
        ctx.err(`data/nouns.yaml: ${(e as Error).message}`);
      }
      // Inventory, lexicon and structure lint
      for (const f of lintLessons(ctx.rungs, ctx.lessonsByRung)) (f.level === 'error' ? ctx.err : ctx.warn)(f.message);
    },
  },
};

export const content = createContent(model);
