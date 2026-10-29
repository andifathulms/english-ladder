// German Ladder's content schema (docs/german/CLAUDE.md §3). Build time only.
//
// Target-language fields are `de` (standard German as spoken in Germany); `id` is Indonesian and `en`
// an optional English gloss. In Bilingual UI fields (why, summary, tips) `en` is the English
// explanation.
import { z } from 'zod';
import { VISUAL_IDS } from '@/visuals/visualIds';

const Bilingual = z.object({ id: z.string().min(1), en: z.string().min(1) }).strict();

const Visual = z.object({ id: z.enum(VISUAL_IDS), props: z.record(z.unknown()).default({}) }).strict();

const Spelling = z.enum(['strict', 'lenient']);

/** A German line: `de` with [[focus]] markup (two marks only for one verbal bracket), its Indonesian meaning. */
const DeLine = z
  .object({ de: z.string().min(1), id: z.string().min(1), en: z.string().min(1).optional(), note: Bilingual.optional() })
  .strict();

export const PLACEMENT_SECTIONS = ['dasar', 'easy1', 'easy2', 'easy3'] as const;
export const GENDERS = ['m', 'f', 'n'] as const;
export const CASES = ['nom', 'akk', 'dat', 'gen'] as const;

const itemBase = {
  id: z.string().regex(/^[a-z0-9-]+$/, 'ids are lowercase, digits and dashes'),
  cue: z.string().optional(),
  why: Bilingual,
  from: z.string().optional(),
  /** Placement items only: the part of the check the item belongs to. */
  section: z.enum(PLACEMENT_SECTIONS).optional(),
  /** Typed answers: lenient accepts ae/oe/ue/ss (and, before Easy 3, a plain vowel for an umlaut) with a note. */
  spelling: Spelling.optional(),
  /** Typed answers: a noun written without its capital is wrong (default from Easy 1 lesson 5). */
  nounCaps: z.boolean().optional(),
  /** `id`: the prompt and options are Indonesian, so the German lint skips them. */
  lang: z.enum(['de', 'id']).optional(),
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

export const PERSONS = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'] as const;
export const TENSES = ['praesens', 'perfekt', 'praeteritum', 'imperativ', 'konj2'] as const;
const Person = z.enum(PERSONS);
const Tense = z.enum(TENSES);

/** The conjugated form of a verb, or an article/ending: by choosing (options) or typing. */
export const FormItem = z
  .object({
    ...itemBase,
    type: z.literal('form'),
    prompt: z.string().optional(),
    base: z.string().min(1),
    target: z.object({ person: Person, tense: Tense }).strict(),
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

/** Hear a sentence; type it. */
export const DictationItem = z
  .object({ ...itemBase, type: z.literal('dictation'), prompt: z.string().optional(), audio: z.string().min(1), answer: z.string().min(1), accept: z.array(z.string().min(1)).optional() })
  .strict();

/** der, die or das for a noun. */
export const GenderItem = z
  .object({ ...itemBase, type: z.literal('gender'), prompt: z.string().optional(), noun: z.string().min(1), answer: z.enum(GENDERS) })
  .strict();

/** The article or ending for one slot of a sentence, with its role (case) shown. */
export const CaseItem = z
  .object({
    ...itemBase,
    type: z.literal('case'),
    prompt: z.string().optional(),
    /** The sentence with one ___ slot. */
    sentence: z.string().min(1),
    role: z.enum(CASES),
    /** The noun the slot goes with (gender from nouns.yaml or the glossary). */
    noun: z.string().min(1),
    options: Options.optional(),
    answer: z.string().min(1),
  })
  .strict();

export const ZONES = ['p1', 'verb', 'middle', 'end'] as const;
/** Word tiles into a main clause, with the bracket zones shown; any valid order is accepted. */
export const WordorderItem = z
  .object({
    ...itemBase,
    type: z.literal('wordorder'),
    prompt: z.string().optional(),
    tiles: z.array(z.string().min(1)).min(2),
    answer: z.array(z.string().min(1)).min(2),
    accept: z.array(z.array(z.string().min(1))).optional(),
    /** The zone of each answer tile (same order), for the bracket in feedback. */
    zones: z.array(z.enum(ZONES)).optional(),
  })
  .strict();

/** A place scene with or without motion: wo? (dative) or wohin? (accusative), and the article. */
export const WechselItem = z
  .object({
    ...itemBase,
    type: z.literal('wechsel'),
    prompt: z.string().optional(),
    scene: z.object({ place: z.string().min(1), motion: z.boolean() }).strict(),
    /** The sentence with one ___ slot for the article. */
    sentence: z.string().min(1),
    verb: z.string().min(1),
    options: Options,
    answer: z.string().min(1),
  })
  .strict();

export const CheckItemSchema = z
  .discriminatedUnion('type', [ChoiceItem, GapItem, OrderItem, SceneItem, FixItem, ListenItem, FormItem, ConjugateItem, DictationItem, GenderItem, CaseItem, WordorderItem, WechselItem])
  .superRefine((item, ctx) => {
    if ('options' in item && Array.isArray(item.options) && !(item.options as string[]).includes(item.answer as string)) {
      ctx.addIssue({ code: 'custom', path: ['answer'], ...optionsMsg });
    }
    if ((item.type === 'gap' && item.prompt.split('___').length !== 2) || ((item.type === 'case' || item.type === 'wechsel') && item.sentence.split('___').length !== 2)) {
      ctx.addIssue({ code: 'custom', path: ['prompt'], message: 'the sentence needs exactly one ___' });
    }
    if (item.type === 'form' && item.frame && item.frame.split('___').length !== 2) {
      ctx.addIssue({ code: 'custom', path: ['frame'], message: 'a form frame needs exactly one ___' });
    }
    if (item.type === 'order' || item.type === 'wordorder') {
      const sorted = (a: string[]) => [...a].sort().join('\u0000');
      for (const a of [item.answer, ...(item.accept ?? [])]) {
        if (sorted(a) !== sorted(item.tiles)) ctx.addIssue({ code: 'custom', path: ['answer'], message: 'answer must use exactly the tiles' });
      }
    }
    if (item.type === 'wordorder' && item.zones && item.zones.length !== item.answer.length) {
      ctx.addIssue({ code: 'custom', path: ['zones'], message: 'one zone per answer tile' });
    }
    if (item.type === 'conjugate') {
      for (const p of item.persons) if (!item.answers[p]) ctx.addIssue({ code: 'custom', path: ['answers', p], message: `no answer for ${p}` });
    }
  });

export const POS = ['noun', 'verb', 'adj', 'adv', 'pron', 'prep', 'conj', 'det', 'num', 'expr', 'interj', 'name'] as const;

export const GlossaryEntry = z
  .object({
    de: z.string().min(1),
    id: z.string().min(1),
    en: z.string().min(1).optional(),
    pos: z.enum(POS),
    /** Nouns: grammatical gender. */
    gender: z.enum(GENDERS).optional(),
    /** Nouns: the plural ("—" for none, e.g. uncountables). */
    plural: z.string().min(1).optional(),
    /** Separable verbs: the prefix (aufstehen → auf). */
    sep: z.string().min(1).optional(),
    verb: z.object({ aux: z.enum(['haben', 'sein']), partizip: z.string().min(1), irregular: z.boolean().optional() }).strict().optional(),
    /** An Indonesian ← Dutch ↔ German bridge; must be listed in data/bridges.yaml. */
    bridge: z.object({ nl: z.string().min(1), id: z.string().min(1) }).strict().optional(),
  })
  .strict()
  .refine((g) => g.pos !== 'noun' || !!g.gender, { message: 'a noun needs its gender' })
  .refine((g) => g.pos !== 'noun' || /^[A-ZÄÖÜ]/.test(g.de), { message: 'a noun is capitalised' })
  .refine((g) => g.pos !== 'verb' || !!g.verb, { message: 'a verb needs verb: { aux, partizip }' });

/** A word outside the rung's list, with the reason it is in the lesson. */
const Extra = z.object({ de: z.string().min(1), reason: z.string().min(1) }).strict();

const Review = z
  .object({ by: z.string().min(1), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), work_by: z.string().min(1).optional() })
  .strict();

const Title = z.object({ id: z.string().min(1), en: z.string().min(1), de: z.string().min(1) }).strict();

const TalkLine = z
  .object({ who: z.string().min(1), de: z.string().min(1), id: z.string().min(1), en: z.string().min(1).optional(), note: Bilingual.optional() })
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
    worked: z.array(DeLine).min(2).max(8).optional(),
    examples: z.array(DeLine).min(4).max(6),
    pair: z.object({ off: z.string().min(1), natural: z.string().min(1) }).strict(),
    /** Bunyi card: a sound point; `pairs` are minimal pairs shown side by side. */
    sound: z
      .object({
        focus: z.string().min(1).optional(),
        words: z.array(z.string().min(1)).max(6).default([]),
        pairs: z.array(z.tuple([z.string().min(1), z.string().min(1)])).max(4).optional(),
        tip: Bilingual,
      })
      .strict()
      .optional(),
    /** Kerja card: a workplace exchange with a one-line situation. */
    work: z.object({ situation: Bilingual, lines: z.array(TalkLine).min(2).max(4) }).strict().optional(),
    /** Kata card: bridges, false friends (from data/bridges.yaml) and compound breakdowns. */
    words: z
      .object({
        id: z.string().min(1),
        en: z.string().min(1),
        bridges: z.array(z.string().min(1)).max(4).optional(),
        /** Compounds as parts with their joint: [Kranken, Haus] → das Krankenhaus. */
        compounds: z.array(z.array(z.string().min(1)).min(2).max(3)).max(3).optional(),
      })
      .strict()
      .optional(),
    talk: z.object({ lines: z.array(TalkLine).min(2).max(4) }).strict().optional(),
    tirukan: z.object({ de: z.string().min(1), id: z.string().min(1), en: z.string().min(1).optional() }).strict(),
    check: z.array(CheckItemSchema).min(4).max(6),
    glossary: z.array(GlossaryEntry).min(3).max(12),
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
    /** The rung's subtitle ("Hallo!", "Alltag"). */
    subtitle: z.string().min(1),
    tier: z.enum(['dasar', 'easy', 'medium', 'hard']),
    /** CEFR half-level (A1.1 …), "Pre-A1" for Dasar. */
    cefr: z.string(),
    /** An exit the rung completes (A1 · Goethe, B1 · Ausbildung, B2 · Pflege/Studium, C1). */
    milestone: z.object({ label: z.string().min(1), exam: z.string().min(1) }).strict().optional(),
    explain_lang: z.enum(['id', 'mixed', 'de']),
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
    lines: z.array(DeLine).min(2).max(14),
    glossary: z.array(GlossaryEntry).max(8).default([]),
    items: z.array(CheckItemSchema).min(2).max(4),
  })
  .strict();

