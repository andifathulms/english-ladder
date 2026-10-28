// Spanish agreement (CLAUDE.md §5.1): adjective forms, articles and noun plurals. Pure.
import { stressOf, syllabify, withStress } from './syllables';

export type Gender = 'm' | 'f';
export type Num = 'sg' | 'pl';

/** Plural of a noun or adjective: vowel → +s, consonant → +es (z → ces), unstressed -s/-x stays
 *  (el lunes, la crisis); the stressed syllable keeps its place (joven → jóvenes, inglés → ingleses). */
export function plural(word: string): string {
  const w = word.normalize('NFC');
  const syl = syllabify(w);
  const stressed = stressOf(w);
  const last = w[w.length - 1].toLowerCase();
  if (/[aeiouáéó]/.test(last)) return w + 's';
  // Stressed í/ú: the formal plural adds -es (rubíes), but -s is common (menús); use -s.
  if (/[íú]/.test(last)) return w + 's';
  if ((last === 's' || last === 'x') && syl.length > 1 && stressed < syl.length - 1) return w;
  const stem = last === 'z' ? w.slice(0, -1) + 'c' : w;
  // A written í/ú marks a hiatus (país, raíz): it stays, whatever the syllable count.
  if (/[aeiouáéó]h?[íú]|[íú]h?[aeiouáéó]/i.test(w)) return stem + 'es';
  return withStress(stem + 'es', stressed);
}

/** Gendered consonant endings: trabajador → trabajadora, alemán → alemana, inglés → inglesa. */
const GENDERED_CONSONANT = /(or|ón|án|ín|és)$/;

/**
 * The form of an adjective (given in its masculine singular) for a gender and number: -o/-a;
 * invariable -e, -ista and most consonant endings (verde, azul, fácil); -or/-ón/-án/-ín/-és add -a.
 * `forms` (m sg, f sg, m pl, f pl), when given, wins (español, mejor).
 */
export function agreeAdj(adj: string, gender: Gender, number: Num, forms?: string[]): string {
  if (forms && forms.length === 4) return forms[(gender === 'f' ? 1 : 0) + (number === 'pl' ? 2 : 0)];
  const a = adj.normalize('NFC');
  let sg = a;
  if (gender === 'f') {
    if (a.endsWith('o')) sg = a.slice(0, -1) + 'a';
    else if (GENDERED_CONSONANT.test(a) && !/(mejor|peor|mayor|menor|exterior|interior|superior|inferior)$/.test(a)) {
      sg = withStress(a + 'a', stressOf(a));
    }
  }
  return number === 'pl' ? plural(sg) : sg;
}

/** The four forms in the order agreeAdj's `forms` uses: m sg, f sg, m pl, f pl. */
export const adjForms = (adj: string, forms?: string[]) => [
  agreeAdj(adj, 'm', 'sg', forms),
  agreeAdj(adj, 'f', 'sg', forms),
  agreeAdj(adj, 'm', 'pl', forms),
  agreeAdj(adj, 'f', 'pl', forms),
];

/**
 * The article for a noun. `el: true` marks a feminine noun with a stressed initial a, which takes
 * el / un in the singular (el agua, un águila) but las / unas in the plural.
 */
export function article(gender: Gender, number: Num, definite: boolean, { el = false }: { el?: boolean } = {}): string {
  if (definite) {
    if (number === 'pl') return gender === 'f' ? 'las' : 'los';
    return gender === 'f' && !el ? 'la' : 'el';
  }
  if (number === 'pl') return gender === 'f' ? 'unas' : 'unos';
  return gender === 'f' && !el ? 'una' : 'un';
}
