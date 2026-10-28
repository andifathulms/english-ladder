// Spanish Ladder's content schema (docs/spanish/CLAUDE.md §3). Build time only.
//
// Target-language fields are `es` (neutral Latin American Spanish) and `es_es` (the Spain variant,
// only where Spain really differs); `id` is Indonesian and `en` an optional English gloss. In
// Bilingual UI fields (why, summary, tips) `en` is the English explanation.
import { z } from 'zod';
import { VISUAL_IDS } from '@/visuals/visualIds';

const Bilingual = z.object({ id: z.string().min(1), en: z.string().min(1) }).strict();

const Visual = z.object({ id: z.enum(VISUAL_IDS), props: z.record(z.unknown()).default({}) }).strict();

const Accents = z.enum(['strict', 'lenient']);

/** A Spanish line: `es` with [[focus]] markup, its Indonesian meaning, and the Spain variant if it differs. */
const EsLine = z
  .object({
    es: z.string().min(1),
    id: z.string().min(1),
    en: z.string().min(1).optional(),
    es_es: z.string().min(1).optional(),
    note: Bilingual.optional(),
  })
  .strict();

export const PLACEMENT_SECTIONS = ['dasar', 'easy1', 'easy2', 'easy3'] as const;

const itemBase = {
  id: z.string().regex(/^[a-z0-9-]+$/, 'ids are lowercase, digits and dashes'),
  cue: z.string().optional(),
  why: Bilingual,
  from: z.string().optional(),
  /** Placement items only: the part of the check the item belongs to. */
  section: z.enum(PLACEMENT_SECTIONS).optional(),
  /** Typed answers: strict, or lenient about accent marks. Default: the rung's (CLAUDE.md §3.3). */
  accents: Accents.optional(),
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
/** Played through speech or a recording; `variety: es` plays it in a Spain voice. */
export const ListenItem = z
  .object({
    ...itemBase,
    type: z.literal('listen'),
    prompt: z.string().optional(),
    audio: z.string().min(1),
    variety: z.enum(['latam', 'es']).optional(),
    options: Options,
    answer: z.string(),
  })
  .strict();

export const PERSONS = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'] as const;
export const TENSES = ['presente', 'preterito', 'imperfecto', 'futuro', 'condicional', 'subjuntivo', 'imperativo'] as const;
const Person = z.enum(PERSONS);
const Tense = z.enum(TENSES);
const Gender = z.enum(['m', 'f']);
const NumberSchema = z.enum(['sg', 'pl']);

/** The conjugated or agreed form of a base word: by choosing (options) or typing. */
export const FormItem = z
  .object({
    ...itemBase,
    type: z.literal('form'),
    prompt: z.string().optional(),
    /** The lemma or base phrase shown, e.g. "tener" or "la casa (blanco)". */
    base: z.string().min(1),
    target: z.union([
      z.object({ person: Person, tense: Tense }).strict(),
      z.object({ gender: Gender, number: NumberSchema }).strict(),
    ]),
    /** The sentence the form goes into (one ___), when there is one. */
    frame: z.string().optional(),
    options: Options.optional(),
    answer: z.string().min(1),
    accept: z.array(z.string().min(1)).optional(),
  })
  .strict();

/** Fill a small grid: one verb, one tense, 2–6 persons. */
export const ConjugateItem = z
  .object({
    ...itemBase,
    type: z.literal('conjugate'),
    prompt: z.string().optional(),
    verb: z.string().min(1),
    tense: Tense,
    persons: z.array(Person).min(2).max(6),
    answers: z.record(Person, z.string().min(1)),
  })
  .strict();

/** Pick the article and adjective forms that agree with a noun. */
export const AgreeItem = z
  .object({
    ...itemBase,
    type: z.literal('agree'),
    prompt: z.string().optional(),
    noun: z.object({ es: z.string().min(1), gender: Gender, number: NumberSchema, id: z.string().min(1).optional() }).strict(),
    /** The adjective's base (masculine singular) form. */
    adj: z.string().min(1),
    definite: z.boolean().default(true),
    options: z.object({ article: z.array(z.string().min(1)).min(2).max(4), adjective: z.array(z.string().min(1)).min(2).max(4) }).strict(),
    answers: z.object({ article: z.string().min(1), adjective: z.string().min(1) }).strict(),
  })
  .strict();

/** Hear a sentence; type it. */
export const DictationItem = z
  .object({
    ...itemBase,
    type: z.literal('dictation'),
    prompt: z.string().optional(),
    audio: z.string().min(1),
    answer: z.string().min(1),
    accept: z.array(z.string().min(1)).optional(),
  })
  .strict();

/** Tap the stressed syllable, and say whether the word needs a written accent. Always strict. */
export const StressItem = z
  .object({
    ...itemBase,
    type: z.literal('stress'),
    prompt: z.string().optional(),
    /** The word as correctly written (its accents are hidden while the item is open). */
    word: z.string().min(1),
    syllables: z.array(z.string().min(1)).min(1).max(6),
    stressed: z.number().int().min(0),
    needsAccent: z.boolean(),
  })
  .strict();

export const CheckItemSchema = z
  .discriminatedUnion('type', [ChoiceItem, GapItem, OrderItem, SceneItem, FixItem, ListenItem, FormItem, ConjugateItem, AgreeItem, DictationItem, StressItem])
  .superRefine((item, ctx) => {
    if (item.type !== 'agree' && 'options' in item && Array.isArray(item.options) && !(item.options as string[]).includes(item.answer)) {
      ctx.addIssue({ code: 'custom', path: ['answer'], ...optionsMsg });
    }
    if (item.type === 'gap' && item.prompt.split('___').length !== 2) {
      ctx.addIssue({ code: 'custom', path: ['prompt'], message: 'gap prompt needs exactly one ___' });
    }
    if (item.type === 'form' && item.frame && item.frame.split('___').length !== 2) {
      ctx.addIssue({ code: 'custom', path: ['frame'], message: 'a form frame needs exactly one ___' });
    }
    if (item.type === 'order') {
      const sorted = (a: string[]) => [...a].sort().join('\u0000');
      for (const a of [item.answer, ...(item.accept ?? [])]) {
        if (sorted(a) !== sorted(item.tiles)) ctx.addIssue({ code: 'custom', path: ['answer'], message: 'answer must use exactly the tiles' });
      }
    }
    if (item.type === 'conjugate') {
      for (const p of item.persons) if (!item.answers[p]) ctx.addIssue({ code: 'custom', path: ['answers', p], message: `no answer for ${p}` });
      for (const p of Object.keys(item.answers)) if (!item.persons.includes(p as never)) ctx.addIssue({ code: 'custom', path: ['answers', p], message: `${p} is not among the persons` });
    }
    if (item.type === 'agree') {
      if (!item.options.article.includes(item.answers.article)) ctx.addIssue({ code: 'custom', path: ['answers', 'article'], ...optionsMsg });
      if (!item.options.adjective.includes(item.answers.adjective)) ctx.addIssue({ code: 'custom', path: ['answers', 'adjective'], ...optionsMsg });
    }
    if (item.type === 'stress') {
      if (item.stressed >= item.syllables.length) ctx.addIssue({ code: 'custom', path: ['stressed'], message: 'stressed is past the last syllable' });
      if (item.accents === 'lenient') ctx.addIssue({ code: 'custom', path: ['accents'], message: 'stress items are always strict' });
    }
  });

export const POS = ['noun', 'verb', 'adj', 'adv', 'pron', 'prep', 'conj', 'det', 'num', 'expr', 'interj', 'name'] as const;

export const GlossaryEntry = z
  .object({
    es: z.string().min(1),
    id: z.string().min(1),
    en: z.string().min(1).optional(),
    pos: z.enum(POS),
    /** Nouns: grammatical gender (mf: either, e.g. estudiante). */
    gender: z.enum(['m', 'f', 'mf']).optional(),
    plural: z.string().min(1).optional(),
    /** A feminine noun that takes el in the singular (el agua). */
    el: z.boolean().optional(),
    /** Adjectives: the four forms, when they don't follow agreeAdj (checked by the lint). */
    forms: z.array(z.string().min(1)).min(1).max(4).optional(),
    verb: z.object({ group: z.enum(['ar', 'er', 'ir']), irregular: z.boolean().optional(), reflexive: z.boolean().optional() }).strict().optional(),
    /** The Spain word, where Spain uses another one (coche for carro). */
    es_es: z.string().min(1).optional(),
    /** An Indonesian ↔ Portuguese ↔ Spanish bridge; must be listed in data/bridges.yaml. */
    bridge: z.object({ pt: z.string().min(1), id: z.string().min(1) }).strict().optional(),
  })
  .strict()
  .refine((g) => g.pos !== 'noun' || !!g.gender, { message: 'a noun needs its gender' })
  .refine((g) => g.pos !== 'verb' || !!g.verb, { message: 'a verb needs verb: { group }' });

/** A word outside the rung's list, with the reason it is in the lesson (CLAUDE.md §4.1). */
const Extra = z.object({ es: z.string().min(1), reason: z.string().min(1) }).strict();

const Review = z
  .object({ by: z.string().min(1), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), es_by: z.string().min(1).optional() })
  .strict();

