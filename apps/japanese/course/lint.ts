// Build-time only: Japanese Ladder's content lint (docs/japanese/CLAUDE.md §6). Errors in reviewed
// lessons, warnings in drafts, except where the rule is mechanical (markup, kana = ruby readings, no
// romaji, Kana 1 kanji), which is an error either way.
import { kanjiOf, parseRuby, toKana, type Word } from '@/lib/ja/text';
import { morae, toHiragana } from '@/lib/ja/kana';
import { conjugate, type Target, type WordType } from '@/lib/ja/conjugate';
import { counterReadings, type Counter } from '@/lib/ja/counters';
import type { CheckItem, GlossaryEntry, Lesson, Rung } from './types';

export type Finding = { level: 'error' | 'warn'; message: string };

export type LintData = {
  /** JMdict subset: kanji spellings → readings (hiragana). */
  jmdict: Map<string, Set<string>>;
  /** KANJIDIC2: kanji → on (hiragana) and kun (stem before the dot, hiragana) readings. */
  kanji: Map<string, { readings: Set<string>; jlpt: string | null }>;
  /** JLPT word lists: "ja|kana" and "kana" keys → level. */
  words: Map<string, string>;
  names: Set<string>;
  counters: Counter[];
  /** Inventory ids (content/data/grammar.yaml). */
  grammar: Set<string>;
  /** Tokyo accent numbers ("plain|kana" → [n…]), for pitch items. */
  pitch?: Map<string, number[]>;
};

/** Checks for the Japanese item types (kana, mora, pitch, form). */
export function lintItem(c: CheckItem, data: LintData, types: Map<string, string>): string[] {
  const out: string[] = [];
  const plainOf = (s: string) => parseRuby(s).map((w) => w.plain).join('');
  if (c.type === 'kana') {
    for (const a of [c.answer, ...(c.accept ?? [])]) if (!/^[\u3040-\u30ffー]+$/u.test(a)) out.push(`kana answer "${a}" must be kana only`);
    if (c.audio && !c.audio.startsWith('kana-') && toHiragana(toKana(c.audio).replace(/\s+/g, '')) !== toHiragana(c.answer) && c.script !== 'katakana') {
      out.push(`kana answer "${c.answer}" does not match the audio's reading "${toKana(c.audio)}"`);
    }
  }
  if (c.type === 'mora' && c.ask === 'count') {
    const n = morae(toKana(c.audio)).length;
    if (String(n) !== c.answer) out.push(`mora count: "${toKana(c.audio)}" has ${n} beats, the answer says ${c.answer}`);
  }
  if (c.type === 'pitch' && data.pitch) {
    for (const w of c.pair) {
      const known = data.pitch.get(`${plainOf(w.ja)}|${w.kana}`);
      if (known && !known.includes(w.pitch)) out.push(`pitch: ${plainOf(w.ja)} is ${known.join('/')} in the pitch data, not ${w.pitch}`);
    }
  }
  if (c.type === 'form') {
    const type = types.get(plainOf(c.word));
    if (type && ['verb-1', 'verb-2', 'verb-3', 'adj-i', 'adj-na'].includes(type)) {
      try {
        const want = conjugate(plainOf(c.word), type as WordType, c.target as Target);
        const given = [c.answer, ...(c.accept ?? [])].map(plainOf);
        if (!given.includes(want)) out.push(`form: the rules give ${want} for ${plainOf(c.word)} → ${c.target}, the answer says ${plainOf(c.answer)}`);
      } catch (e) {
        out.push(`form: ${(e as Error).message}`);
      }
    }
  }
  return out;
}

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
/** Rungs where every example sentence is polite (casual from Easy 3; CLAUDE.md §6.2). */
const POLITE_ONLY = new Set(['kana-1', 'kana-2', 'easy-1', 'easy-2']);
const LATIN = /[A-Za-z]/;
const POLITE_END = /(です|ます|ません|ました|ませんでした|ましょう|でした|ください|か|ね|よ|ねえ|でしょう)$/u;
const PLAIN_END = /(だ|る|た|う|く|ぐ|す|つ|ぬ|ぶ|む|ない|かった)$/u;

/** Readings a kanji may take inside a word: on and kun, with rendaku and a small っ allowed. */
function readingFits(kanji: string, reading: string, data: LintData): boolean {
  const k = data.kanji.get(kanji);
  if (!k) return true;
  const voiced: Record<string, string> = { か: 'が', き: 'ぎ', く: 'ぐ', け: 'げ', こ: 'ご', さ: 'ざ', し: 'じ', す: 'ず', せ: 'ぜ', そ: 'ぞ', た: 'だ', ち: 'ぢ', つ: 'づ', て: 'で', と: 'ど', は: 'ば', ひ: 'び', ふ: 'ぶ', へ: 'べ', ほ: 'ぼ' };
  const half: Record<string, string> = { は: 'ぱ', ひ: 'ぴ', ふ: 'ぷ', へ: 'ぺ', ほ: 'ぽ' };
  for (const r of k.readings) {
    const forms = [r, r.slice(0, -1) + 'っ'];
    for (const f of forms) {
      if (reading === f) return true;
      const first = f[0];
      if (voiced[first] && reading === voiced[first] + f.slice(1)) return true;
      if (half[first] && reading === half[first] + f.slice(1)) return true;
    }
  }
  return false;
}

