// Spanish syllables and stress (CLAUDE.md §5.1): syllabify, stressOf, needsAccent. Pure.
//
// Units: ch, ll, rr are one consonant; qu and gu before e/i are one consonant (the u is silent),
// while gü keeps its ü as a vowel. Strong vowels are a e o and the accented í ú (which break a
// diphthong); weak vowels are i u ü. y is a vowel at the end of a word after a vowel (hoy, muy,
// Uruguay) and a consonant otherwise. h counts as a consonant.

type Unit = { s: number; e: number; v: boolean; strong: boolean; c: string };

const STRONG = new Set(['a', 'e', 'o', 'á', 'é', 'ó', 'í', 'ú']);
const WEAK = new Set(['i', 'u', 'ü']);
const FRONT = new Set(['e', 'i', 'é', 'í']);

function units(lower: string): Unit[] {
  const out: Unit[] = [];
  for (let i = 0; i < lower.length; ) {
    const ch = lower[i];
    const two = lower.slice(i, i + 2);
    if (two === 'ch' || two === 'll' || two === 'rr') {
      out.push({ s: i, e: i + 2, v: false, strong: false, c: two });
      i += 2;
    } else if ((two === 'qu' || two === 'gu') && FRONT.has(lower[i + 2] ?? '')) {
      out.push({ s: i, e: i + 2, v: false, strong: false, c: two });
      i += 2;
    } else if (STRONG.has(ch)) {
      out.push({ s: i, e: i + 1, v: true, strong: true, c: ch });
      i += 1;
    } else if (WEAK.has(ch)) {
      out.push({ s: i, e: i + 1, v: true, strong: false, c: ch });
      i += 1;
    } else if (ch === 'y') {
      const next = lower[i + 1];
      const prevVowel = out.length > 0 && out[out.length - 1].v;
      // A vowel when no vowel follows and it closes a vowel (hoy) or stands alone (the word y).
      const vowelY = !(next && (STRONG.has(next) || WEAK.has(next))) && (prevVowel || out.length === 0);
      out.push({ s: i, e: i + 1, v: vowelY, strong: false, c: 'y' });
      i += 1;
    } else {
      out.push({ s: i, e: i + 1, v: false, strong: false, c: ch });
      i += 1;
    }
  }
  return out;
}

/** Consonant pairs that start a syllable together (pl, br, tr, …; tl as in Mexico: a-tlas). */
const inseparable = (a: string, b: string) => (b === 'l' || b === 'r') && ['p', 'b', 'f', 'c', 'g', 'k', 't', 'd'].includes(a) && !(a === 'd' && b === 'l');

/** Splits one word into syllables, keeping its spelling and case. Non-letters stay attached. */
export function syllabify(word: string): string[] {
  const w = word.normalize('NFC');
  const us = units(w.toLowerCase());
  // Nuclei: runs of vowels, split at a hiatus (two strong vowels in a row).
  const nuclei: { from: number; to: number }[] = []; // unit indices, inclusive
  for (let i = 0; i < us.length; i++) {
    if (!us[i].v) continue;
    const last = nuclei[nuclei.length - 1];
    if (last && last.to === i - 1 && !(us[i - 1].strong && us[i].strong)) last.to = i;
    else nuclei.push({ from: i, to: i });
  }
  if (nuclei.length <= 1) return [w];
  // Boundaries (unit index where a new syllable starts) between consecutive nuclei.
  const starts: number[] = [0];
  for (let k = 1; k < nuclei.length; k++) {
    const a = nuclei[k - 1].to + 1;
    const b = nuclei[k].from; // consonants are units a .. b-1
    const n = b - a;
    let start: number;
    if (n <= 1) start = a;
    else if (n === 2) start = inseparable(us[a].c, us[a + 1].c) ? a : a + 1;
    else start = inseparable(us[b - 2].c, us[b - 1].c) ? b - 2 : b - 1;
    starts.push(start);
  }
  return starts.map((u, i) => w.slice(i === 0 ? 0 : us[u].s, i + 1 < starts.length ? us[starts[i + 1]].s : w.length));
}