const Title = z.object({ id: z.string().min(1), en: z.string().min(1), es: z.string().min(1) }).strict();

const TalkLine = z
  .object({ who: z.string().min(1), es: z.string().min(1), id: z.string().min(1), en: z.string().min(1).optional(), note: Bilingual.optional() })
  .strict();

export const LessonFrontmatterSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    rung: z.string(),
    order: z.number().int().min(1).max(12),
    status: z.enum(['draft', 'reviewed']),
    review: Review.optional(),
    minutes: z.number().int().min(3).max(15),
    title: Title,
    summary: Bilingual,
    introduces: z.array(z.string()).min(1),
    spiral: z.string(),
    visual: Visual.optional(),
    /** Worked examples for the See step when there is no visual. */
    worked: z.array(EsLine).min(2).max(8).optional(),
    examples: z.array(EsLine).min(4).max(6),
    pair: z.object({ off: z.string().min(1), natural: z.string().min(1) }).strict(),
    /** Bunyi card: a sound or stress point; `pairs` are minimal pairs shown side by side. */
    sound: z
      .object({
        focus: z.string().min(1).optional(),
        words: z.array(z.string().min(1)).max(6).default([]),
        pairs: z.array(z.tuple([z.string().min(1), z.string().min(1)])).max(4).optional(),
        tip: Bilingual,
      })
      .strict()
      .optional(),
    /** España card: Latin America ↔ Spain rows and a one-line note. */
    spain: z
      .object({ rows: z.array(z.object({ latam: z.string().min(1), es: z.string().min(1) }).strict()).min(1).max(4), note: Bilingual })
      .strict()
      .optional(),
    /** Kata card: bridges and false friends (the words come from data/bridges.yaml). */
    words: z.object({ id: z.string().min(1), en: z.string().min(1), bridges: z.array(z.string().min(1)).max(4).optional() }).strict().optional(),
    talk: z.object({ lines: z.array(TalkLine).min(2).max(4) }).strict().optional(),
    tirukan: z.object({ es: z.string().min(1), id: z.string().min(1), en: z.string().min(1).optional() }).strict(),
    check: z.array(CheckItemSchema).min(4).max(6),
    glossary: z.array(GlossaryEntry).min(3).max(12),
    extra: z.array(Extra).optional(),
    next: z.string().nullable().optional(),
  })
  .strict()
  .refine((l) => l.visual || l.worked, { message: 'a lesson needs either a visual or a worked example for the See step' })
  .refine((l) => l.status !== 'reviewed' || !!l.review, { message: 'a reviewed lesson needs review.by and review.date' })
  .refine((l) => l.status !== 'reviewed' || !l.spain || !!l.review?.es_by, { message: 'a reviewed lesson with an España card needs review.es_by' });

