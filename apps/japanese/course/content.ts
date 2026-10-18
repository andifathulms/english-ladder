// Build-time only: Japanese Ladder's content model — schemas, adapter, lesson data and check hooks.
// Never import this file from a client component.
import { createContent, type ContentModel } from '@ladder/core/lib/content/load';
import { configureAudio } from '@ladder/core/lib/speech/audio';
import { normJa } from '@/lib/ja/text';
import { isKanaKey, jaAudioKey, spokenJa } from '@/lib/ja/audio';
import { adapter } from './adapter';
import { answerText, itemText, itemTypes } from './items';
import { CurriculumSchema, DialogueSchema, LessonFrontmatterSchema, PlacementSchema, ReadingSchema, TestPoolSchema } from './schema';
import type { Dialogue, JaLessonData, Lesson, Placement, Reading, Rung, TestPool } from './types';

// Audio keys (audio:list, the manifest check) use the same scheme as the app.
configureAudio({ normalise: normJa, key: jaAudioKey, spoken: spokenJa, speechFallback: (t) => !isKanaKey(t) });

const jl = (l: unknown) => l as Lesson;

/** Kanji introduced by the lessons of a rung up to and including `order` (and earlier rungs). */
function kanjiUpTo(rungId: string, order = Infinity): string[] {
  const rungs = getCurriculum();
  const upTo = rungs.findIndex((r) => r.id === rungId);
  const out = new Set<string>();
  for (const r of rungs.slice(0, upTo + 1)) {
    for (const l of getLessons(r.id, { includeDrafts: true })) {
      if (r.id === rungId && l.order > order) continue;
      for (const k of l.kanji ?? []) out.add(k);
    }
  }
  return [...out];
}

export const model: ContentModel = {
  schemas: {
    curriculum: CurriculumSchema as unknown as ContentModel['schemas']['curriculum'],
    lesson: LessonFrontmatterSchema as unknown as ContentModel['schemas']['lesson'],
    testPool: TestPoolSchema as unknown as ContentModel['schemas']['testPool'],
    reading: ReadingSchema as unknown as ContentModel['schemas']['reading'],
    dialogue: DialogueSchema as unknown as ContentModel['schemas']['dialogue'],
    placement: PlacementSchema as unknown as ContentModel['schemas']['placement'],
  },
  adapter,
  itemTypes,
  itemText,
  answerText,
  yaml: 'json',
  meta: { title: 'id' },
  lessonData: (l): JaLessonData => {
    const lesson = jl(l);
    const recent = getLessons(lesson.rung, { includeDrafts: true })
      .filter((x) => x.order <= lesson.order && x.order > lesson.order - 3)
      .flatMap((x) => x.kanji ?? []);
    return {
      order: lesson.order,
      kanaNew: lesson.kana_new ?? [],
      rungKanji: kanjiUpTo(lesson.rung),
      recentKanji: [...new Set(recent)],
      wordIds: [],
    };
  },
  check: { lessonCountMatchesCurriculum: true },
};

export const content = createContent(model);

// Typed loaders for Japanese's own pages, scripts and lint.
export const CONTENT_DIR = content.contentDir;
export const getCurriculum = () => content.getCurriculum() as unknown as Rung[];
export const getLessons = (rungId: string, opts?: { includeDrafts?: boolean }) => content.getLessons(rungId, opts) as unknown as Lesson[];
export const getTestPool = (rungId: string) => content.getTestPool(rungId) as unknown as TestPool | null;
export const getReading = (rungId: string) => content.getReading(rungId) as unknown as Reading | null;
export const getDialogue = (rungId: string) => content.getDialogue(rungId) as unknown as Dialogue | null;
export const getPlacement = () => content.getPlacement() as unknown as Placement | null;
