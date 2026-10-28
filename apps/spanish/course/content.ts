// Build-time only: Spanish Ladder's content model — schemas, adapter, data files and check hooks.
// Never import this file from a client component.
import fs from 'node:fs';
import path from 'node:path';
import { createContent, type ContentModel } from '@ladder/core/lib/content/load';
import { buildFormIndex, type VerbData } from '@/lib/es';
import { adapter } from './adapter';
import {
  BridgesSchema,
  CurriculumSchema,
  DialogueSchema,
  GrammarSchema,
  LessonFrontmatterSchema,
  LexiconSchema,
  NamesSchema,
  PlacementSchema,
  ReadingSchema,
  TestPoolSchema,
  VerbsSchema,
  WordListSchema,
} from './schema';
import { lintLessons, lintPool, type LintData } from './lint';
import type { CheckItem, Dialogue, GlossaryEntry, Lesson, Placement, Reading, Rung, TestPool } from './types';
import { wordIdOf, type EsLessonData } from './lessonData';
import { answerText, itemText, itemTypes } from './items';

const sl = (l: unknown) => l as Lesson;

/** Rungs before Easy 3 accept a typed answer that only misses accents (CLAUDE.md §3.3). */
export function rungAccents(rungId: string): 'lenient' | 'strict' {
  return ['dasar', 'easy-1', 'easy-2'].includes(rungId) ? 'lenient' : 'strict';
}
const PLACEMENT_RUNG: Record<string, string> = { dasar: 'dasar', easy1: 'easy-1', easy2: 'easy-2', easy3: 'easy-3' };
const TYPED = new Set(['form', 'conjugate', 'dictation']);

/** Stamps each typed item with its accent mode, unless authored; stress items are always strict. */
function stampAccents<T extends { type: string; accents?: 'strict' | 'lenient' }>(items: T[], mode: 'strict' | 'lenient'): T[] {
  return items.map((i) => (i.type === 'stress' ? { ...i, accents: 'strict' } : TYPED.has(i.type) && !i.accents ? { ...i, accents: mode } : i));
}

let dataCache: LintData | null = null;
/** The data files the lint and the visuals read (verbs, grammar, bridges, lexicon, names, word lists). */
export function getData(): LintData {
  if (dataCache) return dataCache;
  const read = <T>(file: string, parse: (x: unknown) => T, empty: T): T => (content.exists(file) ? parse(content.readYaml(file)) : empty);
  // verbs.yaml plus data/verbs/*.yaml (verbs added with a rung's lessons), in name order.
  const extraFiles = (dir: string) => (content.exists(dir) ? fs.readdirSync(path.join(content.contentDir, dir)).filter((f) => f.endsWith('.yaml')).sort().map((f) => `${dir}/${f}`) : []);
  const verbs = ['data/verbs.yaml', ...extraFiles('data/verbs')].flatMap((f) => read(f, (x) => VerbsSchema.parse(x), [])) as VerbData[];
  const wordLists: Record<string, GlossaryEntry[]> = {};
  for (const r of content.getCurriculum()) {
    const file = `data/words/${r.id}.yaml`;
    if (content.exists(file)) wordLists[r.id] = WordListSchema.parse(content.readYaml(file));
  }
  dataCache = {
    verbs,
    grammar: read('data/grammar.yaml', (x) => GrammarSchema.parse(x), []),
    bridges: read('data/bridges.yaml', (x) => BridgesSchema.parse(x), { bridges: [], false_friends: [] }),
    lexicon: read('lexicon/core.yaml', (x) => LexiconSchema.parse(x), { rungs: {}, spain_only: {}, latam_only: {} }),
    names: ['data/names.yaml', ...extraFiles('data/names')].flatMap((f) => read(f, (x) => NamesSchema.parse(x), [])),
    wordLists,
    formIndex: buildFormIndex(verbs),
  };
  return dataCache;
}

