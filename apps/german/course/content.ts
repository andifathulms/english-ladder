// Build-time only: German Ladder's content model — schemas, adapter, data files and check hooks.
// Never import this file from a client component.
import fs from 'node:fs';
import path from 'node:path';
import { createContent, type ContentModel } from '@ladder/core/lib/content/load';
import { buildFormIndex, determinerReadings, type StressEntry, type VerbData } from '@/lib/de';
import { adapter } from './adapter';
import {
  BridgesSchema,
  CurriculumSchema,
  DialogueSchema,
  GrammarSchema,
  LessonFrontmatterSchema,
  LexiconSchema,
  NamesSchema,
  NounsSchema,
  PlacementSchema,
  StressSchema,
  ReadingSchema,
  TestPoolSchema,
  VerbsSchema,
  WordListSchema,
} from './schema';
import { bracketFocusError, lintLessons, lintPool, type LintData } from './lint';
import type { CheckItem, Dialogue, GlossaryEntry, Lesson, Placement, Reading, Rung, TestPool } from './types';
import { wordIdOf, type DeCompound, type DeLessonData } from './lessonData';
import { answerText, itemText, itemTypes } from './items';

const sl = (l: unknown) => l as Lesson;

/** Rungs before Easy 3 accept ae/oe/ue/ss and a missed umlaut with a note (CLAUDE.md §3.3). */
export function rungSpelling(rungId: string): 'lenient' | 'strict' {
  return ['dasar', 'easy-1', 'easy-2'].includes(rungId) ? 'lenient' : 'strict';
}
/** Noun capitals count from Easy 1 lesson 5 (CLAUDE.md §3.3); `order` Infinity is a whole rung. */
export function rungNounCaps(rungId: string, order = Infinity): boolean {
  if (rungId === 'dasar') return false;
  return !(rungId === 'easy-1' && order < 5);
}
const PLACEMENT_RUNG: Record<string, string> = { dasar: 'dasar', easy1: 'easy-1', easy2: 'easy-2', easy3: 'easy-3' };
const TYPED = new Set(['form', 'conjugate', 'dictation']);

/** Stamps each typed item with its spelling mode and noun-capital rule, unless authored. */
function stampSpelling<T extends { type: string; spelling?: 'strict' | 'lenient'; nounCaps?: boolean }>(items: T[], rungId: string, order = Infinity): T[] {
  return items.map((i) => (TYPED.has(i.type) ? { ...i, spelling: i.spelling ?? rungSpelling(rungId), nounCaps: i.nounCaps ?? rungNounCaps(rungId, order) } : i));
}

let dataCache: LintData | null = null;
/** The data files the lint and the visuals read (verbs, nouns, grammar, bridges, lexicon, names, word lists). */
export function getData(): LintData {
  if (dataCache) return dataCache;
  const read = <T>(file: string, parse: (x: unknown) => T, empty: T): T => (content.exists(file) ? parse(content.readYaml(file)) : empty);
  // verbs.yaml plus data/verbs/*.yaml (verbs added with a rung's lessons), in name order; nouns the same.
  const extraFiles = (dir: string) => (content.exists(dir) ? fs.readdirSync(path.join(content.contentDir, dir)).filter((f) => f.endsWith('.yaml')).sort().map((f) => `${dir}/${f}`) : []);
  const verbs = ['data/verbs.yaml', ...extraFiles('data/verbs')].flatMap((f) => read(f, (x) => VerbsSchema.parse(x), [])) as VerbData[];
  const nouns = ['data/nouns.yaml', ...extraFiles('data/nouns')].flatMap((f) => read(f, (x) => NounsSchema.parse(x), []));
  const wordLists: Record<string, GlossaryEntry[]> = {};
  for (const r of content.getCurriculum()) {
    const file = `data/words/${r.id}.yaml`;
    if (content.exists(file)) wordLists[r.id] = WordListSchema.parse(content.readYaml(file));
  }
  dataCache = {
    verbs,
    nouns,
    grammar: read('data/grammar.yaml', (x) => GrammarSchema.parse(x), []),
    bridges: read('data/bridges.yaml', (x) => BridgesSchema.parse(x), { bridges: [], false_friends: [] }),
    lexicon: read('lexicon/core.yaml', (x) => LexiconSchema.parse(x), { rungs: {} }),
    names: ['data/names.yaml', ...extraFiles('data/names')].flatMap((f) => read(f, (x) => NamesSchema.parse(x), [])),
    wordLists,
    formIndex: buildFormIndex(verbs),
    determiners: determinerReadings(),
    stress: read('data/stress.yaml', (x) => StressSchema.parse(x), []),
  };
  return dataCache;
}

