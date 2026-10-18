// Build-time only: Japanese Ladder's content model — schemas, adapter, lesson data and check hooks.
// Never import this file from a client component.
import fs from 'node:fs';
import path from 'node:path';
import { createContent, type ContentModel } from '@ladder/core/lib/content/load';
import { configureAudio } from '@ladder/core/lib/speech/audio';
import { normJa } from '@/lib/ja/text';
import { isKanaKey, jaAudioKey, spokenJa } from '@/lib/ja/audio';
import { adapter } from './adapter';
import { answerText, itemText, itemTypes } from './items';
import { CurriculumSchema, DialogueSchema, LessonFrontmatterSchema, NamesSchema, PlacementSchema, ReadingSchema, TestPoolSchema } from './schema';
import { lintLessons, type LintData } from './lint';
import { toHiragana } from '@/lib/ja/kana';
import { parseRuby, toKana } from '@/lib/ja/text';
import type { Counter } from '@/lib/ja/counters';
import type { Dialogue, JaLessonData, Lesson, Placement, Reading, Rung, TestPool } from './types';

// Audio keys (audio:list, the manifest check) use the same scheme as the app.
configureAudio({ normalise: normJa, key: jaAudioKey, spoken: spokenJa, speechFallback: (t) => !isKanaKey(t) });

const jl = (l: unknown) => l as Lesson;

const vendor = <T>(f: string): T => JSON.parse(fs.readFileSync(path.join(content.contentDir, 'data', 'vendor', f), 'utf8')) as T;

/** Proper names allowed without a list entry (content/data/names.yaml). */
export const getNames = () => (content.exists('data/names.yaml') ? NamesSchema.parse(content.readYaml('data/names.yaml')) : []);
export const getCounters = () => (content.exists('data/counters.yaml') ? (content.readYaml('data/counters.yaml') as Counter[]) : []);
export const getGrammar = () => (content.exists('data/grammar.yaml') ? (content.readYaml('data/grammar.yaml') as { id: string; level: string }[]) : []);

let lintCache: LintData | null = null;
/** The imported data the lint checks readings and inventory against. */
function lintData(): LintData {
  if (lintCache) return lintCache;
  const jmdict = new Map<string, Set<string>>();
  for (const e of vendor<{ k: string[]; r: string[] }[]>('jmdict.json')) {
    for (const k of e.k) {
      const set = jmdict.get(k) ?? new Set<string>();
      for (const r of e.r) set.add(toHiragana(r));
      jmdict.set(k, set);
    }
  }
  const kanji = new Map<string, { readings: Set<string>; jlpt: string | null }>();
  for (const k of vendor<{ char: string; jlpt: string | null; on: string[]; kun: string[] }[]>('kanji.json')) {
    const readings = new Set([...k.on.map(toHiragana), ...k.kun.map((r) => r.replace(/^-|-$/g, '').split('.')[0])].filter(Boolean));
    kanji.set(k.char, { readings, jlpt: k.jlpt });
  }
  const words = new Map<string, string>();
  for (const w of vendor<{ ja: string; kana: string; alt?: string[]; jlpt: string }[]>('jlpt-words.json')) {
    for (const kana of [w.kana, ...(w.alt ?? [])]) {
      const key = `${w.ja}|${kana}`;
      if (!words.has(key)) words.set(key, w.jlpt);
      if (!words.has(kana)) words.set(kana, w.jlpt);
    }
  }
  const names = new Set(getNames().map((n) => parseRuby(n.ja).map((w) => w.plain).join('')));
  lintCache = { jmdict, kanji, words, names, counters: getCounters(), grammar: new Set(getGrammar().map((g) => g.id)) };
  return lintCache;
}

