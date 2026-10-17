import type { z } from 'zod';
import type {
  CheckItemSchema,
  DialogueSchema,
  GlossaryEntry as GlossaryEntrySchema,
  LessonFrontmatterSchema,
  LetterSchema,
  LexiconEntry as LexiconEntrySchema,
  MakhrajSchema,
  PlacementSchema,
  ReadingSchema,
  RungSchema,
} from '@/course/schema';

// Arabic Ladder's content types, inferred from course/schema.ts. Type-only: safe for client code.
// The engine sees lessons as @ladder/core/lib/types and reads them through course/adapter.ts.
export type Bilingual = { id: string; en: string };
export type CheckItem = z.infer<typeof CheckItemSchema>;
export type Rung = z.infer<typeof RungSchema>;
export type LessonFrontmatter = z.infer<typeof LessonFrontmatterSchema>;
export type GlossaryEntry = z.infer<typeof GlossaryEntrySchema>;
export type Letter = z.infer<typeof LetterSchema>;
export type MakhrajPoint = z.infer<typeof MakhrajSchema>[number];
export type LexiconEntry = z.infer<typeof LexiconEntrySchema>;

export type LessonSections = { concept: Bilingual; contrast: Bilingual };

/** Plain JSON handed to client components. */
export type Lesson = LessonFrontmatter & LessonSections & { slug: string };

export type Reading = z.infer<typeof ReadingSchema>;
export type Dialogue = z.infer<typeof DialogueSchema>;
export type Placement = z.infer<typeof PlacementSchema>;


/** Engine summaries (built by core from course/adapter.ts). */
export type { LessonSummary, Quote } from '@ladder/core/lib/types';

export type TestPool = { rung: string; draw: number; pass: number; items: CheckItem[] };
