// Kana: script conversion, morae and pitch (docs/japanese/CLAUDE.md §7.1). Pure and tested.

const HIRA_START = 0x3041;
const HIRA_END = 0x3096;
const KATA_OFFSET = 0x60;

/** ひらがな → カタカナ (other characters unchanged). */
export const toKatakana = (s: string) =>
  [...s].map((c) => {
    const cp = c.codePointAt(0)!;
    return cp >= HIRA_START && cp <= HIRA_END ? String.fromCodePoint(cp + KATA_OFFSET) : c;
  }).join('');

/** カタカナ → ひらがな (ー and characters without a hiragana form unchanged). */
export const toHiragana = (s: string) =>
  [...s].map((c) => {
    const cp = c.codePointAt(0)!;
    return cp >= HIRA_START + KATA_OFFSET && cp <= HIRA_END + KATA_OFFSET ? String.fromCodePoint(cp - KATA_OFFSET) : c;
  }).join('');

export const isHiragana = (c: string) => /^[ぁ-ゖゝゞ]$/u.test(c);
export const isKatakana = (c: string) => /^[ァ-ヺー-ヾ]$/u.test(c);

/** Small kana that join the previous kana into one mora (ゃ ゅ ょ ぁ ぃ ぅ ぇ ぉ ゎ, and katakana). */
const JOINS = new Set([...'ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ']);

/**
 * Splits kana into morae: small ゃゅょ (and ぁぃぅぇぉ) join the previous kana; っ, ん, ー and each
 * kana of a long vowel are their own morae. Spaces and punctuation are dropped.
 */
export function morae(kana: string): string[] {
  const out: string[] = [];
  for (const c of kana) {
    if (/[\s、。！？「」・,.!?]/u.test(c)) continue;
    if (JOINS.has(c) && out.length) out[out.length - 1] += c;
    else out.push(c);
  }
  return out;
}

export type PitchMora = { mora: string; high: boolean };

/**
 * A Tokyo accent number as high/low per mora, plus the following particle (DESIGN §8.4):
 * 0 heiban (low-high…, the particle stays high); 1 atamadaka (high, then low); n (2…) nakadaka or
 * odaka (low, high up to mora n, then low; a drop onto the particle when n = the mora count).
 */
export function pitchPattern(kana: string, accent: number): { morae: PitchMora[]; particleHigh: boolean } {
  const m = morae(kana);
  const high = (i: number) => {
    if (accent === 0) return i > 0;
    if (accent === 1) return i === 0;
    return i > 0 && i < accent;
  };
  const list = m.map((mora, i) => ({ mora, high: high(i) }));
  // A one-mora heiban word is low then high on the particle.
  if (accent === 0 && m.length === 1) list[0].high = false;
  const particleHigh = accent === 0;
  return { morae: list, particleHigh };
}
