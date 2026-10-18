// Japanese Ladder's content schema (docs/japanese/CLAUDE.md §5). Build time only.
import { z } from 'zod';
import { VISUAL_IDS } from '@/visuals/visualIds';

const Bilingual = z.object({ id: z.string().min(1), en: z.string().min(1) }).strict();

const Visual = z.object({ id: z.enum(VISUAL_IDS), props: z.record(z.unknown()).default({}) }).strict();

/** Tokyo accent numbers per word, where known (optional everywhere). */
const Pitch = z.record(z.number().int().min(0).max(12));

/**
 * A Japanese line: `ja` with ruby markup `{漢字|か|じ}` (per-character readings), `{今日|=きょう}`
 * (a jukujikun word read as a whole) and `[[focus]]`, words separated by single spaces; `kana` is
 * the full reading with the same word tokens (CLAUDE.md §5.2).
 */
const JaKana = { ja: z.string().min(1), kana: z.string().min(1) };
const JaLine = z
  .object({ ...JaKana, id: z.string().min(1), en: z.string().min(1).optional(), pitch: Pitch.optional(), note: Bilingual.optional() })
  .strict();

const itemBase = {
  id: z.string().regex(/^[a-z0-9-]+$/, 'ids are lowercase, digits and dashes'),
  cue: z.string().optional(),
  why: Bilingual,
  from: z.string().optional(),
  /** Show furigana in this item. Default: follow the rung (reading items: off for kanji at or below it). */
  furigana: z.boolean().optional(),
  /** Placement items only: the part of the check the item belongs to. */
  section: z.enum(['hiragana', 'katakana', 'dakuten', 'ear', 'typing', 'kanji']).optional(),
};

const optionsMsg = { message: 'answer must be one of the options' };
const Options = z.array(z.string().min(1)).min(2).max(4);

export const ChoiceItem = z.object({ ...itemBase, type: z.literal('choice'), prompt: z.string(), options: Options, answer: z.string() }).strict();
export const GapItem = z.object({ ...itemBase, type: z.literal('gap'), prompt: z.string(), options: Options, answer: z.string() }).strict();
export const OrderItem = z
  .object({
    ...itemBase,
    type: z.literal('order'),
    prompt: z.string().optional(),
    tiles: z.array(z.string().min(1)).min(2),
    answer: z.array(z.string().min(1)).min(2),
    accept: z.array(z.array(z.string().min(1))).optional(),
  })
  .strict();
export const SceneItem = z
  .object({ ...itemBase, type: z.literal('scene'), prompt: z.string().optional(), visual: Visual, options: Options, answer: z.string() })
  .strict();
export const FixItem = z.object({ ...itemBase, type: z.literal('fix'), wrong: z.string(), options: Options, answer: z.string() }).strict();
export const ListenItem = z
  .object({ ...itemBase, type: z.literal('listen'), prompt: z.string().optional(), audio: z.string().min(1), options: Options, answer: z.string() })
  .strict();

/** Draw a kana, or a kanji on this rung's handwriting set. */
export const TraceItem = z
  .object({ ...itemBase, type: z.literal('trace'), prompt: z.string().optional(), char: z.string().length(1), guide: z.enum(['on', 'off']).default('on') })
  .strict();

/** Pick the components that make a kanji. */
export const BuildItem = z
  .object({
    ...itemBase,
    type: z.literal('build'),
    prompt: z.string().optional(),
    char: z.string().length(1),
    parts: z.array(z.string().min(1)).min(3).max(6),
    answer: z.array(z.string().min(1)).min(2).max(3),
  })
  .strict();

/** Hear a word (or see a kanji word, shown without furigana) and type its reading in kana. */
export const KanaItem = z
  .object({
    ...itemBase,
    type: z.literal('kana'),
    prompt: z.string().optional(),
    audio: z.string().min(1).optional(),
    ja: z.string().min(1).optional(),
    answer: z.string().min(1),
    accept: z.array(z.string().min(1)).optional(),
    script: z.enum(['hiragana', 'katakana', 'any']).default('hiragana'),
  })
  .strict();

/** Hear a word; count its beats, or pick the spelling among long/short/っ variants. */
export const MoraItem = z
  .object({
    ...itemBase,
    type: z.literal('mora'),
    prompt: z.string().optional(),
    audio: z.string().min(1),
    ask: z.enum(['count', 'spelling']),
    options: Options,
    answer: z.string(),
  })
  .strict();