/** Ngobrol capstone: a 6–10 line dialogue in a city, a workplace or an agency office. */
export const DialogueSchema = z
  .object({
    rung: z.string(),
    title: Title,
    setting: z.string().min(1),
    lines: z.array(TalkLine).min(6).max(10),
    note: Bilingual.optional(),
    items: z.array(CheckItemSchema).min(3).max(4),
  })
  .strict();

export const PlacementSchema = z
  .object({ items: z.array(CheckItemSchema).length(24), thresholds: z.record(z.number().int()).default({}) })
  .strict()
  .superRefine((p, ctx) => {
    p.items.forEach((item, i) => {
      if (!item.section) ctx.addIssue({ code: 'custom', path: ['items', i, 'section'], message: 'placement items need a section' });
    });
  });

/** Proper names (people, places) allowed in content without a list entry. */
export const NamesSchema = z.array(z.string().min(1));

// ---------- content/data (CLAUDE.md §3.4) ----------

const LEVEL = z.enum(['A1', 'A2', 'B1', 'B2', 'C1']);
const SixForms = z.array(z.string()).length(6);
const Cells = z.union([SixForms, z.record(z.enum(PERSONS), z.string())]);

/** content/data/verbs.yaml: one verb (lib/de/conjugate.ts VerbData). */
export const VerbSchema = z
  .object({
    inf: z.string().regex(/^[a-zäöüß]+$/),
    id: z.string().min(1),
    en: z.string().optional(),
    sep: z.string().optional(),
    vowel: z.enum(['a-ä', 'e-i', 'e-ie', 'au-äu', 'o-ö']).optional(),
    aux: z.enum(['haben', 'sein']),
    partizip: z.string().min(1),
    praet: z.object({ stem: z.string().min(1), weak: z.boolean().optional() }).strict().optional(),
    irregular: z.record(z.enum(TENSES), Cells).optional(),
    check: z.record(z.enum(TENSES), SixForms).optional(),
  })
  .strict()
  .refine((v) => !v.sep || v.inf.startsWith(v.sep), { message: 'sep must be the start of inf' })
  .refine((v) => !v.sep || v.partizip.startsWith(v.sep), { message: 'a separable participle starts with the prefix' });
