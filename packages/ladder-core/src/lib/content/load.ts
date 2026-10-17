// Build-time only. Never import this file from a client component.
//
// A course describes its content once (apps/<course>/course/content.ts: schemas, adapter, data
// files, check hooks); createContent() turns that into the loaders the routes and content:check use.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import type { ZodType, ZodTypeDef } from 'zod';
import { parseSections } from './sections';
import { itemText } from '../check/text';
import { stripMarkup } from '../markup';
import type { ContentAdapter } from './adapter';
import type { ItemTypeLogic } from '../check/itemTypes';
import { overrideItemText, registerItemTypes } from '../check/itemTypes';
import type { CheckItem, Dialogue, ExtraItem, Lesson, LessonSummary, Line, Placement, Quote, Reading, Rung, TestPool } from '../types';

// Schemas take the raw YAML; their output is the parsed object.
type Schema<T> = ZodType<T, ZodTypeDef, unknown>;

/** Findings collector handed to a course's content:check hooks. */
export type CheckContext = {
  rungs: Rung[];
  lessonsByRung: Map<string, Lesson[]>;
  allLessonIds: Set<string>;
  err: (m: string) => void;
  warn: (m: string) => void;
  /** Claims a check-item id; reports it if already used elsewhere. */
  claim: (id: string, where: string) => void;
  /** Target strings in an item (core types and registered course types). */
  sentencesOf: (item: CheckItem) => string[];
  content: Content;
};

export type ContentModel = {
  schemas: {
    curriculum: Schema<{ rungs: Rung[] }>;
    lesson: Schema<Omit<Lesson, 'slug' | 'concept' | 'contrast'>>;
    testPool: Schema<TestPool>;
    reading?: Schema<Reading>;
    /** <rung>/dialogue.yaml, for courses with dialogue capstones. */
    dialogue?: Schema<Dialogue>;
    /** content/placement.yaml, for courses with a placement check. */
    placement?: Schema<Placement>;
  };
  adapter: ContentAdapter;
  /** Course item types' grading/text logic (see lib/check/itemTypes.ts). */
  itemTypes?: Record<string, ItemTypeLogic>;
  /** Text of engine item types, where the course words it differently (summaries are built here). */
  itemText?: Record<string, (item: ExtraItem) => string>;
  /** YAML data files: 'default' js-yaml schema, or 'json' (no implicit dates/booleans). */
  yaml?: 'default' | 'json';
  /**
   * Data the course's visuals need on a page (e.g. English nouns, Arabic letters), read at build
   * time and handed to the client through VisualDataProvider. `visualIds` are the visuals the
   * page can show; return undefined when none needs data.
   */
  visualData?: (visualIds: Set<string>) => unknown;
  /** Data for a rung page's ladder.RungExtra (e.g. Mandarin's deck size), at build time. */
  rungData?: (rung: Rung) => unknown;
  /** Data for My words (e.g. English nouns for the a/an badge), given the glossaries shown. */
  wordData?: (summaries: LessonSummary[]) => unknown;
  meta?: {
    /** Page titles use the target title ('target', default) or the Indonesian one ('id'). */
    title?: 'target' | 'id';
  };
  check?: {
    /** Whether a live rung must have a test pool (English: from 8 lessons). Default: always. */
    requiresTestPool?: (rung: Rung, lessonCount: number) => boolean;
    /** Live rungs must have exactly `rung.lessons` lesson files (notch counts from data). */
    lessonCountMatchesCurriculum?: boolean;
    /** Extra per-lesson checks (file is the raw source). */
    lesson?: (l: Lesson, where: string, ctx: CheckContext, file: string) => void;
    /** Everything else: data files, capstones, placement, the course's language lint. */
    extra?: (ctx: CheckContext) => void;
  };
};

export type Content = ReturnType<typeof createContent>;

/** Production builds show reviewed lessons only, unless drafts are explicitly enabled. */
export function showDrafts(): boolean {
  return (
    process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'
  );
}

/** A line as quoted on the continue card. */
const quoteOf = (line: Line): Quote =>
  line.translit ? { text: stripMarkup(line.text), tr: stripMarkup(line.translit) } : { text: stripMarkup(line.text) };