const ACCENTED = /[áéíóú]/i;

/** Index of the stressed syllable: the written accent, else the default rules (vowel/n/s → penult). */
export function stressOf(word: string): number {
  const syl = syllabify(word);
  const marked = syl.findIndex((s) => ACCENTED.test(s));
  if (marked >= 0) return marked;
  if (syl.length === 1) return 0;
  const end = word.normalize('NFC').toLowerCase().replace(/[^a-záéíóúüñ]+$/u, '');
  return /[aeiouns]$/.test(end) ? syl.length - 2 : syl.length - 1;
}

/** The stress class of a syllable index, counted from the end. */
export function stressClass(syllables: number, stressedIdx: number): 'aguda' | 'llana' | 'esdrujula' {
  const fromEnd = syllables - 1 - stressedIdx;
  return fromEnd === 0 ? 'aguda' : fromEnd === 1 ? 'llana' : 'esdrujula';
}

/**
 * Whether the word needs a written accent when stressed on `stressedIdx` (aguda: if it ends in a
 * vowel, n or s; llana: if it doesn't; esdrújula: always). A stressed í/ú next to another vowel
 * (día, país, Raúl) always needs one. Monosyllables never need one by these rules (the diacritic
 * pairs tú/tu, él/el … are a matter of meaning, checked by the lint).
 */
export function needsAccent(word: string, stressedIdx: number): boolean {
  const syl = syllabify(word);
  if (syl.length === 1) return false;
  const lower = word.normalize('NFC').toLowerCase();
  // Hiatus with a stressed weak vowel: the written í/ú is what makes the hiatus.
  const s = syl[stressedIdx].toLowerCase();
  if (/[íú]/.test(s)) {
    const at = syl.slice(0, stressedIdx).join('').length + s.search(/[íú]/);
    // The neighbouring letters, looking past a silent h (prohíbe, búho).
    const prev = lower[at - 1] === 'h' ? lower[at - 2] : lower[at - 1];
    const next = lower[at + 1] === 'h' ? lower[at + 2] : lower[at + 1];
    if (/[aeiouáéó]/.test((prev ?? '') + (next ?? ''))) return true;
  }
  const end = lower.replace(/[^a-záéíóúüñ]+$/u, '');
  const vns = /[aeiouáéíóúns]$/.test(end);
  const cls = stressClass(syl.length, stressedIdx);
  return cls === 'esdrujula' || (cls === 'aguda' ? vns : !vns);
}

/** Removes á é í ó ú (ñ and ü stay). */
const strip = (s: string) => s.replace(/[áéíóú]/g, (c) => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' })[c]!);
const ADD: Record<string, string> = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };

/**
 * Writes `word` with stress on syllable `stressedIdx` (from the start), adding or removing the
 * accent mark as the rules require. Used when an ending changes the syllable count (joven → jóvenes,
 * inglés → ingleses, alemán → alemana).
 */
export function withStress(word: string, stressedIdx: number): string {
  const plain = strip(word.normalize('NFC'));
  const syl = syllabify(plain);
  if (stressedIdx >= syl.length) return plain;
  if (!needsAccent(plain, stressedIdx)) return plain;
  // Mark the strong vowel of the stressed syllable's nucleus (the last vowel if all are weak … the
  // first strong one otherwise).
  const s = syl[stressedIdx];
  const lower = s.toLowerCase();
  let at = lower.search(/[aeo]/);
  if (at < 0) {
    const vowels = [...lower.matchAll(/[iu]/g)].map((m) => m.index!);
    // A silent u in qu/gu is not the nucleus.
    const real = vowels.filter((i) => !((lower[i - 1] === 'q' || lower[i - 1] === 'g') && lower[i] === 'u'));
    at = real.length ? real[real.length - 1] : -1;
  }
  if (at < 0) return plain;
  const before = syl.slice(0, stressedIdx).join('');
  const marked = s.slice(0, at) + (s[at] === s[at].toUpperCase() ? ADD[lower[at]].toUpperCase() : ADD[lower[at]]) + s.slice(at + 1);
  return before + marked + syl.slice(stressedIdx + 1).join('');
}
