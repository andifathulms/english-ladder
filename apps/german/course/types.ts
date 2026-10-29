import type { z } from 'zod';
import type {
  CheckItemSchema,
  DialogueSchema,
  GlossaryEntry as GlossaryEntrySchema,
  LessonFrontmatterSchema,
  PlacementSchema,
  ReadingSchema,
  RungSchema,
  TestPoolSchema,
} from '@/course/schema';

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
/** A German line as authored (examples, worked, reading). */
export type DeLine = { de: string; id: string; en?: string; note?: Bilingual };