/** Authored stress for the words of some German lines, by lower-case word. */
function stressFor(lines: string[]): Record<string, StressEntry> {
  const byWord = new Map(getData().stress.map((e) => [e.word.toLowerCase(), e]));
  const out: Record<string, StressEntry> = {};
  for (const w of lines.join(' ').toLowerCase().match(/[a-zäöüß]+/g) ?? []) {
    const e = byWord.get(w);
    if (e) out[w] = e;
  }
  return out;
}

/** Word frequency ranks (content/data/vendor/frequency.json), keyed lower-case. */
export function getFrequency(): Record<string, number> {
  const file = path.join(content.contentDir, 'data', 'vendor', 'frequency.json');
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, number>) : {};
}

const dialogueTexts = (d: Dialogue) => [d.title.de, ...d.lines.map((l) => l.de)];
const readingTexts = (r: Reading) => [r.title.de, ...r.lines.map((l) => l.de)];

/** The Kata card's compounds, with the genders of their parts. */
function compoundsOf(lesson: Lesson): DeCompound[] {
  const { nouns } = getData();
  const byWord = new Map(nouns.map((n) => [n.de, n]));
  return (lesson.words?.compounds ?? []).flatMap((parts) => {
    const n = nouns.find((x) => x.parts && x.parts.join('|') === parts.join('|'));
    if (!n) return [];
    return [{ word: n.de, parts, links: n.links ?? parts.slice(1).map(() => null), gender: n.gender, partGenders: parts.map((p) => byWord.get(p)?.gender ?? null) }];
  });
}

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
  lessonData: (l): DeLessonData => {
    const lesson = sl(l);
    const { bridges } = getData();
    const named = new Set([...(lesson.words?.bridges ?? []), ...lesson.glossary.filter((g) => g.bridge).map((g) => g.de)]);
    return {
      wordIds: lesson.glossary.map((g) => wordIdOf(g.de)),
      bridges: bridges.bridges.filter((b) => named.has(b.de)),
      falseFriends: bridges.false_friends.filter((f) => named.has(f.de)),
      compounds: compoundsOf(lesson),
      stress: stressFor([lesson.tirukan.de, ...(lesson.sound?.words ?? [])]),
    };
  },
  // Typed items carry their spelling mode from the rung, so grading needs no rung lookup.
  postParse: {
    lesson: (l) => ({ ...l, check: stampSpelling(sl(l).check, l.rung, sl(l).order) as unknown as Lesson['check'] }) as never,
    testPool: (p, rungId) => ({ ...p, items: stampSpelling(p.items as unknown as CheckItem[], rungId) as never }),
    reading: (r, rungId) => ({ ...r, items: stampSpelling(r.items as unknown as CheckItem[], rungId) as never }),
    dialogue: (d, rungId) => ({ ...d, items: stampSpelling(d.items as unknown as CheckItem[], rungId) as never }),
    placement: (p) => ({
      ...p,
      items: (p.items as unknown as CheckItem[]).map((i) => stampSpelling([i], PLACEMENT_RUNG[i.section ?? 'easy1'])[0]) as never,
    }),
  },
  check: {
    lessonCountMatchesCurriculum: true,
    // Two [[focus]] marks are allowed when they form one verbal bracket (G1).
    focus: (text, count) => bracketFocusError(text, count, getData().formIndex),
    extra: (ctx) => {
      const rungs = ctx.rungs as unknown as Rung[];
      const lessonsByRung = ctx.lessonsByRung as unknown as Map<string, Lesson[]>;
      const report = (fs: { level: 'error' | 'warn'; message: string }[]) => {
        for (const f of fs) (f.level === 'error' ? ctx.err : ctx.warn)(f.message);
      };
      let data: LintData;
      try {
        data = getData();
      } catch (e) {
        ctx.err(`data files: ${(e as Error).message}`);
        return;
      }
      // Data: unique ids, grammar points, verbs, nouns.
      const dup = (what: string, keys: string[]) => {
        const seen = new Set<string>();
        for (const k of keys) {
          if (seen.has(k)) ctx.err(`${what}: duplicate "${k}"`);
          seen.add(k);
        }
      };
      dup('data/grammar.yaml', data.grammar.map((g) => g.id));
      dup('data/verbs', data.verbs.map((v) => v.inf));
      dup('data/nouns', data.nouns.map((n) => n.de));
      // Lessons: inventory, lexicon, agreement, verb position, conjugation, spelling, register, data.
      report(lintLessons(rungs, lessonsByRung, data));
      // Capstones and tests, linted against the whole rung.
      for (const r of rungs) {
        const pool = content.exists(`${r.id}/test.yaml`) ? getTestPool(r.id) : null;
        if (pool) report(lintPool(rungs, lessonsByRung, data, r.id, `${r.id}/test.yaml`, [], pool.items));
        const reading = content.exists(`${r.id}/reading.yaml`) ? getReading(r.id) : null;
        if (reading) report(lintPool(rungs, lessonsByRung, data, r.id, `${r.id}/reading.yaml`, readingTexts(reading), reading.items));
        const d = content.exists(`${r.id}/dialogue.yaml`) ? getDialogue(r.id) : null;
        if (d) {
          for (const item of d.items) ctx.claim(item.id, `${r.id}/dialogue.yaml`);
          report(lintPool(rungs, lessonsByRung, data, r.id, `${r.id}/dialogue.yaml`, dialogueTexts(d), d.items));
        }
      }
      // Placement (PRD §5.2): 24 items, six per section, each section linted against its rung.
      if (content.exists('placement.yaml')) {
        try {
          const p = getPlacement()!;
          for (const item of p.items) {
            ctx.claim(item.id, 'placement.yaml');
            if (item.from && !ctx.allLessonIds.has(item.from)) ctx.err(`placement.yaml: ${item.id}: from "${item.from}" is not a lesson`);
          }
          for (const s of Object.keys(PLACEMENT_RUNG)) {
            const items = p.items.filter((i) => i.section === s);
            if (items.length !== 6) ctx.err(`placement.yaml: ${items.length} ${s} items, want 6`);
            report(lintPool(rungs, lessonsByRung, data, PLACEMENT_RUNG[s], 'placement.yaml', [], items));
          }
        } catch (e) {
          ctx.err(`placement.yaml: ${(e as Error).message}`);
        }
      }
    },
  },
};

export const content = createContent(model);

// Typed loaders for German's own pages, scripts and lint.
export const CONTENT_DIR = content.contentDir;
export const getCurriculum = () => content.getCurriculum() as unknown as Rung[];
export const getLessons = (rungId: string, opts?: { includeDrafts?: boolean }) => content.getLessons(rungId, opts) as unknown as Lesson[];
export const getTestPool = (rungId: string) => content.getTestPool(rungId) as unknown as TestPool | null;
export const getReading = (rungId: string) => content.getReading(rungId) as unknown as Reading | null;
export const getDialogue = (rungId: string) => content.getDialogue(rungId) as unknown as Dialogue | null;
export const getPlacement = () => content.getPlacement() as unknown as Placement | null;
