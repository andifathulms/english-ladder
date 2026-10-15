import { z } from 'zod';
import { VISUAL_IDS } from '../visualIds';

const Bilingual = z.object({ id: z.string().min(1), en: z.string().min(1) }).strict();

const Visual = z
  .object({ id: z.enum(VISUAL_IDS), props: z.record(z.unknown()).default({}) })
  .strict();

const itemBase = {
  id: z.string().regex(/^[a-z0-9-]+$/, 'ids are lowercase, digits and dashes'),
  cue: z.string().optional(),
  why: Bilingual,
  from: z.string().optional(),
};

const answerInOptions = (v: { options: string[]; answer: string }) => v.options.includes(v.answer);
const optionsMsg = { message: 'answer must be one of the options' };
const Options = z.array(z.string().min(1)).min(2).max(4);

export const ChoiceItem = z
  .object({ ...itemBase, type: z.literal('choice'), prompt: z.string(), options: Options, answer: z.string() })
  .strict();
export const GapItem = z
  .object({ ...itemBase, type: z.literal('gap'), prompt: z.string(), options: Options, answer: z.string() })
  .strict();
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
  .object({
    ...itemBase,
    type: z.literal('scene'),
    prompt: z.string().optional(),
    visual: Visual,
    options: Options,
    answer: z.string(),
  })
  .strict();
export const FixItem = z
  .object({ ...itemBase, type: z.literal('fix'), wrong: z.string(), options: Options, answer: z.string() })
  .strict();

/** Played through speech; the sentence is shown only when the browser has no English voice. */
export const ListenItem = z
  .object({
    ...itemBase,
    type: z.literal('listen'),
    prompt: z.string().optional(),
    audio: z.string().min(1),
    options: Options,
    answer: z.string(),
  })
  .strict();

export const CheckItemSchema = z
  .discriminatedUnion('type', [ChoiceItem, GapItem, OrderItem, SceneItem, FixItem, ListenItem])
  .superRefine((item, ctx) => {
    if ('options' in item && !answerInOptions(item)) {
      ctx.addIssue({ code: 'custom', path: ['answer'], ...optionsMsg });
    }
    if (item.type === 'gap' && item.prompt.split('___').length !== 2) {
      ctx.addIssue({ code: 'custom', path: ['prompt'], message: 'gap prompt needs exactly one ___' });
    }
    if (item.type === 'order') {
      const sorted = (a: string[]) => [...a].sort().join('\u0000');
      for (const a of [item.answer, ...(item.accept ?? [])]) {
        if (sorted(a) !== sorted(item.tiles)) {
          ctx.addIssue({ code: 'custom', path: ['answer'], message: 'answer must use exactly the tiles' });
        }
      }
    }
  });

const Example = z
  .object({ en: z.string().min(1), id: z.string().min(1), note: Bilingual.optional() })
  .strict();

/** One pronunciation point: a label, words to play, and a short tip. */
const Sound = z
  .object({ focus: z.string().min(1), words: z.array(z.string().min(1)).min(1).max(4), tip: Bilingual })
  .strict();

/** A short exchange showing the structure in use. */
const TalkLine = z
  .object({ who: z.string().min(1), en: z.string().min(1), id: z.string().min(1), note: Bilingual.optional() })
  .strict();

export const LessonFrontmatterSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    rung: z.string(),
    order: z.number().int().min(1).max(12),
    status: z.enum(['draft', 'reviewed']),
    minutes: z.number().int().min(3).max(15),
    title: Bilingual,
    summary: Bilingual,
    introduces: z.array(z.string()).min(1),
    spiral: z.string(),
    visual: Visual.optional(),
    worked: z.array(Example).min(2).max(8).optional(),
    examples: z.array(Example).min(4).max(6),
    pair: z.object({ off: z.string(), natural: z.string() }).strict(),
    sound: Sound.optional(),
    words: Bilingual.optional(),
    talk: z.array(TalkLine).min(2).max(4).optional(),
    check: z.array(CheckItemSchema).min(4).max(6),
    glossary: z
      .array(z.object({ en: z.string().min(1), id: z.string().min(1) }).strict())
      .min(6)
      .max(12),
    next: z.string().nullable().optional(),
  })
  .strict()
  .refine((l) => l.visual || l.worked, {
    message: 'a lesson needs either a visual or a worked example for the See step',
  });

export const RungSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    tier: z.enum(['easy', 'medium', 'hard']),
    cefr: z.string(),
    explain_lang: z.enum(['id', 'mixed', 'en']),
    status: z.enum(['live', 'soon']),
    lessons: z.number().int(),
    description: Bilingual,
    topics: z.array(z.string()).min(1),
    threads: z.array(z.string()).default([]),
    inventory: z.array(z.string()).default([]),
  })
  .strict();

export const CurriculumSchema = z.object({ rungs: z.array(RungSchema).length(9) }).strict();

export const TestPoolSchema = z
  .object({
    rung: z.string(),
    draw: z.number().int().default(16),
    pass: z.number().int().default(12),
    items: z.array(CheckItemSchema).min(16),
  })
  .strict();

export const NounSchema = z
  .object({
    word: z.string(),
    initial_sound: z.enum(['vowel', 'consonant']),
    ipa_hint: z.string(),
    plural: z.string(),
    plural_rule: z.enum(['s', 'es', 'y-ies', 'f-ves', 'irregular', 'same']),
    id: z.string(),
  })
  .strict();
export const NounsSchema = z.array(NounSchema).min(1);

export const LexiconSchema = z.record(z.array(z.string()));

export const SECTION_HEADINGS = ['concept.id', 'concept.en', 'contrast.id', 'contrast.en'] as const;
