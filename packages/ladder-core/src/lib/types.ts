import type { z } from 'zod';
import type {
  CheckItemSchema,
  ReadingSchema,
  LessonFrontmatterSchema,
  NounSchema,
  RungSchema,
} from './content/schema';

// Type-only imports: erased at compile, so client code can use these without pulling in zod.
export type Bilingual = { id: string; en: string };
export type CheckItem = z.infer<typeof CheckItemSchema>;
export type Rung = z.infer<typeof RungSchema>;
export type Noun = z.infer<typeof NounSchema>;
export type LessonFrontmatter = z.infer<typeof LessonFrontmatterSchema>;

export type LessonSections = { concept: Bilingual; contrast: Bilingual };

/** Plain JSON handed to client components. */
export type Lesson = LessonFrontmatter & LessonSections & { slug: string };

/** Lightweight lesson info for lists, the ladder and the continue card. */
export type LessonSummary = {
  id: string;
  slug: string;
  rung: string;
  order: number;
  status: 'draft' | 'reviewed';
  minutes: number;
  title: Bilingual;
  checkIds: string[];
  /** Step resume text: index 0..5 → a sentence to quote on the continue card. */
  resume: string[];
  /** One line per check item, for resuming mid-check. */
  checkTexts: string[];
  glossary: { en: string; id: string }[];
};

export type Reading = z.infer<typeof ReadingSchema>;

export type TestPool = { rung: string; draw: number; pass: number; items: CheckItem[] };