/** The reading of every kanji group in a word must fit JMdict (whole word) or KANJIDIC2 (per kanji). */
function checkWordReadings(w: Word, data: LintData): string[] {
  const out: string[] = [];
  const kanjiSegs = w.segs.filter((s) => s.ruby);
  if (!kanjiSegs.length) return out;
  // The whole word as a dictionary spelling (nouns, and verbs or adjectives in dictionary form).
  const dict = data.jmdict.get(w.plain);
  if (dict) {
    if (!dict.has(toHiragana(w.kana))) out.push(`"${w.plain}" is read ${[...dict].join('/')} in JMdict, not ${w.kana}`);
    return out;
  }
  for (const s of kanjiSegs) {
    if (s.whole) {
      const d = data.jmdict.get(s.text);
      if (!d || !d.has(toHiragana(s.ruby![0]))) out.push(`"${s.text}" read as a whole (${s.ruby![0]}) is not a JMdict reading`);
      continue;
    }
    [...s.text].forEach((c, i) => {
      if (!readingFits(c, toHiragana(s.ruby![i]), data)) out.push(`${c} read ${s.ruby![i]} in "${w.plain}" is not a KANJIDIC2 reading`);
    });
  }
  return out;
}

/** Japanese strings of a check item (for markup, reading and romaji checks). */
function itemJapanese(c: CheckItem): string[] {
  const out: string[] = [];
  const add = (s?: string) => {
    if (s && /[぀-ヿ㐀-鿿]/u.test(s)) out.push(s);
  };
  if ('prompt' in c) add(c.prompt);
  if ('options' in c && c.options) (c.options as string[]).forEach(add);
  if ('wrong' in c) add(c.wrong);
  if ('tiles' in c) c.tiles.forEach(add);
  if ('ja' in c) add(c.ja);
  if (c.type === 'pitch') c.pair.forEach((p) => add(p.ja));
  return out;
}

