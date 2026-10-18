// Rule-based conjugation for `form` items' answer checks and authoring help (CLAUDE.md §7.1). Authored
// answers remain the truth: a mismatch with these rules is a lint warning, never a silent fix.

export type WordType = 'verb-1' | 'verb-2' | 'verb-3' | 'adj-i' | 'adj-na';
export type Target = 'masu' | 'masen' | 'mashita' | 'masendeshita' | 'masho' | 'te' | 'nai' | 'ta' | 'dict' | 'potential' | 'volitional';

/** Godan endings by row: u-row → (a, i, e, o) rows. */
const ROWS: Record<string, [string, string, string, string]> = {
  う: ['わ', 'い', 'え', 'お'],
  く: ['か', 'き', 'け', 'こ'],
  ぐ: ['が', 'ぎ', 'げ', 'ご'],
  す: ['さ', 'し', 'せ', 'そ'],
  つ: ['た', 'ち', 'て', 'と'],
  ぬ: ['な', 'に', 'ね', 'の'],
  ぶ: ['ば', 'び', 'べ', 'ぼ'],
  む: ['ま', 'み', 'め', 'も'],
  る: ['ら', 'り', 'れ', 'ろ'],
};

/** て/た forms of godan verbs (行く is the one exception: 行って). */
function godanTe(word: string, ta: boolean): string {
  const stem = word.slice(0, -1);
  const end = word.slice(-1);
  const t = ta ? 'た' : 'て';
  const d = ta ? 'だ' : 'で';
  if (word.endsWith('行く') || word === 'いく') return `${stem}っ${t}`;
  switch (end) {
    case 'う':
    case 'つ':
    case 'る':
      return `${stem}っ${t}`;
    case 'む':
    case 'ぶ':
    case 'ぬ':
      return `${stem}ん${d}`;
    case 'く':
      return `${stem}い${t}`;
    case 'ぐ':
      return `${stem}い${d}`;
    case 'す':
      return `${stem}し${t}`;
  }
  throw new Error(`not a godan verb: ${word}`);
}

/** Polite endings on a masu stem. */
const POLITE: Partial<Record<Target, string>> = { masu: 'ます', masen: 'ません', mashita: 'ました', masendeshita: 'ませんでした', masho: 'ましょう' };

/** The masu stem and the other bases of a verb. */
function verbBases(word: string, type: 'verb-1' | 'verb-2' | 'verb-3') {
  if (type === 'verb-3') {
    // する and its compounds (勉強する), 来る (くる).
    if (/(する)$/.test(word)) {
      const p = word.slice(0, -2);
      return { stem: `${p}し`, nai: `${p}しない`, te: `${p}して`, ta: `${p}した`, potential: `${p}できる`, volitional: `${p}しよう` };
    }
    if (/(来る|くる)$/.test(word)) {
      const kanji = word.endsWith('来る');
      const p = word.slice(0, -2);
      const k = (kana: string) => (kanji ? `${p}来${kana.slice(1)}` : `${p}${kana}`);
      return { stem: k('き'), nai: k('こない'), te: k('きて'), ta: k('きた'), potential: k('こられる'), volitional: k('こよう') };
    }
    throw new Error(`not a group 3 verb: ${word}`);
  }
  if (type === 'verb-2') {
    const stem = word.slice(0, -1);
    return { stem, nai: `${stem}ない`, te: `${stem}て`, ta: `${stem}た`, potential: `${stem}られる`, volitional: `${stem}よう` };
  }
  const end = word.slice(-1);
  const row = ROWS[end];
  if (!row) throw new Error(`not a godan verb: ${word}`);
  const base = word.slice(0, -1);
  // ある's negative is ない (not あらない).
  const nai = /(ある|有る)$/.test(word) ? `${word.slice(0, -2)}ない` : `${base}${row[0]}ない`;
  return { stem: `${base}${row[1]}`, nai, te: godanTe(word, false), ta: godanTe(word, true), potential: `${base}${row[2]}る`, volitional: `${base}${row[3]}う` };
}

/** Conjugates a dictionary-form word to a target form. */
export function conjugate(word: string, type: WordType, target: Target): string {
  if (type === 'adj-i') {
    // いい conjugates from よい.
    const base = /いい$/.test(word) ? `${word.slice(0, -2)}よ` : word.slice(0, -1);
    const forms: Partial<Record<Target, string>> = {
      dict: word,
      masu: `${word}です`,
      nai: `${base}くない`,
      masen: `${base}くないです`,
      ta: `${base}かった`,
      mashita: `${base}かったです`,
      masendeshita: `${base}くなかったです`,
      te: `${base}くて`,
    };
    const f = forms[target];
    if (!f) throw new Error(`い adjectives have no ${target} form`);
    return f;
  }
  if (type === 'adj-na') {
    const forms: Partial<Record<Target, string>> = {
      dict: word,
      masu: `${word}です`,
      nai: `${word}じゃない`,
      masen: `${word}じゃありません`,
      ta: `${word}だった`,
      mashita: `${word}でした`,
      masendeshita: `${word}じゃありませんでした`,
      te: `${word}で`,
    };
    const f = forms[target];
    if (!f) throw new Error(`な adjectives have no ${target} form`);
    return f;
  }
  const b = verbBases(word, type);
  if (target === 'dict') return word;
  const polite = POLITE[target];
  if (polite) return `${b.stem}${polite}`;
  return b[target as 'nai' | 'te' | 'ta' | 'potential' | 'volitional'];
}