export function createContent(model: ContentModel, contentDir = path.join(process.cwd(), 'content')) {
  if (model.itemTypes) registerItemTypes(model.itemTypes);
  for (const [type, fn] of Object.entries(model.itemText ?? {})) overrideItemText(type, fn);
  const yamlOpts = model.yaml === 'json' ? { schema: yaml.JSON_SCHEMA } : undefined;
  const readYaml = (file: string): unknown => yaml.load(fs.readFileSync(path.join(contentDir, file), 'utf8'), yamlOpts);
  const exists = (file: string) => fs.existsSync(path.join(contentDir, file));
  const { adapter } = model;

  let curriculumCache: Rung[] | null = null;
  function getCurriculum(): Rung[] {
    if (!curriculumCache) curriculumCache = model.schemas.curriculum.parse(readYaml('curriculum.yaml')).rungs;
    return curriculumCache;
  }

  function getRung(id: string): Rung | undefined {
    return getCurriculum().find((r) => r.id === id);
  }

  function lessonFiles(rungId: string): string[] {
    const dir = path.join(contentDir, rungId);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => /^\d{2}-[a-z0-9-]+\.md$/.test(f))
      .sort();
  }

  function parseLessonFile(rungId: string, file: string): Lesson {
    const raw = fs.readFileSync(path.join(contentDir, rungId, file), 'utf8');
    const { data, content } = matter(raw, {
      engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
    });
    const fm = model.schemas.lesson.parse(data);
    const sections = parseSections(content, `${rungId}/${file}`);
    return { ...fm, ...sections, slug: file.replace(/\.md$/, '') } as Lesson;
  }

  const lessonCache = new Map<string, Lesson[]>();
  function getLessons(rungId: string, opts: { includeDrafts?: boolean } = {}): Lesson[] {
    if (!lessonCache.has(rungId)) {
      lessonCache.set(
        rungId,
        lessonFiles(rungId)
          .map((f) => parseLessonFile(rungId, f))
          .sort((a, b) => a.order - b.order),
      );
    }
    const all = lessonCache.get(rungId)!;
    const drafts = opts.includeDrafts ?? showDrafts();
    return all.filter((l) => drafts || l.status === 'reviewed');
  }

  function getLesson(rungId: string, slug: string): Lesson | undefined {
    return getLessons(rungId).find((l) => l.slug === slug);
  }

  function summarize(l: Lesson): LessonSummary {
    const a = adapter.lesson;
    const first = a.lead?.(l) ?? a.examples(l)[0];
    const worked = a.worked(l)?.[0] ?? first;
    return {
      id: l.id,
      slug: l.slug,
      rung: l.rung,
      order: l.order,
      status: l.status,
      minutes: l.minutes,
      title: a.title(l),
      keyword: a.keyword?.(l) ?? null,
      checkIds: l.check.map((c) => c.id),
      resume: [
        quoteOf(first),
        quoteOf(worked),
        quoteOf(first),
        quoteOf(a.pair(l).natural),
        { text: stripMarkup(itemText(l.check[0])) },
        { text: stripMarkup(a.closing(l)) },
      ],
      checkTexts: l.check.map((c) => ({ text: stripMarkup(itemText(c)) })),
      glossary: a.glossary(l),
    };
  }

  /** Every lesson summary across all rungs (respecting draft visibility). */
  function getAllSummaries(): LessonSummary[] {
    return getCurriculum().flatMap((r) => getLessons(r.id).map(summarize));
  }

  function getTestPool(rungId: string): TestPool | null {
    if (!exists(`${rungId}/test.yaml`)) return null;
    return model.schemas.testPool.parse(readYaml(`${rungId}/test.yaml`));
  }

  function getReading(rungId: string): Reading | null {
    if (!model.schemas.reading || !exists(`${rungId}/reading.yaml`)) return null;
    return model.schemas.reading.parse(readYaml(`${rungId}/reading.yaml`));
  }

  function getDialogue(rungId: string): Dialogue | null {
    if (!model.schemas.dialogue || !exists(`${rungId}/dialogue.yaml`)) return null;
    return model.schemas.dialogue.parse(readYaml(`${rungId}/dialogue.yaml`));
  }

  function getPlacement(): Placement | null {
    if (!model.schemas.placement || !exists('placement.yaml')) return null;
    return model.schemas.placement.parse(readYaml('placement.yaml'));
  }

  /** Visual data for a page that can show these visual ids (lesson visual, scene items). */
  function visualDataFor(ids: Iterable<string>): unknown {
    return model.visualData?.(new Set(ids));
  }

  return {
    model,
    adapter,
    contentDir,
    readYaml,
    exists,
    getCurriculum,
    getRung,
    lessonFiles,
    parseLessonFile,
    getLessons,
    getLesson,
    summarize,
    getAllSummaries,
    getTestPool,
    getReading,
    getDialogue,
    getPlacement,
    visualDataFor,
  };
}

/** Visual ids a set of items can show (scene items). */
export function sceneVisualIds(items: CheckItem[]): string[] {
  return items.flatMap((i) => (i.type === 'scene' ? [i.visual.id] : []));
}
