// Build-time only: Mandarin Ladder's content model — schemas, adapter, data files, item pinyin,
// lesson data and check hooks. Never import this file from a client component.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { createContent, showDrafts, type ContentModel } from '@ladder/core/lib/content/load';
import { configureAudio } from '@ladder/core/lib/speech/audio';
import { hanChars } from '@/lib/zh/text';
import { normZh } from '@/lib/zh/text';
import { normPinyin } from '@/lib/zh/pinyin';
import { isSyllableKey, zhAudioKey } from '@/lib/zh/audio';
import type { StrokeName } from '@/lib/zh/trace';
import { adapter } from './adapter';
import { answerText, itemText, itemTypes } from './items';
import { fillItemPinyin, type Names } from './autopy';
import { getHanzi, getWords } from './hsk';
import {
  CurriculumSchema,
  DasarPointsSchema,
  DeckSchema,
  DialogueSchema,
  HokkienSchema,
  LessonFrontmatterSchema,
  MeasureWordsSchema,
  NamesSchema,
  PlacementSchema,
  RadicalsSchema,
  ReadingSchema,
  StrokeNamesSchema,
  TestPoolSchema,
} from './schema';
import type {
  CheckItem,
  DasarPoint,
  Deck,
  Dialogue,
  GlossaryEntry,
  HokkienEntry,
  Lesson,
  ZhLessonData,
  MeasureWord,
  Placement,
  Radical,
  Reading,
  Rung,
  TestPool,
} from './types';
import { lintLessons } from './lint';
import { usedChars } from './usedChars';
import { lessonHanzi, lessonWords, recentWords } from './lessonData';
import { visualData } from './visualData';
import { rungLevel } from './hsk';
import { decks, wordFacts } from './words';
// audio-list reads this module's loaders at call time, so the import cycle is safe.
import { missingAudio } from '../scripts/audio-list';

// Audio keys (audio:list, the manifest check) use the same scheme as the app.
configureAudio({ normalise: normZh, key: zhAudioKey, speechFallback: (t) => !isSyllableKey(t) });

export { showDrafts };

const once = <T>(fn: () => T) => {
  let v: T | undefined;
  return () => (v ??= fn());
};
const data = <T>(file: string, parse: (raw: unknown) => T, empty: T) => once((): T => (content.exists(file) ? parse(content.readYaml(file)) : empty));

export const getNames = data('data/names.yaml', (r) => NamesSchema.parse(r) as (Names[number] & { id: string })[], []);
export const getDasarPoints = data('data/dasar-points.yaml', (r) => DasarPointsSchema.parse(r) as DasarPoint[], []);
export const getHokkien = data('data/hokkien.yaml', (r) => HokkienSchema.parse(r) as HokkienEntry[], []);
export const getRadicals = data('data/radicals.yaml', (r) => RadicalsSchema.parse(r) as Radical[], []);
/** Authored stroke names per character (content/data/stroke-names.yaml), checked against the stroke counts. */
export const getStrokeNames = data('data/stroke-names.yaml', (r) => StrokeNamesSchema.parse(r) as Record<string, StrokeName[]>, {});
export const getMeasureWords = data('data/measure-words.yaml', (r) => MeasureWordsSchema.parse(r) as MeasureWord[], []);

export function getDeck(rungId: string): Deck | null {
  if (!content.exists(`${rungId}/deck.yaml`)) return null;
  return DeckSchema.parse(content.readYaml(`${rungId}/deck.yaml`));
}

/** Pinyin for unresolved item strings, per file, for content:check to report. */
export const missingPinyin = new Map<string, string[]>();

function withPinyin(items: CheckItem[], glossary: GlossaryEntry[], where: string): CheckItem[] {
  return items.map((c) => {
    const { item, missing } = fillItemPinyin(c, glossary, getNames());
    if (missing.length) missingPinyin.set(`${where}: ${c.id}`, missing);
    return item;
  });
}

/** Glossary entries of a rung's lessons before `order` (and earlier rungs), for item pinyin. */
function rungGlossary(rungId: string, order = Infinity): GlossaryEntry[] {
  const rungs = getCurriculum();
  const upTo = rungs.findIndex((r) => r.id === rungId);
  const out: GlossaryEntry[] = [];
  for (const r of rungs.slice(0, upTo + 1)) {
    for (const f of content.lessonFiles(r.id)) {
      const n = Number(f.slice(0, 2));
      if (r.id === rungId && n >= order) continue;
      const { data } = matter(fs.readFileSync(path.join(content.contentDir, r.id, f), 'utf8'), {
        engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
      });
      const g = (data as { glossary?: GlossaryEntry[] }).glossary;
      if (Array.isArray(g)) out.push(...g.filter((x) => x && typeof x.zh === 'string' && typeof x.py === 'string'));
    }
  }
  return out;
}