/** Lints every lesson of every rung, in curriculum order. */
export function lintLessons(rungs: Rung[], byRung: Map<string, Lesson[]>, data: LintData): Finding[] {
  const out: Finding[] = [];
  const kanjiSoFar = new Set<string>();
  const kanaSoFar = new Set<string>();
  const glossSoFar = new Set<string>();
  const typesSoFar = new Map<string, string>();

  for (const rung of rungs) {
    const level = rung.jlpt === '—' ? 'N5' : rung.jlpt;
    const lessons = byRung.get(rung.id) ?? [];
    for (const l of lessons) {
      const where = `${rung.id}/${l.slug}`;
      const strict = l.status === 'reviewed';
      const err = (m: string) => out.push({ level: 'error', message: `${where}: ${m}` });
      const rule = (m: string) => out.push({ level: strict ? 'error' : 'warn', message: `${where}: ${m}` });

      // Reviews: drafts never carry review fields (CLAUDE.md §6.10).
      if (l.status === 'draft' && l.review) rule('a draft lesson carries review fields; only the reviewer adds them');
      for (const g of l.introduces) {
        if (!data.grammar.has(g)) err(`introduces "${g}", which is not in content/data/grammar.yaml`);
      }
      for (const k of l.kanji ?? []) kanjiSoFar.add(k);
      for (const k of l.kana_new ?? []) for (const c of k) kanaSoFar.add(c);
      for (const g of l.glossary) {
        glossSoFar.add(g.ja);
        if (g.type) typesSoFar.set(parseRuby(g.ja).map((w) => w.plain).join(''), g.type);
      }
      for (const c of l.check) for (const m of lintItem(c, data, typesSoFar)) rule(`check ${c.id}: ${m}`);

      // Every Japanese line: markup parses, kana = the ruby readings, no romaji, readings fit.
      const lines: { ja: string; kana?: string; what: string }[] = [
        { ja: l.title.ja, kana: l.title.kana, what: 'title' },
        ...l.examples.map((e, i) => ({ ja: e.ja, kana: e.kana, what: `example ${i + 1}` })),
        ...(l.worked ?? []).map((e, i) => ({ ja: e.ja, kana: e.kana, what: `worked ${i + 1}` })),
        { ja: l.pair.natural.ja, kana: l.pair.natural.kana, what: 'pair.natural' },
        { ...l.pair.off, what: 'pair.off' },
        { ja: l.tirukan.ja, kana: l.tirukan.kana, what: 'tirukan' },
        ...(l.talk?.lines ?? []).map((e, i) => ({ ja: e.ja, kana: e.kana, what: `talk ${i + 1}` })),
        ...(l.work?.lines ?? []).map((e, i) => ({ ja: e.ja, kana: e.kana, what: `work ${i + 1}` })),
        ...(l.polite?.rows ?? []).map((e, i) => ({ ja: e.ja, kana: e.kana, what: `polite ${i + 1}` })),
        ...(l.sound?.words ?? []).map((e, i) => ({ ja: e.ja, kana: e.kana, what: `sound ${i + 1}` })),
        ...l.glossary.map((g) => ({ ja: g.ja, kana: g.kana, what: `glossary ${g.ja}` })),
        ...l.check.flatMap((c) => itemJapanese(c).map((ja) => ({ ja, what: `check ${c.id}` }))),
      ];
      for (const line of lines) {
        let words: Word[];
        try {
          words = parseRuby(line.ja);
        } catch (e) {
          err(`${line.what}: ${(e as Error).message}`);
          continue;
        }
        if (LATIN.test(line.ja.replace(/___/g, ''))) err(`${line.what}: Latin letters in Japanese (romaji is never authored)`);
        if (line.kana !== undefined) {
          if (LATIN.test(line.kana)) err(`${line.what}: Latin letters in kana (romaji is never authored)`);
          if (toKana(line.ja) !== line.kana.trim().replace(/\s+/g, ' ')) err(`${line.what}: kana "${line.kana}" ≠ the ruby readings "${toKana(line.ja)}"`);
        }
        // The off half of a pair is wrong on purpose (いちつ for 一つ): only its markup and kana are checked.
        if (line.what !== 'pair.off') for (const w of words) for (const m of checkWordReadings(w, data)) rule(`${line.what}: ${m}`);
        // Counters: readings come from counters.yaml only.
        for (const w of words) {
          const m = /^([一二三四五六七八九十])([本枚匹冊個人時分円])$/u.exec(w.plain);
          if (!m) continue;
          const n = '一二三四五六七八九十'.indexOf(m[1]) + 1;
          const ok = counterReadings(data.counters, m[2], n);
          if (!ok.includes(toHiragana(w.kana))) rule(`${line.what}: ${w.plain} is read ${ok.join('/')}, not ${w.kana}`);
        }
        // Kana 1: no kanji, and only kana taught so far in the lesson's own lines.
        if (rung.id === 'kana-1') {
          if (kanjiOf(line.ja).length) err(`${line.what}: kanji in Kana 1`);
          if (!line.what.startsWith('check') && !line.what.startsWith('glossary') && line.what !== 'title') {
            const unknown = [...new Set([...toKana(line.ja)].filter((c) => /[ぁ-ゖ]/u.test(c) && !kanaSoFar.has(c) && !'ゃゅょぁぃぅぇぉっ'.includes(c)))];
            if (unknown.length) rule(`${line.what}: kana not taught yet: ${unknown.join(' ')}`);
          }
        }
      }

      // Register: polite sentences until Easy 3 (the Sopan card's casual row aside).
      if (POLITE_ONLY.has(rung.id)) {
        for (const e of [...l.examples, ...(l.worked ?? []), ...(l.talk?.lines ?? [])]) {
          const words = parseRuby(e.ja).filter((w) => !w.isPunct);
          if (words.length < 3) continue;
          const last = words[words.length - 1].plain;
          if (!POLITE_END.test(last) && PLAIN_END.test(last)) rule(`plain-form ending "${last}" before Easy 3: "${e.ja}"`);
        }
      }

      // Inventory: glossary words on this level's list or below, a name, or listed in extra.
      const extras = new Set((l.extra ?? []).map((x) => x.ja));
      for (const g of l.glossary as GlossaryEntry[]) {
        const plain = parseRuby(g.ja)
          .map((w) => w.plain)
          .join('');
        const lv = data.words.get(`${plain}|${g.kana}`) ?? data.words.get(g.kana);
        const allowed = lv ? LEVELS.indexOf(lv) <= LEVELS.indexOf(level) : false;
        if (!allowed && !data.names.has(plain) && !extras.has(g.ja) && !extras.has(plain)) {
          rule(`glossary "${plain}" is ${lv ? `on the ${lv} list, above ${level}` : 'on no JLPT list'}; add it to extra: with a reason`);
        }
      }

      // Kanji: reading items (furigana: false) only use kanji the learner has met.
      for (const c of l.check) {
        if (c.furigana !== false) continue;
        const unknown = itemJapanese(c).flatMap(kanjiOf).filter((k) => !kanjiSoFar.has(k));
        if (unknown.length) rule(`check ${c.id}: furigana off on kanji not taught yet: ${[...new Set(unknown)].join(' ')}`);
      }

      // Sizes (CLAUDE.md §6.11).
      if (l.glossary.length < 8 && rung.id !== 'kana-1') rule(`${l.glossary.length} glossary words; aim for 8–16`);
      if (rung.tier === 'easy' && ((l.kanji?.length ?? 0) < 3 || (l.kanji?.length ?? 0) > 8)) rule(`${l.kanji?.length ?? 0} new kanji; Easy lessons introduce 3–8`);
    }
  }
  return out;
}
