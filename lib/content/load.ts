// Build-time only. Never import this file from a client component.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import {
  CurriculumSchema,
  LessonFrontmatterSchema,
  LexiconSchema,
  NounsSchema,
  ReadingSchema,
  TestPoolSchema,
} from './schema';
import { parseSections } from './sections';
import { itemText } from '../check/text';
import { stripMarkup } from '../markup';
import type { Lesson, LessonSummary, Noun, Reading, Rung, TestPool } from '../types';

export const CONTENT_DIR = path.join(process.cwd(), 'content');

const readYaml = (file: string): unknown =>
  yaml.load(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'));

/** Production builds show reviewed lessons only, unless drafts are explicitly enabled. */
export function showDrafts(): boolean {
  return (
    process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'
  );
}

let curriculumCache: Rung[] | null = null;
export function getCurriculum(): Rung[] {
  if (!curriculumCache) curriculumCache = CurriculumSchema.parse(readYaml('curriculum.yaml')).rungs;
  return curriculumCache;
}

export function getRung(id: string): Rung | undefined {
  return getCurriculum().find((r) => r.id === id);
}

export function lessonFiles(rungId: string): string[] {
  const dir = path.join(CONTENT_DIR, rungId);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^\d{2}-[a-z0-9-]+\.md$/.test(f))
    .sort();
}

export function parseLessonFile(rungId: string, file: string): Lesson {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, rungId, file), 'utf8');
  const { data, content } = matter(raw, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
  });
  const fm = LessonFrontmatterSchema.parse(data);
  const sections = parseSections(content, `${rungId}/${file}`);
  return { ...fm, ...sections, slug: file.replace(/\.md$/, '') };
}

const lessonCache = new Map<string, Lesson[]>();
export function getLessons(rungId: string, opts: { includeDrafts?: boolean } = {}): Lesson[] {
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

export function getLesson(rungId: string, slug: string): Lesson | undefined {
  return getLessons(rungId).find((l) => l.slug === slug);
}

export function summarize(l: Lesson): LessonSummary {
  const first = l.examples[0]?.en ?? l.title.en;
  return {
    id: l.id,
    slug: l.slug,
    rung: l.rung,
    order: l.order,
    status: l.status,
    minutes: l.minutes,
    title: l.title,
    checkIds: l.check.map((c) => c.id),
    resume: [
      first,
      stripMarkup(l.worked?.[0]?.en ?? first),
      first,
      l.pair.natural,
      itemText(l.check[0]),
      l.summary.en,
    ].map(stripMarkup),
    checkTexts: l.check.map(itemText),
    glossary: l.glossary,
  };
}

/** Every lesson summary across all rungs (respecting draft visibility). */
export function getAllSummaries(): LessonSummary[] {
  return getCurriculum().flatMap((r) => getLessons(r.id).map(summarize));
}

export function getTestPool(rungId: string): TestPool | null {
  const file = path.join(CONTENT_DIR, rungId, 'test.yaml');
  if (!fs.existsSync(file)) return null;
  return TestPoolSchema.parse(readYaml(`${rungId}/test.yaml`));
}

export function getReading(rungId: string): Reading | null {
  const file = path.join(CONTENT_DIR, rungId, 'reading.yaml');
  if (!fs.existsSync(file)) return null;
  return ReadingSchema.parse(readYaml(`${rungId}/reading.yaml`));
}

export function getNouns(): Noun[] {
  const file = path.join(CONTENT_DIR, 'data', 'nouns.yaml');
  if (!fs.existsSync(file)) return [];
  return NounsSchema.parse(readYaml('data/nouns.yaml'));
}

export function getLexicon(): Record<string, string[]> {
  const file = path.join(CONTENT_DIR, 'lexicon', 'core.yaml');
  if (!fs.existsSync(file)) return {};
  return LexiconSchema.parse(readYaml('lexicon/core.yaml'));
}
