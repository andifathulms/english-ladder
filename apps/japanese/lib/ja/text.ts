// Japanese text: ruby markup, plain and kana forms, normalisation (docs/japanese/CLAUDE.md §5.2, §7.1).
//
// Markup in `ja`:
//   {漢字|かん|じ}  per-character readings (one reading per kanji)
//   {箱|はこ}       a single kanji
//   {今日|=きょう}  a word read as a whole (jukujikun); a multi-kanji group with one reading is too
//   [[…]]          the lesson's focus; may wrap a ruby group
// Words are separated by single spaces; punctuation is its own token. Okurigana sit outside the
// braces: {食|た}べる.

/** A run of text inside a word: plain kana/Latin, or a kanji group with its reading(s). */
export type Seg = {
  text: string;
  /** Per-character readings (same length as the kanji), or one reading for the whole group. */
  ruby?: string[];
  /** The reading covers the whole group (jukujikun). */
  whole?: boolean;
  focus: boolean;
};

export type Word = {
  segs: Seg[];
  /** Display text without markup. */
  plain: string;
  /** Reading: kana as written, kanji as their ruby. */
  kana: string;
  /** A lone particle token (は へ を are then said wa e o). */
  isParticle: boolean;
  /** Punctuation only. */
  isPunct: boolean;
};

const KANJI = /[㐀-䶿一-鿿豈-﫿々〆]/u;
const KANJI_G = /[㐀-䶿一-鿿豈-﫿々〆]/gu;
const KANA = /[぀-ゟ゠-ヿㇰ-ㇿｦ-ﾟ]/u;
export const PUNCT = /^[、。，．！？「」『』（）・…ー〜：；,.!?:;"'()\-~]+$/u;
const PARTICLES = new Set(['は', 'へ', 'を', 'が', 'に', 'で', 'と', 'も', 'の', 'か', 'や', 'ね', 'よ', 'から', 'まで', 'より']);

export const isKanji = (ch: string) => KANJI.test(ch);
export const hasKanji = (s: string) => KANJI.test(s);
export const hasKana = (s: string) => KANA.test(s);
export const hasJapanese = (s: string) => hasKanji(s) || hasKana(s);
export const kanjiOf = (s: string) => s.match(KANJI_G) ?? [];

/** Splits one word token into segments (handles [[…]] and {…|…}). */
function parseWord(token: string): Seg[] {
  const segs: Seg[] = [];
  let focus = false;
  let i = 0;
  let buf = '';
  const flush = () => {
    if (buf) segs.push({ text: buf, focus });
    buf = '';
  };
  while (i < token.length) {
    if (token.startsWith('[[', i)) {
      flush();
      focus = true;
      i += 2;
    } else if (token.startsWith(']]', i)) {
      flush();
      focus = false;
      i += 2;
    } else if (token[i] === '{') {
      flush();
      const end = token.indexOf('}', i);
      if (end < 0) throw new Error(`unclosed ruby in "${token}"`);
      const [base, ...rest] = token.slice(i + 1, end).split('|');
      if (!rest.length) throw new Error(`ruby without reading in "${token}"`);
      const chars = [...base];
      if (rest.length === 1 && rest[0].startsWith('=')) segs.push({ text: base, ruby: [rest[0].slice(1)], whole: true, focus });
      else if (rest.length === chars.length) segs.push({ text: base, ruby: rest, focus });
      else if (rest.length === 1) segs.push({ text: base, ruby: rest, whole: chars.length > 1, focus });
      else throw new Error(`ruby "${token.slice(i, end + 1)}": ${rest.length} readings for ${chars.length} characters`);
      i = end + 1;
    } else {
      buf += token[i];
      i++;
    }
  }
  flush();
  return segs;
}

/** Parses a `ja` line into words. */
export function parseRuby(ja: string): Word[] {
  return ja
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const segs = parseWord(token);
      const plain = segs.map((s) => s.text).join('');
      const kana = segs.map((s) => (s.ruby ? s.ruby.join('') : s.text)).join('');
      return { segs, plain, kana, isParticle: PARTICLES.has(plain), isPunct: PUNCT.test(plain) };
    });
}

/** Display text without markup or spaces. */
export const toPlain = (ja: string) => parseRuby(ja).map((w) => w.plain).join('');

/** The full reading, word tokens separated by single spaces (the shape of the `kana` field). */
export const toKana = (ja: string) =>
  parseRuby(ja)
    .map((w) => w.kana)
    .join(' ');

const FULL: Record<string, string> = { ',': '、', '.': '。', '!': '！', '?': '？', ':': '：', ';': '；', '(': '（', ')': '）', '~': '〜' };

/**
 * Japanese for grading and audio keys: markup removed, NFKC (full/half width), punctuation unified
 * (ASCII , . ! ? count as 、。！？), all whitespace removed.
 */
export function normJa(s: string): string {
  const unmarked = /[{[]/.test(s) ? toPlainLoose(s) : s;
  return unmarked
    .normalize('NFKC')
    .replace(/[,.!?:;()~]/g, (c) => FULL[c] ?? c)
    .replace(/\s+/g, '');
}

/** Markup removed without validating it (normJa must never throw on learner input). */
function toPlainLoose(s: string): string {
  return s.replace(/\[\[|\]\]/g, '').replace(/\{([^|}]*)\|[^}]*\}/g, '$1');
}
