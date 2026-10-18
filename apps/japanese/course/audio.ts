// Build-time only: everything the course can play, keyed as CourseConfig.audio keys it (CLAUDE.md §7.7).
// Used by `npm run audio:list` (what to record) and content:check (live rungs' kana are recorded).
import { stripMarkup } from '@ladder/core/lib/markup';
import { KANA_MORAE, isKanaKey, isPairKey, jaAudioKey, kanaKey, pairKey, recordingStem, soundAudio, spokenJa } from '@/lib/ja/audio';
import { toPlain } from '@/lib/ja/text';
import { getCurriculum, getDialogue, getLessons, getPlacement, getReading, getTestPool } from './content';
import type { CheckItem, Lesson, Rung } from './types';

export type AudioRow = {
  /** Manifest key. */
  key: string;
  /** The recording's file name, without extension (ASCII). */
  file: string;
  /** What to read: the plain Japanese, and its kana reading. */
  text: string;
  kana: string;
  /** single kana | pair (minimal or pitch pair, no speech fallback) | text */
  kind: 'kana' | 'pair' | 'text';
  where: string;
};

/** What an item plays. */
function itemAudio(c: CheckItem): string[] {
  if (c.type === 'listen') return [c.audio];
  if (c.type === 'kana') return c.audio ? [c.audio] : [];
  if (c.type === 'mora' || c.type === 'pitch') return [pairKey(c.audio)];
  return [];
}

/** Every string a lesson plays. */
export function lessonAudio(l: Lesson): string[] {
  return [
    ...l.examples.map((e) => e.ja),
    ...(l.worked ?? []).map((e) => e.ja),
    l.pair.natural.ja,
    ...(l.sound ? l.sound.words.map((w) => soundAudio(l.sound!.kind, w)) : []),
    ...(l.polite?.rows ?? []).map((r) => r.ja),
    ...(l.work?.lines ?? []).map((t) => t.ja),
    ...(l.talk?.lines ?? []).map((t) => t.ja),
    l.tirukan.ja,
    ...l.glossary.map((g) => g.ja),
    ...l.check.flatMap(itemAudio),
  ];
}

/**
 * Every recording the given rungs need, deduplicated by key: their lessons (drafts included), test
 * pools, readings and dialogues; the placement check and the whole kana set when a Kana rung is in.
 */
export function allAudio(rungs: Rung[] = getCurriculum().filter((r) => r.status === 'live')): AudioRow[] {
  const rows = new Map<string, AudioRow>();
  const add = (s: string, where: string) => {
    const key = jaAudioKey(s);
    const prev = rows.get(key);
    // A word played both on its own and as a pair is a pair: it must be recorded.
    if (prev) {
      if (isPairKey(s) && prev.kind === 'text') prev.kind = 'pair';
      return;
    }
    const kind = isKanaKey(key) ? 'kana' : isPairKey(s) ? 'pair' : 'text';
    const plain = kind === 'kana' ? key.slice(5) : toPlain(stripMarkup(s.replace(/^pair:/, '')));
    rows.set(key, { key, file: recordingStem(key), text: plain, kana: spokenJa(s), kind, where });
  };
  for (const r of rungs) {
    for (const l of getLessons(r.id, { includeDrafts: true })) for (const s of lessonAudio(l)) add(s, `${r.id}/${l.slug}`);
    for (const c of getTestPool(r.id)?.items ?? []) for (const s of itemAudio(c)) add(s, `${r.id}/test`);
    const reading = getReading(r.id);
    if (reading) {
      reading.lines.forEach((x) => add(x.ja, `${r.id}/reading`));
      reading.glossary.forEach((g) => add(g.ja, `${r.id}/reading`));
      reading.items.forEach((c) => itemAudio(c).forEach((s) => add(s, `${r.id}/reading`)));
    }
    const dialogue = getDialogue(r.id);
    if (dialogue) {
      dialogue.lines.forEach((x) => add(x.ja, `${r.id}/dialogue`));
      dialogue.items.forEach((c) => itemAudio(c).forEach((s) => add(s, `${r.id}/dialogue`)));
    }
  }
  // The kana chart plays every kana; the placement check opens the course.
  if (rungs.some((r) => r.tier === 'kana')) {
    for (const k of KANA_MORAE) add(kanaKey(k), 'kana chart');
    for (const c of getPlacement()?.items ?? []) for (const s of itemAudio(c)) add(s, 'placement');
  }
  return [...rows.values()];
}