export const VerbsSchema = z.array(VerbSchema);

/** content/data/nouns.yaml: one noun; every value authored (lib/de/nouns.ts only checks them). */
export const NounSchema = z
  .object({
    de: z.string().regex(/^[A-ZÄÖÜ]/, 'nouns are capitalised'),
    gender: z.enum(GENDERS),
    plural: z.string().nullable(),
    pattern: z.enum(['-', '¨', '-e', '¨e', '-er', '¨er', '-n', '-en', '-nen', '-s', '-se', 'other']).nullable(),
    id: z.string().min(1),
    person: z.boolean().optional(),
    exception: z.string().optional(),
    parts: z.array(z.string().min(1)).min(2).optional(),
    links: z.array(z.string().nullable()).optional(),
    level: LEVEL.optional(),
  })
  .strict()
  .refine((n) => (n.plural === null) === (n.pattern === null), { message: 'plural and pattern are both set or both null' })
  .refine((n) => !n.links || (n.parts && n.links.length === n.parts.length - 1), { message: 'links: one per joint (parts − 1)' });
export const NounsSchema = z.array(NounSchema);

/** content/data/grammar.yaml: one grammar point. */
export const GrammarPointSchema = z
  .object({
    id: z.string().regex(/^(d|a1|a2|b1|b2|c1)-[a-z0-9-]+$/),
    level: LEVEL,
    desc: z.string().min(1),
    verbs: z.array(z.string()).optional(),
    chunks: z.array(z.string()).optional(),
    detect: z.enum(['dative', 'perfekt', 'subordinate', 'genitive', 'konj2', 'relative', 'passive', 'adj-ending']).optional(),
    note: z.string().optional(),
  })
  .strict();
export const GrammarSchema = z.array(GrammarPointSchema);

const BridgeNote = Bilingual.optional();
/** content/data/bridges.yaml: Indonesian ← Dutch ↔ German bridges and false friends. */
export const BridgesSchema = z
  .object({
    bridges: z.array(
      z.object({ de: z.string().min(1), nl: z.string().min(1), id: z.string().min(1), kind: z.enum(['same', 'near', 'off']), note: BridgeNote }).strict(),
    ),
    false_friends: z.array(
      z
        .object({
          de: z.string().min(1),
          id: z.string().min(1),
          looks_like: z.object({ id: z.string().optional(), en: z.string().optional() }).strict(),
          note: Bilingual,
        })
        .strict(),
    ),
  })
  .strict();

/** content/lexicon/core.yaml: function words per rung (articles, pronouns, prepositions, numbers …). */
export const LexiconSchema = z
  .object({ rungs: z.record(z.array(z.union([z.string(), z.array(z.string())])).transform((xs) => xs.flat().map(String))) })
  .strict();

/** content/data/words/<rung>.yaml: the rung's word list (the deck), lemmas with meanings. */
export const WordListSchema = z.array(GlossaryEntry);