/** The HSK word ids of glossary entries (same characters, same pinyin apart from spacing and neutral tones). */
export function glossaryWordIds(glossary: GlossaryEntry[]): string[] {
  const words = getWords();
  const out: string[] = [];
  for (const g of glossary) {
    const want = normPinyin(g.py.replace(/\s+/g, ''));
    const hits = words.filter((w) => w.zh === g.zh);
    const hit = hits.find((w) => normPinyin(w.py.replace(/\s+/g, '')) === want) ?? (hits.length === 1 ? hits[0] : undefined);
    if (hit && !out.includes(hit.id)) out.push(hit.id);
  }
  return out;
}


const zl = (l: unknown) => l as Lesson;

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
  itemTypes,
  itemText,
  answerText,
  yaml: 'json',
  meta: { title: 'id' },
  // Item pinyin, filled from the glossaries the learner has met (CLAUDE.md §5.4).
  postParse: {
    lesson: (l, where) => {
      const glossary = [...zl(l).glossary, ...rungGlossary(l.rung, l.order)];
      return { ...l, check: withPinyin(l.check as CheckItem[], glossary, where) } as typeof l;
    },
    testPool: (p, rungId) => ({ ...p, items: withPinyin(p.items as CheckItem[], rungGlossary(rungId), `${rungId}/test.yaml`) }) as typeof p,
    reading: (r, rungId) => {
      const rr = r as unknown as Reading;
      return { ...r, items: withPinyin(rr.items, [...rr.glossary, ...rungGlossary(rungId)], `${rungId}/reading.yaml`) } as typeof r;
    },
    dialogue: (d, rungId) => ({ ...d, items: withPinyin(d.items as CheckItem[], rungGlossary(rungId), `${rungId}/dialogue.yaml`) }) as typeof d,
    placement: (p) => ({ ...p, items: withPinyin(p.items as CheckItem[], rungGlossary('easy-1'), 'placement.yaml') }) as typeof p,
  },
  summaryExtra: (l) => ({ wordIds: glossaryWordIds(zl(l).glossary) }),
  lessonData: (l): ZhLessonData => {
    const lesson = zl(l);
    return {
      words: lessonWords(lesson),
      recent: recentWords(lesson),
      hanzi: lessonHanzi(lesson),
      // Hokkien bridges show only once someone who knows the Hokkien form has checked them (CLAUDE.md §6.7).
      hokkien: getHokkien().filter((h) => lesson.hokkien?.includes(h.id_word) && (h.reviewed_by || showDrafts())),
      wordIds: glossaryWordIds(lesson.glossary),
    };
  },
  // Lesson pages: characters the lesson's visuals and build items may explode into parts.
  // Other pages: the shared tables only.
  visualData: (_ids, { lesson }) => {
    if (!lesson) return visualData();
    const l = zl(lesson);
    const chars = [
      ...(l.hanzi ?? []),
      ...hanChars(JSON.stringify(l.visual?.props ?? {})),
      ...l.check.flatMap((c) => (c.type === 'build' || c.type === 'trace' ? [c.char] : [])),
    ];
    return visualData(chars, { examples: l.visual?.id === 'syllable-builder' });
  },
  // My words: HSK facts for the words shown; the Kartu kata tab: one deck per live HSK rung.
  wordData: (summaries) => wordFacts(summaries),
  wordsPageData: () => decks(),
  // The deck card on HSK rung pages: the size of the rung's HSK word list.
  rungData: (r) => {
    const rung = r as unknown as Rung;
    return rung.status === 'live' && rung.hsk !== '—' ? { count: getWords().filter((w) => w.hsk === rungLevel(rung)).length } : null;
  },
  check: {
    lessonCountMatchesCurriculum: true,
    extra: (ctx) => {
      // Data files
      for (const [file, get] of [
        ['data/names.yaml', getNames],
        ['data/dasar-points.yaml', getDasarPoints],
        ['data/hokkien.yaml', getHokkien],
        ['data/measure-words.yaml', getMeasureWords],
        ['data/radicals.yaml', getRadicals],
        ['data/stroke-names.yaml', getStrokeNames],
      ] as const) {
        try {
          get();
        } catch (e) {
          ctx.err(`${file}: ${(e as Error).message}`);
        }
      }
      // Dialogues and decks
      for (const rung of ctx.rungs) {
        for (const [file, get] of [
          ['dialogue.yaml', getDialogue],
          ['deck.yaml', getDeck],
        ] as const) {
          if (!content.exists(`${rung.id}/${file}`)) continue;
          try {
            const doc = get(rung.id)!;
            if (doc.rung !== rung.id) ctx.err(`${rung.id}/${file}: rung "${doc.rung}" does not match folder`);
            if ('items' in doc) for (const item of doc.items) ctx.claim(item.id, `${rung.id}/${file}`);
          } catch (e) {
            ctx.err(`${rung.id}/${file}: ${(e as Error).message}`);
          }
        }
      }
      // Placement (PRD §5.2): 20 items in six sections, 17+ and 12+.
      if (content.exists('placement.yaml')) {
        try {
          const p = getPlacement()!;
          for (const item of p.items) {
            ctx.claim(item.id, 'placement.yaml');
            if (item.from && !ctx.allLessonIds.has(item.from)) ctx.err(`placement.yaml: ${item.id}: from "${item.from}" is not a lesson`);
          }
          const count = (s: string) => p.items.filter((i) => i.section === s).length;
          const want = { tones: 6, pinyin: 4, sandhi: 2, strokes: 2, radicals: 3, chars: 3 };
          for (const [s, n] of Object.entries(want)) if (count(s) !== n) ctx.err(`placement.yaml: ${count(s)} ${s} items, want ${n}`);
          if (!(p.thresholds.easy1 > p.thresholds.dasar2)) ctx.err('placement.yaml: thresholds.easy1 must be above thresholds.dasar2');
        } catch (e) {
          ctx.err(`placement.yaml: ${(e as Error).message}`);
        }
      }
      // Item pinyin that could not be filled in (an item's py map can supply it).
      for (const [where, missing] of missingPinyin) ctx.err(`${where}: no pinyin for ${missing.map((m) => `"${m}"`).join(', ')} (add it to the item's py map)`);
      // Mandarin lint: HSK lists, grammar inventory, characters, pinyin, reviewers, sizes.
      for (const f of lintLessons(ctx.rungs as unknown as Rung[], ctx.lessonsByRung as unknown as Map<string, Lesson[]>)) (f.level === 'error' ? ctx.err : ctx.warn)(f.message);
      // Stroke data for every character a learner can open (CLAUDE.md §5.6, §7.5).
      const strokesDir = path.join(process.cwd(), 'public', 'strokes');
      const noStrokes = [...usedChars().strokes].filter((c) => !fs.existsSync(path.join(strokesDir, `${c.codePointAt(0)!.toString(16)}.json`)));
      if (noStrokes.length) ctx.err(`public/strokes: ${noStrokes.length} characters have no stroke file (npm run strokes:extract): ${noStrokes.slice(0, 20).join('')}`);
      // Authored stroke names have one name per stroke.
      for (const [ch, names] of Object.entries(getStrokeNames())) {
        const h = getHanzi()[ch];
        if (!h) ctx.err(`data/stroke-names.yaml: ${ch} has no Make Me a Hanzi data`);
        else if (h.matches.length !== names.length) ctx.err(`data/stroke-names.yaml: ${ch} has ${h.matches.length} strokes, ${names.length} names`);
      }
      // Audio: every syllable a live rung plays has a recording; sentences may fall back to speech.
      const audio = missingAudio();
      if (audio.syllables.length) ctx.err(`${audio.syllables.length} syllables used in live rungs have no recording: ${audio.syllables.slice(0, 12).join(' ')}`);
      if (audio.missing.length) {
        const msg = `${audio.missing.length} Chinese strings in live rungs have no recording (npm run audio:list)`;
        if (audio.accepted) ctx.warn(`${msg}; accepted with browser-speech fallback by content/audio/fallback.yaml`);
        else ctx.err(msg);
      }
    },
  },
};

export const content = createContent(model);

// Typed loaders for Mandarin's own pages, scripts and lint.
export const CONTENT_DIR = content.contentDir;
export const getCurriculum = () => content.getCurriculum() as unknown as Rung[];
export const getRung = (id: string) => content.getRung(id) as unknown as Rung | undefined;
export const lessonFiles = (rungId: string) => content.lessonFiles(rungId);
export const parseLessonFile = (rungId: string, file: string) => content.parseLessonFile(rungId, file) as unknown as Lesson;
export const getLessons = (rungId: string, opts?: { includeDrafts?: boolean }) => content.getLessons(rungId, opts) as unknown as Lesson[];
export const getLesson = (rungId: string, slug: string) => content.getLesson(rungId, slug) as unknown as Lesson | undefined;
export const getTestPool = (rungId: string) => content.getTestPool(rungId) as unknown as TestPool | null;
export const getReading = (rungId: string) => content.getReading(rungId) as unknown as Reading | null;
export const getDialogue = (rungId: string) => content.getDialogue(rungId) as unknown as Dialogue | null;
export const getPlacement = () => content.getPlacement() as unknown as Placement | null;
