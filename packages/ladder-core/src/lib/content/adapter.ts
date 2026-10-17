// How the engine reads a course's lessons. Each course's schema names its fields its own way
// (English `en`, Arabic `ar`/`tr`/`eg`, …); the adapter maps them to the engine's shapes, so core
// never reads a course field by name. Pure functions: used at build time and in the client.
import type { Bilingual, Dialogue, Gloss, Lesson, Line, Quote, Reading, Rung, Title } from '../types';

export type ContentAdapter = {
  /** Rung labels. Default: the CEFR level. */
  rung?: {
    /** The level label (e.g. "HSK 1"); empty when the rung has none. */
    levelLabel(r: Rung): string;
  };
  lesson: {
    title(l: Lesson): Title;
    examples(l: Lesson): Line[];
    /** Worked examples for the See step when the lesson has no visual. */
    worked(l: Lesson): Line[] | null;
    pair(l: Lesson): { off: Line; natural: Line };
    glossary(l: Lesson): Gloss[];
    /** The line quoted on the continue card for the opening steps (default: the first example). */
    lead?(l: Lesson): Line;
    /** The text quoted on the continue card once the lesson is done (step 5). */
    closing(l: Lesson): string;
    /** How a line is quoted on the continue card. Default: text and transliteration without markup. */
    quote?(line: Line): Quote;
    /** The step-5 quote, in place of closing() without markup. */
    closingQuote?(l: Lesson): Quote;
    /** A focus keyword shown as a chip on the rung page (courses that show one). */
    keyword?(l: Lesson): string | null;
    /** Every target string with [[focus]] markup outside check items (content:check: one focus each). */
    focusTexts(l: Lesson): string[];
  };
  reading: {
    title(r: Reading): Title;
    text(r: Reading, rung: Rung): Line;
    /** The translation shown under "Translation". */
    translation(r: Reading, lang: 'id' | 'en'): { text: string; lang: string };
    glossary(r: Reading): Gloss[];
  };
  /** Dialogue capstones (courses with <rung>/dialogue.yaml). */
  dialogue?: {
    title(d: Dialogue): Title;
    lines(d: Dialogue): { who: string; line: Line }[];
    note(d: Dialogue): Bilingual | null;
    /** Spoken variety of the whole dialogue (e.g. 'eg'). */
    variety?(d: Dialogue): string | undefined;
  };
};