/** Word frequency ranks (content/data/vendor/frequency.json). */
export function getFrequency(): Record<string, number> {
  const file = path.join(content.contentDir, 'data', 'vendor', 'frequency.json');
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, number>) : {};
}

const dialogueTexts = (d: Dialogue) => [d.title.es, ...d.lines.map((l) => l.es)].map((text) => ({ text, variety: d.variety === 'es' ? ('es' as const) : ('latam' as const) }));
const readingTexts = (r: Reading) => [r.title.es, ...r.lines.map((l) => l.es)].map((text) => ({ text, variety: 'latam' as const }));

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
  // ConjugationGrid reads verbs.yaml (forms come from lib/es with the listed irregular cells).
  visualData: (ids) => (ids.has('conjugation-grid') ? { verbs: getData().verbs } : undefined),
  // My words: verbs open their grid in a sheet.
  wordData: () => ({ verbs: getData().verbs }),
  lessonData: (l): EsLessonData => {
    const lesson = sl(l);
    const { bridges } = getData();
    const named = new Set([...(lesson.words?.bridges ?? []), ...lesson.glossary.filter((g) => g.bridge).map((g) => g.es)]);
    return {
      wordIds: lesson.glossary.map((g) => wordIdOf(g.es)),
      bridges: bridges.bridges.filter((b) => named.has(b.es)),
      falseFriends: bridges.false_friends.filter((f) => named.has(f.es)),
    };
  },
  // Typed items carry their accent mode from the rung, so grading needs no rung lookup.
  postParse: {
    lesson: (l) => ({ ...l, check: stampAccents(sl(l).check, rungAccents(l.rung)) as unknown as Lesson['check'] }) as never,
    testPool: (p, rungId) => ({ ...p, items: stampAccents(p.items as unknown as CheckItem[], rungAccents(rungId)) as never }),
    reading: (r, rungId) => ({ ...r, items: stampAccents(r.items as unknown as CheckItem[], rungAccents(rungId)) as never }),
    dialogue: (d, rungId) => ({ ...d, items: stampAccents(d.items as unknown as CheckItem[], rungAccents(rungId)) as never }),
    placement: (p) => ({
      ...p,
      items: (p.items as unknown as CheckItem[]).map((i) => stampAccents([i], rungAccents(PLACEMENT_RUNG[i.section ?? 'easy1']))[0]) as never,
    }),
  },
  check: {
    lessonCountMatchesCurriculum: true,
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
      // Data: unique ids and grammar points.
      const seen = new Set<string>();
      for (const g of data.grammar) {
        if (seen.has(g.id)) ctx.err(`data/grammar.yaml: duplicate id "${g.id}"`);
        seen.add(g.id);
      }
      const infs = new Set<string>();
      for (const v of data.verbs) {
        if (infs.has(v.inf)) ctx.err(`data/verbs: duplicate verb "${v.inf}"`);
        infs.add(v.inf);
      }
      // Lessons: inventory, lexicon, conjugation, agreement, accents, variety, bridges, sizes.
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
        // A rung test may include one Spain recognition item, never more (PRD §4.5).
        const spainItems = (pool?.items ?? []).filter((i) => i.type === 'listen' && i.variety === 'es').length;
        if (spainItems > 1) ctx.err(`${r.id}/test.yaml: ${spainItems} Spain items; at most one per rung`);
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

// Typed loaders for Spanish's own pages, scripts and lint.
export const CONTENT_DIR = content.contentDir;
export const getCurriculum = () => content.getCurriculum() as unknown as Rung[];
export const getLessons = (rungId: string, opts?: { includeDrafts?: boolean }) => content.getLessons(rungId, opts) as unknown as Lesson[];
export const getTestPool = (rungId: string) => content.getTestPool(rungId) as unknown as TestPool | null;
export const getReading = (rungId: string) => content.getReading(rungId) as unknown as Reading | null;
export const getDialogue = (rungId: string) => content.getDialogue(rungId) as unknown as Dialogue | null;
export const getPlacement = () => content.getPlacement() as unknown as Placement | null;
