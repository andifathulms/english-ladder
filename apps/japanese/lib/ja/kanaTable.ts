// The kana grid (content/data/kana.yaml) for KanaChart and KanaOrigins. Pure: data in, cells out.
// Combinations (きゃ…) are derived from the い-column kana, not authored.
import { kanaToRomaji } from './romaji';
import { toKatakana } from './kana';

export type KanaEntry = {
  hira: string;
  kata: string;
  /** Row id ("" vowels, k s t n h m y r w, nn for ん, g z d b p) and column (a i u e o). */
  row: string;
  col: string;
  origin?: { hira?: string; kata?: string };
  /** The plain kana a voiced one is built on (か → が). */
  base?: string;
  note?: string;
  lesson: number;
};

export type KanaData = { seion: KanaEntry[]; dakuon: KanaEntry[] };

export const COLS = ['a', 'i', 'u', 'e', 'o'] as const;
export const SEION_ROWS = ['', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', 'nn'] as const;
export const DAKUON_ROWS = ['g', 'z', 'd', 'b', 'p'] as const;
const YOON_ROWS = ['k', 's', 't', 'n', 'h', 'm', 'r', 'g', 'z', 'b', 'p'] as const;
const SMALL = [
  ['a', 'ゃ'],
  ['u', 'ゅ'],
  ['o', 'ょ'],
] as const;

/** Small-kana combinations: the い-column kana of each row with ゃ ゅ ょ (Kana 1 lesson 8). */
export function yoon(data: KanaData): KanaEntry[] {
  const all = [...data.seion, ...data.dakuon];
  return YOON_ROWS.flatMap((row) => {
    const i = all.find((k) => k.row === row && k.col === 'i');
    if (!i) return [];
    return SMALL.map(([col, s]) => ({ hira: i.hira + s, kata: toKatakana(i.hira + s), row, col, lesson: 8 }));
  });
}

/** A grid: rows × the five columns, empty where the row has no kana (yi, ye, wi, wu, we). */
export function grid(entries: KanaEntry[], rows: readonly string[], cols: readonly string[] = COLS): (KanaEntry | null)[][] {
  return rows.map((r) => (r === 'nn' ? [entries.find((k) => k.row === 'nn') ?? null] : cols.map((c) => entries.find((k) => k.row === r && k.col === c) ?? null)));
}

/** What the corner mark's note says, as a string key and its values (romaji generated, never authored). */
export function kanaNote(k: KanaEntry): { key: 'kana.noteIrregular' | 'kana.noteParticle' | 'kana.noteSameAs'; vars: Record<string, string> } | null {
  if (!k.note) return null;
  if (k.note === 'particle') return { key: 'kana.noteParticle', vars: { kana: k.hira, like: 'お' } };
  if (k.note.startsWith('same-as:')) return { key: 'kana.noteSameAs', vars: { kana: k.hira, like: k.note.slice(8) } };
  // The regular spelling of the cell is its row and column ids (し: s + i).
  return { key: 'kana.noteIrregular', vars: { kana: k.hira, romaji: kanaToRomaji(k.hira), regular: `${k.row}${k.col}` } };
}