export const RungSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    /** The rung's Indonesian subtitle ("Aku dan duniaku"). */
    subtitle: z.string().min(1),
    tier: z.enum(['dasar', 'easy', 'medium', 'hard']),
    cefr: z.string(),
    /** DELE level; "—" for Dasar. */
    dele: z.enum(['—', 'A1', 'A2', 'B1', 'B2', 'C1']),
    explain_lang: z.enum(['id', 'mixed', 'es']),
    status: z.enum(['live', 'soon']),
    optional: z.boolean().default(false),
    lessons: z.number().int(),
    words_target: z.number().int().min(0),
    description: Bilingual,
    topics: z.array(z.string()).min(1),
    threads: z.array(z.string()).default([]),
    inventory: z.array(z.string()).default([]),
  })
  .strict();

export const CurriculumSchema = z.object({ rungs: z.array(RungSchema).length(10) }).strict();

export const TestPoolSchema = z
  .object({ rung: z.string(), draw: z.number().int().default(16), pass: z.number().int().default(12), items: z.array(CheckItemSchema).min(8) })
  .strict()
  .refine((p) => p.items.length >= p.draw, { message: 'the pool needs at least draw items' })
  .refine((p) => p.pass <= p.draw, { message: 'pass cannot exceed draw' });

/** Baca dan dengar: one connected text per rung, a few lines, with questions. */
export const ReadingSchema = z
  .object({
    rung: z.string(),
    title: Title,
    lines: z.array(EsLine).min(2).max(14),
    glossary: z.array(GlossaryEntry).max(8).default([]),
    items: z.array(CheckItemSchema).min(2).max(4),
  })
  .strict();

/** Ngobrol capstone: a 6–10 line dialogue, set in a city; `variety: es` for a Spain-set one. */
export const DialogueSchema = z
  .object({
    rung: z.string(),
    title: Title,
    city: z.string().min(1),
    variety: z.enum(['latam', 'es']).default('latam'),
    lines: z.array(TalkLine).min(6).max(10),
    note: Bilingual.optional(),
    items: z.array(CheckItemSchema).min(3).max(4),
  })
  .strict();

export const PlacementSchema = z
  .object({
    items: z.array(CheckItemSchema).length(24),
    /** Unused: placement places by section (course.config placement outcomes). Kept for the engine type. */
    thresholds: z.record(z.number().int()).default({}),
  })
  .strict()
  .superRefine((p, ctx) => {
    p.items.forEach((item, i) => {
      if (!item.section) ctx.addIssue({ code: 'custom', path: ['items', i, 'section'], message: 'placement items need a section' });
    });
  });

/** Proper names allowed in content without a list entry. */
export const NamesSchema = z.array(z.string().min(1));
