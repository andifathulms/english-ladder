// Build-time only: Japanese Ladder's content model — schemas, adapter, lesson data and check hooks.
// Never import this file from a client component.
import fs from 'node:fs';
import path from 'node:path';
import { createContent, type ContentModel } from '@ladder/core/lib/content/load';
import { configureAudio } from '@ladder/core/lib/speech/audio';
import { normJa } from '@/lib/ja/text';
import { jaAudioKey, speechFallback, spokenJa } from '@/lib/ja/audio';
import { adapter } from './adapter';
import { answerText, itemText, itemTypes } from './items';
import { wordFacts } from './words';
// Circular (decks reads lessons through this module); used only inside functions, after both load.
import { decksData, deckLevels, kanjiDeck, wordDeck, wordIdOf } from './decks';
import { CurriculumSchema, DialogueSchema, KanaFileSchema, LessonFrontmatterSchema, NamesSchema, PlacementSchema, ReadingSchema, TestPoolSchema } from './schema';
import { lintLessons, type LintData } from './lint';
// Circular (audio reads lessons through this module); used only inside check.extra, after both load.
import { allAudio } from './audio';
import { toHiragana } from '@/lib/ja/kana';
import { parseRuby, toKana, toPlain } from '@/lib/ja/text';
import type { Counter } from '@/lib/ja/counters';
import type { KanaData } from '@/lib/ja/kanaTable';
import type { Dialogue, JaKanjiCard, JaLessonData, Lesson, Placement, Reading, Rung, TestPool } from './types';

// Audio keys (audio:list, the manifest check) use the same scheme as the app.
configureAudio({ normalise: normJa, key: jaAudioKey, spoken: spokenJa, speechFallback });

const jl = (l: unknown) => l as Lesson;

const vendor = <T>(f: string): T => JSON.parse(fs.readFileSync(path.join(content.contentDir, 'data', 'vendor', f), 'utf8')) as T;

/** Proper names allowed without a list entry (content/data/names.yaml). */
export const getNames = () => (content.exists('data/names.yaml') ? NamesSchema.parse(content.readYaml('data/names.yaml')) : []);
export const getCounters = () => (content.exists('data/counters.yaml') ? (content.readYaml('data/counters.yaml') as Counter[]) : []);
/** The kana grid (content/data/kana.yaml), validated. */
export const getKana = (): KanaData => KanaFileSchema.parse(content.readYaml('data/kana.yaml'));
export const getGrammar = () => (content.exists('data/grammar.yaml') ? (content.readYaml('data/grammar.yaml') as { id: string; level: string }[]) : []);

let pitchCache: Record<string, number[]> | null = null;
const vendorPitch = () => (pitchCache ??= vendor<Record<string, number[]>>('pitch.json'));

type VendorKanji = { char: string; strokes: number; on: string[]; kun: string[]; meanings: string[] };
let kanjiCache: Map<string, VendorKanji> | null = null;
const vendorKanji = () => (kanjiCache ??= new Map(vendor<VendorKanji[]>('kanji.json').map((k) => [k.char, k])));
/** Indonesian kanji meanings (authored; content/data/kanji-id.yaml). */
const kanjiId = () => (content.exists('data/kanji-id.yaml') ? (content.readYaml('data/kanji-id.yaml') as Record<string, string>) : {});

function kanjiCard(char: string, lesson: Lesson): JaKanjiCard {
  const k = vendorKanji().get(char);
  const id = kanjiId()[char];
  const en = k?.meanings.slice(0, 2).join(', ') ?? '';
  return {
    char,
    strokes: k?.strokes ?? 0,
    on: (k?.on ?? []).slice(0, 3),
    kun: (k?.kun ?? []).filter((r) => !r.startsWith('-') && !r.endsWith('-')).slice(0, 3),
    meaning: id ? { text: id, lang: 'id', en } : { text: en, lang: 'en' },
    words: [...new Set(lesson.glossary.map((g) => toPlain(g.ja)).filter((w) => w.includes(char)))],
  };
}

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
  const pitch = new Map(Object.entries(vendorPitch()));
  lintCache = { jmdict, kanji, words, names, counters: getCounters(), grammar: new Set(getGrammar().map((g) => g.id)), pitch };
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
  wordData: (summaries) => wordFacts(summaries),
  // The words page's Kartu kata and Kartu kanji: one deck each per JLPT level with lessons.
  wordsPageData: () => decksData(),
  // Rung pages of a level with decks link to them.
  rungData: (r) => {
    const level = (r as unknown as Rung).jlpt;
    if (!deckLevels().some((d) => d.level === level)) return null;
    return { level, words: wordDeck(level).length, kanji: kanjiDeck(level).length };
  },
  // The kana grid for KanaChart and KanaOrigins; counter readings for Counters.
  visualData: (ids) => ({
    ...(ids.has('kana-chart') || ids.has('kana-origins') ? { kana: getKana() } : {}),
    ...(ids.has('counters') ? { counters: getCounters() } : {}),
  }),
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
      wordIds: lesson.glossary.flatMap((g) => wordIdOf(g) ?? []),
      kanjiIds: (lesson.kanji ?? []).map((k) => `k-${k}`),
      kanjiCards: (lesson.kanji ?? []).map((k) => kanjiCard(k, lesson)),
      pitch: Object.fromEntries(
        (lesson.sound?.words ?? []).flatMap((w) => {
          const plain = parseRuby(w.ja).map((x) => x.plain).join('');
          const a = vendorPitch()[`${plain}|${toHiragana(w.kana)}`] ?? vendorPitch()[`${plain}|${w.kana}`];
          return a ? [[plain, a[0]]] : [];
        }),
      ),
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
      // Every character a learner traces or opens stroke order for has a KanjiVG stroke file (npm run strokes:extract).
      const strokeFile = (ch: string) => fs.existsSync(path.join(process.cwd(), 'public', 'strokes', `${ch.codePointAt(0)!.toString(16)}.json`));
      for (const lessons of ctx.lessonsByRung.values())
        for (const l of lessons as unknown as Lesson[]) {
          const chars = [...(l.kanji ?? []), ...l.check.filter((c) => c.type === 'trace').map((c) => (c as { char: string }).char)];
          for (const ch of chars) if (!strokeFile(ch)) ctx.err(`${l.id}: no stroke file for ${ch} (run npm run strokes:extract)`);
        }
      // Live rungs' kana and pair words are recorded: they never fall back to speech (CLAUDE.md §11).
      const manifestFile = path.join(process.cwd(), 'public', 'audio', 'manifest.json');
      const recorded = fs.existsSync(manifestFile) ? (JSON.parse(fs.readFileSync(manifestFile, 'utf8')) as Record<string, unknown>) : {};
      const live = (ctx.rungs as unknown as Rung[]).filter((r) => r.status === 'live');
      const unrecorded = allAudio(live).filter((a) => a.kind !== 'text' && !recorded[a.key]);
      if (unrecorded.length) ctx.err(`${unrecorded.length} kana and pair recordings missing on live rungs (npm run audio:list -- --kana): ${unrecorded.slice(0, 12).map((a) => a.text).join(' ')}${unrecorded.length > 12 ? ' …' : ''}`);
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
