// MoraBeats layout (DESIGN §8.3): a word as blocks, one per beat. Pure and tested.
import { morae, toHiragana } from './kana';
import { kanaToRomaji } from './romaji';

export type Block = {
  /** The kana shown in the block ('' for っ). */
  text: string;
  /** Beats the block spans: 2 for a mora lengthened by the next (ー or a vowel). */
  beats: 1 | 2;
  kind: 'mora' | 'small-tsu' | 'n' | 'long';
};

const vowel = (m: string) => kanaToRomaji(toHiragana(m), { particles: false }).slice(-1);

/** Whether `m` lengthens the mora before it: ー, or the same vowel (ああ, いい, うう…), or おう / えい. */
export function lengthens(prev: string, m: string): boolean {
  if (m === 'ー') return true;
  const v = { あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o' }[toHiragana(m) as 'あ'];
  if (!v || !prev || /^[っッんンー]$/u.test(prev)) return false;
  const pv = vowel(prev);
  return pv === v || (pv === 'o' && v === 'u') || (pv === 'e' && v === 'i');
}

/**
 * The blocks of a word: one per mora, っ empty, ん its own, and a long vowel merged into the block
 * before it across two beats. Beat count = sum of beats = the number of morae.
 *
 * おう and えい are long vowels in most words (おとうさん, せんせい) but not across a word boundary
 * (the う of a verb ending): content marks those with a space, which splits the word.
 */
export function blocks(kana: string): Block[] {
  const out: Block[] = [];
  for (const word of kana.split(/\s+/).filter(Boolean)) {
    let prev = '';
    for (const m of morae(word)) {
      const last = out[out.length - 1];
      if (last && last.beats === 1 && last.kind === 'mora' && lengthens(prev, m)) {
        last.text += m;
        last.beats = 2;
        last.kind = 'long';
      } else if (/^[っッ]$/u.test(m)) out.push({ text: '', beats: 1, kind: 'small-tsu' });
      else if (/^[んン]$/u.test(m)) out.push({ text: m, beats: 1, kind: 'n' });
      else out.push({ text: m, beats: 1, kind: 'mora' });
      prev = m;
    }
  }
  return out;
}

export const beatCount = (bs: Block[]) => bs.reduce((n, b) => n + b.beats, 0);