/** Kanji introduced by the lessons of a rung up to and including `order` (and earlier rungs). */
function kanjiUpTo(rungId: string, order = Infinity): string[] {
  const rungs = getCurriculum();
  const upTo = rungs.findIndex((r) => r.id === rungId);
  const out = new Set<string>();
  for (const r of rungs.slice(0, upTo + 1)) {
    for (const l of getLessons(r.id, { includeDrafts: true })) {
      if (r.id === rungId && l.order > order) continue;
      for (const k of l.kanji ?? []) out.add(k);
    }
  }
  return [...out];
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
  meta: { title: 'id' },
  lessonData: (l): JaLessonData => {
    const lesson = jl(l);
    const recent = getLessons(lesson.rung, { includeDrafts: true })
      .filter((x) => x.order <= lesson.order && x.order > lesson.order - 3)
      .flatMap((x) => x.kanji ?? []);
    return {
      order: lesson.order,
      kanaNew: lesson.kana_new ?? [],
      rungKanji: kanjiUpTo(lesson.rung),
      recentKanji: [...new Set(recent)],
      wordIds: [],
    };
  },
  check: {
    lessonCountMatchesCurriculum: true,
    extra: (ctx) => {
      // Dialogues
      for (const rung of ctx.rungs) {
        if (!content.exists(`${rung.id}/dialogue.yaml`)) continue;
        try {
          const d = getDialogue(rung.id)!;
          if (d.rung !== rung.id) ctx.err(`${rung.id}/dialogue.yaml: rung "${d.rung}" does not match folder`);
          for (const item of d.items) ctx.claim(item.id, `${rung.id}/dialogue.yaml`);
          for (const line of [d.title, ...d.lines]) if (toKana(line.ja) !== line.kana) ctx.err(`${rung.id}/dialogue.yaml: kana "${line.kana}" ≠ the ruby readings "${toKana(line.ja)}"`);
        } catch (e) {
          ctx.err(`${rung.id}/dialogue.yaml: ${(e as Error).message}`);
        }
      }
      // Readings: the kana of each line matches its ruby.
      for (const rung of ctx.rungs) {
        const r = content.exists(`${rung.id}/reading.yaml`) ? getReading(rung.id) : null;
        for (const line of r ? [r.title, ...r.lines] : []) if (toKana(line.ja) !== line.kana) ctx.err(`${rung.id}/reading.yaml: kana "${line.kana}" ≠ the ruby readings "${toKana(line.ja)}"`);
      }
      // Placement (PRD §5.2): 20 items in six sections; 17+ and 12+.
      if (content.exists('placement.yaml')) {
        try {
          const p = getPlacement()!;
          for (const item of p.items) {
            ctx.claim(item.id, 'placement.yaml');
            if (item.from && !ctx.allLessonIds.has(item.from)) ctx.err(`placement.yaml: ${item.id}: from "${item.from}" is not a lesson`);
          }
          const count = (s: string) => p.items.filter((i) => i.section === s).length;
          const want = { hiragana: 6, katakana: 4, dakuten: 3, ear: 3, typing: 2, kanji: 2 };
          for (const [s, n] of Object.entries(want)) if (count(s) !== n) ctx.err(`placement.yaml: ${count(s)} ${s} items, want ${n}`);
          if (!(p.thresholds.easy1 > p.thresholds.kana2)) ctx.err('placement.yaml: thresholds.easy1 must be above thresholds.kana2');
        } catch (e) {
          ctx.err(`placement.yaml: ${(e as Error).message}`);
        }
      }
      // Japanese lint: readings, inventory, kanji, register, the Kana 1 script rule, reviewers, sizes.
      for (const f of lintLessons(ctx.rungs as unknown as Rung[], ctx.lessonsByRung as unknown as Map<string, Lesson[]>, lintData())) (f.level === 'error' ? ctx.err : ctx.warn)(f.message);
    },
  },
};

export const content = createContent(model);

// Typed loaders for Japanese's own pages, scripts and lint.
export const CONTENT_DIR = content.contentDir;
export const getCurriculum = () => content.getCurriculum() as unknown as Rung[];
export const getLessons = (rungId: string, opts?: { includeDrafts?: boolean }) => content.getLessons(rungId, opts) as unknown as Lesson[];
export const getTestPool = (rungId: string) => content.getTestPool(rungId) as unknown as TestPool | null;
export const getReading = (rungId: string) => content.getReading(rungId) as unknown as Reading | null;
export const getDialogue = (rungId: string) => content.getDialogue(rungId) as unknown as Dialogue | null;
export const getPlacement = () => content.getPlacement() as unknown as Placement | null;
