// Build-time only: German Ladder's content model — schemas, adapter and check hooks.
// Never import this file from a client component.
import { createContent, type ContentModel } from '@ladder/core/lib/content/load';
import { adapter } from './adapter';
import { CurriculumSchema, DialogueSchema, LessonFrontmatterSchema, PlacementSchema, ReadingSchema, TestPoolSchema } from './schema';
import type { Dialogue, Lesson, Placement, Reading, Rung, TestPool } from './types';

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
  yaml: 'json',
  check: { lessonCountMatchesCurriculum: true },
};

export const content = createContent(model);

// Typed loaders for German's own pages, scripts and lint.
export const CONTENT_DIR = content.contentDir;
export const getCurriculum = () => content.getCurriculum() as unknown as Rung[];
export const getLessons = (rungId: string, opts?: { includeDrafts?: boolean }) => content.getLessons(rungId, opts) as unknown as Lesson[];
export const getTestPool = (rungId: string) => content.getTestPool(rungId) as unknown as TestPool | null;
export const getReading = (rungId: string) => content.getReading(rungId) as unknown as Reading | null;
export const getDialogue = (rungId: string) => content.getDialogue(rungId) as unknown as Dialogue | null;
export const getPlacement = () => content.getPlacement() as unknown as Placement | null;
