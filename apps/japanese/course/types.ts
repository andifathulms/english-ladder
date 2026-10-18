import type { z } from 'zod';
import type { CheckItemSchema, DialogueSchema, GlossaryEntry as GlossaryEntrySchema, LessonFrontmatterSchema, PlacementSchema, ReadingSchema, RungSchema, TestPoolSchema } from '@/course/schema';

// Type-only imports: erased at compile, so client code can use these without pulling in zod.
export type Bilingual = { id: string; en: string };
export type CheckItem = z.infer<typeof CheckItemSchema>;
export type Rung = z.infer<typeof RungSchema>;
export type LessonFrontmatter = z.infer<typeof LessonFrontmatterSchema>;
export type GlossaryEntry = z.infer<typeof GlossaryEntrySchema>;
export type LessonSections = { concept: Bilingual; contrast: Bilingual };
export type Lesson = LessonFrontmatter & LessonSections & { slug: string };
export type TestPool = z.infer<typeof TestPoolSchema>;
export type Reading = z.infer<typeof ReadingSchema>;
export type Dialogue = z.infer<typeof DialogueSchema>;
export type Placement = z.infer<typeof PlacementSchema>;

/** What a lesson page hands its player besides the lesson (ContentModel.lessonData → useLessonData). */
export type JaLessonData = {
  /** Lesson order within its rung (the Kana 1 romaji fade). */
  order: number;
  /** Kana introduced in this lesson (romaji on new kana only, Kana 1 lessons 7–8). */
  kanaNew: string[];
  /** Kanji at or below the learner's rung (others always show furigana). */
  rungKanji: string[];
  /** Kanji introduced in this lesson and the previous two (the "new" furigana fade). */
  recentKanji: string[];
  /** Deck word ids of the glossary, which join the word deck when the lesson is done. */
  wordIds: string[];
};