/** Hear one word of a pitch pair; pick its meaning. */
export const PitchItem = z
  .object({
    ...itemBase,
    type: z.literal('pitch'),
    prompt: z.string().optional(),
    audio: z.string().min(1),
    pair: z
      .array(z.object({ ja: z.string().min(1), kana: z.string().min(1), pitch: z.number().int().min(0), id: z.string().min(1), en: z.string().optional() }).strict())
      .length(2),
    answer: z.string(),
  })
  .strict();

/** Change a word to a target form, by choosing or typing. */
export const FormItem = z
  .object({
    ...itemBase,
    type: z.literal('form'),
    prompt: z.string().optional(),
    word: z.string().min(1),
    target: z.enum(['masu', 'masen', 'mashita', 'masendeshita', 'te', 'nai', 'ta', 'dict', 'potential', 'volitional', 'masho']),
    options: Options.optional(),
    answer: z.string().min(1),
    accept: z.array(z.string().min(1)).optional(),
  })
  .strict();

export const CheckItemSchema = z
  .discriminatedUnion('type', [
    ChoiceItem,
    GapItem,
    OrderItem,
    SceneItem,
    FixItem,
    ListenItem,
    TraceItem,
    BuildItem,
    KanaItem,
    MoraItem,
    PitchItem,
    FormItem,
  ])
  .superRefine((item, ctx) => {
    if (item.type === 'kana' && !!item.audio === !!item.ja) ctx.addIssue({ code: 'custom', path: ['audio'], message: 'a kana item has either audio or ja' });
    if (item.type === 'build') {
      for (const a of item.answer) if (!item.parts.includes(a)) ctx.addIssue({ code: 'custom', path: ['answer'], message: `answer part ${a} is not among the parts` });
      return;
    }
    if (item.type === 'pitch') {
      if (!item.pair.some((p) => p.id === item.answer)) ctx.addIssue({ code: 'custom', path: ['answer'], message: 'answer must be one of the pair meanings (id)' });
      return;
    }
    if ('options' in item && item.options && !(item.options as string[]).includes(item.answer as string)) {
      ctx.addIssue({ code: 'custom', path: ['answer'], ...optionsMsg });
    }
    if (item.type === 'gap' && item.prompt.split('___').length !== 2) {
      ctx.addIssue({ code: 'custom', path: ['prompt'], message: 'gap prompt needs exactly one ___' });
    }
    if (item.type === 'order') {
      const sorted = (a: string[]) => [...a].sort().join('\u0000');
      for (const a of [item.answer, ...(item.accept ?? [])]) {
        if (sorted(a) !== sorted(item.tiles)) ctx.addIssue({ code: 'custom', path: ['answer'], message: 'answer must use exactly the tiles' });
      }
    }
  });

export const GlossaryEntry = z
  .object({
    ...JaKana,
    id: z.string().min(1),
    en: z.string().min(1).optional(),
    type: z.enum(['noun', 'verb-1', 'verb-2', 'verb-3', 'adj-i', 'adj-na', 'adverb', 'particle', 'expression', 'counter', 'pronoun', 'number', 'name', 'other']).optional(),
    pitch: z.number().int().min(0).max(12).optional(),
    jlpt: z.enum(['N5', 'N4', 'N3', 'N2', 'N1']).optional(),
  })
  .strict();

/** A word outside the rung's list, with the reason it is in the lesson (CLAUDE.md §6.1). */
const Extra = z.object({ ja: z.string().min(1), reason: z.string().min(1) }).strict();

