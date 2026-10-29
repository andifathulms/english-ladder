// German syllables and stress, enough for the Tirukan stress marks and soft-hyphen suggestions
// (CLAUDE.md §5.1). Pure. Rules: diphthongs (ei, ai, au, eu, äu, ie) and doubled vowels stay one
// nucleus; ch, sch, ck, ph, th, qu, ng count as one consonant; one consonant goes to the next syllable,
// of two or more the last goes (with st and sp kept at the start of a syllable only word-initially).
// Stress: the first syllable, except after an unstressed prefix (be-, ge-, er-, ver-, zer-, ent-,
// emp-, miss-) and on -ieren / -ei / -ion / -tät endings.

const VOWEL = /[aeiouäöüy]/;
const NUCLEI = ['eie', 'ai', 'au', 'ei', 'eu', 'äu', 'ie', 'aa', 'ee', 'oo'];
const UNITS = ['sch', 'ch', 'ck', 'ph', 'th', 'qu', 'ng'];

type Unit = { s: number; e: number; v: boolean };

function units(lower: string): Unit[] {
  const out: Unit[] = [];
  for (let i = 0; i < lower.length; ) {
    const nucleus = NUCLEI.find((n) => lower.startsWith(n, i));
    if (nucleus) {
      out.push({ s: i, e: i + nucleus.length, v: true });
      i += nucleus.length;
      continue;
    }
    const unit = UNITS.find((u) => lower.startsWith(u, i));
    if (unit) {
      out.push({ s: i, e: i + unit.length, v: false });
      i += unit.length;
      continue;
    }
    out.push({ s: i, e: i + 1, v: VOWEL.test(lower[i]) });
    i += 1;
  }
  return out;
}

const PREFIX = /^(be|ge|er|ver|zer|ent|emp|miss)/i;
const nuclei = (s: string) => units(s.toLowerCase()).filter((u) => u.v).length;

/**
 * An unstressed prefix split off first (ver-ste-hen, Ge-mü-se), only when two or more syllables
 * follow it, so Erde, Besen and gestern keep their first syllable.
 */
function prefixOf(w: string): string | null {
  const m = PREFIX.exec(w);
  return m && nuclei(w.slice(m[0].length)) >= 2 ? m[0] : null;
}

/** One word in syllables, keeping its spelling and case. */
export function syllabify(word: string): string[] {
  const w = word.normalize('NFC');
  const prefix = prefixOf(w);
  if (prefix) return [prefix, ...syllabify(w.slice(prefix.length))];
  const us = units(w.toLowerCase());
  const vowels = us.map((u, i) => (u.v ? i : -1)).filter((i) => i >= 0);
  if (vowels.length <= 1) return [w];
  const starts = [0];
  for (let k = 1; k < vowels.length; k++) {
    const a = vowels[k - 1] + 1;
    const b = vowels[k];
    const n = b - a;
    starts.push(n <= 1 ? a : b - 1);
  }
  return starts.map((u, i) => w.slice(i === 0 ? 0 : us[u].s, i + 1 < starts.length ? us[starts[i + 1]].s : w.length));
}

/** Index of the stressed syllable (a teaching approximation; loanwords vary). */
export function stressOf(word: string): number {
  const syl = syllabify(word);
  if (syl.length === 1) return 0;
  const lower = word.toLowerCase();
  if (/ieren$/.test(lower)) return syl.length - 2;
  if (/(ion|tät|ei)$/.test(lower)) return syl.length - 1;
  if (prefixOf(word.normalize('NFC'))) return 1;
  return 0;
}