const Review = z.object({ by: z.string().min(1), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).strict();

const Title = z.object({ id: z.string().min(1), en: z.string().min(1), ja: z.string().min(1), kana: z.string().min(1) }).strict();

const TalkLine = z.object({ who: z.string().min(1), ...JaKana, id: z.string().min(1), en: z.string().min(1).optional(), note: Bilingual.optional() }).strict();

export const LessonFrontmatterSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    rung: z.string(),
    order: z.number().int().min(1).max(20),
    status: z.enum(['draft', 'reviewed']),
    review: Review.optional(),
    minutes: z.number().int().min(3).max(15),
    title: Title,
    summary: Bilingual,
    introduces: z.array(z.string()).min(1),
    spiral: z.string(),
    visual: Visual.optional(),
    /** Worked examples for the See step when there is no visual. */
    worked: z.array(JaLine).min(2).max(8).optional(),
    examples: z.array(JaLine).min(4).max(6),
    pair: z.object({ off: z.object(JaKana).strict(), natural: z.object(JaKana).strict() }).strict(),
    /** Bunyi card: one pronunciation point with words to play (minimal pairs side by side). */
    sound: z
      .object({
        words: z.array(z.object(JaKana).strict()).min(1).max(6),
        kind: z.enum(['long-vowel', 'small-tsu', 'n', 'pitch', 'mora', 'kana']),
        tip: Bilingual,
      })
      .strict()
      .optional(),
    /** Kanji introduced here (Kanji card). */
    kanji: z.array(z.string().length(1)).max(8).optional(),
    /** Kana introduced here (Kana rungs: the romaji fade and the chart). */
    kana_new: z.array(z.string().min(1)).max(30).optional(),
    /** Sopan card: one meaning at two or three politeness levels. */
    polite: z
      .object({ rows: z.array(z.object({ level: z.enum(['casual', 'polite', 'honorific']), ...JaKana, id: z.string().min(1) }).strict()).min(2).max(3) })
      .strict()
      .optional(),
    /** Kerja card: a workplace exchange. */
    work: z.object({ situation: Bilingual, lines: z.array(TalkLine).min(2).max(4) }).strict().optional(),
    /** Kata card: loanword traps and katakana English. */
    words: Bilingual.optional(),
    talk: z.object({ lines: z.array(TalkLine).min(2).max(4) }).strict().optional(),
    tirukan: z.object({ ...JaKana, id: z.string().min(1), en: z.string().min(1).optional() }).strict(),
    check: z.array(CheckItemSchema).min(4).max(6),
    glossary: z.array(GlossaryEntry).min(1).max(16),
    extra: z.array(Extra).optional(),
    next: z.string().nullable().optional(),
  })
  .strict()
  .refine((l) => l.visual || l.worked, { message: 'a lesson needs either a visual or a worked example for the See step' })
  .refine((l) => l.status !== 'reviewed' || !!l.review, { message: 'a reviewed lesson needs review.by and review.date' });

export const RungSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    /** The rung's Japanese name, with ruby markup. */
    name_ja: z.string().min(1),
    tier: z.enum(['kana', 'easy', 'medium', 'hard']),
    /** JLPT level, "—" for the Kana rungs. */
    jlpt: z.enum(['—', 'N5', 'N4', 'N3', 'N2', 'N1']),
    /** JFT-Basic is marked at Medium 1. */
    jft: z.boolean().default(false),
    cefr: z.string(),
    status: z.enum(['live', 'soon']),
    optional: z.boolean().default(false),
    lessons: z.number().int(),
    /** The furigana fade (PRD §4.5); Kana 1 has none ("—"). */
    furigana: z.enum(['always', 'new', 'on-request', 'off', '—']),
    /** Kana 1 only: romaji fades out within the rung (CLAUDE.md §7.2). */
    romaji: z.enum(['fade', 'none']).default('none'),
    /** Cumulative estimates, checked against the imported lists (±20%). */
    words_cum: z.number().int().min(0),
    kanji_cum: z.number().int().min(0),
    description: Bilingual,
    topics: z.array(z.string()).min(1),
    threads: z.array(z.string()).default([]),
    inventory: z.array(z.string()).default([]),
  })
  .strict();

export const CurriculumSchema = z.object({ rungs: z.array(RungSchema).min(1) }).strict();

export const TestPoolSchema = z
  .object({ rung: z.string(), draw: z.number().int().default(16), pass: z.number().int().default(12), items: z.array(CheckItemSchema).min(8) })
  .strict()
  .refine((p) => p.items.length >= p.draw, { message: 'the pool needs at least draw items' })
  .refine((p) => p.pass <= p.draw, { message: 'pass cannot exceed draw' });

/** Baca dan dengar: one short text per rung with a few questions. */
export const ReadingSchema = z
  .object({
    rung: z.string(),
    title: Title,
    lines: z.array(JaLine).min(2).max(12),
    glossary: z.array(GlossaryEntry).max(8).default([]),
    items: z.array(CheckItemSchema).min(2).max(4),
  })
  .strict();

/** Ngobrol capstone: a 6–10 line dialogue. */
export const DialogueSchema = z
  .object({ rung: z.string(), title: Title, lines: z.array(TalkLine).min(6).max(10), note: Bilingual.optional(), items: z.array(CheckItemSchema).min(3).max(4) })
  .strict();

export const PLACEMENT_SECTIONS = ['hiragana', 'katakana', 'dakuten', 'ear', 'typing', 'kanji'] as const;

export const PlacementSchema = z
  .object({ items: z.array(CheckItemSchema).length(20), thresholds: z.object({ easy1: z.number().int(), kana2: z.number().int() }).strict() })
  .strict()
  .superRefine((p, ctx) => {
    p.items.forEach((item, i) => {
      if (!item.section) ctx.addIssue({ code: 'custom', path: ['items', i, 'section'], message: 'placement items need a section' });
    });
  });

/** Proper names allowed in content without a list entry. */
export const NamesSchema = z.array(z.object({ ...JaKana, id: z.string().min(1) }).strict());
