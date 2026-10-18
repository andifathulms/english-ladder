// Romaji ↔ kana (docs/japanese/CLAUDE.md §7.1). Romaji is never authored: it is generated from kana
// (Hepburn), and learners' romaji is converted to kana as they type. Pure and tested.
import { toHiragana, toKatakana } from './kana';

/** Hepburn and the common variants (shi/si, chi/ti, tsu/tu, fu/hu, ji/zi, sha/sya, …). */
const TABLE: Record<string, string> = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ', kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  sa: 'さ', shi: 'し', si: 'し', su: 'す', se: 'せ', so: 'そ', sha: 'しゃ', shu: 'しゅ', sho: 'しょ', she: 'しぇ', sya: 'しゃ', syu: 'しゅ', syo: 'しょ',
  ta: 'た', chi: 'ち', ti: 'ち', tsu: 'つ', tu: 'つ', te: 'て', to: 'と', cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', che: 'ちぇ', tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ', cya: 'ちゃ', cyu: 'ちゅ', cyo: 'ちょ', tsa: 'つぁ', thi: 'てぃ', twu: 'とぅ',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の', nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  ha: 'は', hi: 'ひ', fu: 'ふ', hu: 'ふ', he: 'へ', ho: 'ほ', hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ', fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', fyu: 'ふゅ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も', mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  ya: 'や', yu: 'ゆ', yo: 'よ', ye: 'いぇ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ', rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  la: 'ら', li: 'り', lu: 'る', le: 'れ', lo: 'ろ',
  wa: 'わ', wo: 'を', wi: 'うぃ', we: 'うぇ',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご', gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  za: 'ざ', ji: 'じ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ', ja: 'じゃ', ju: 'じゅ', jo: 'じょ', je: 'じぇ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ', zya: 'じゃ', zyu: 'じゅ', zyo: 'じょ',
  da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど', dhi: 'でぃ', dyu: 'でゅ', dwu: 'どぅ',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ', bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ', pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ',
  xa: 'ぁ', xi: 'ぃ', xu: 'ぅ', xe: 'ぇ', xo: 'ぉ', xya: 'ゃ', xyu: 'ゅ', xyo: 'ょ', xtu: 'っ', xtsu: 'っ', xwa: 'ゎ',
  'n\'': 'ん', nn: 'ん', '-': 'ー',
};
const KEYS = Object.keys(TABLE).sort((a, b) => b.length - a.length);
const VOWEL = /[aiueo]/;
const CONSONANT = /[bcdfghjklmpqrstvwxyz]/;

export type ToKana = { kana: string; /** Romaji not yet converted (the learner is mid-syllable). */ pending: string };

/**
 * Live IME-like conversion: romaji → kana as far as it can go; what's left is pending. A double
 * consonant (kk, tt, tch) gives っ; n before a consonant (not y) gives ん; n' gives ん, and so does nn
 * unless a vowel or y follows (minna → みんな); - gives ー
 * (in katakana). With `final`, a trailing n becomes ん.
 */
export function romajiToKana(input: string, script: 'hiragana' | 'katakana' = 'hiragana', final = false): ToKana {
  const s = input.toLowerCase().replace(/[āīūēō]/g, (c) => ({ ā: 'aa', ī: 'ii', ū: 'uu', ē: 'ee', ō: 'ou' })[c]!);
  let out = '';
  let i = 0;
  while (i < s.length) {
    const rest = s.slice(i);
    const c = rest[0];
    // Kana already typed (or a helper key) passes through.
    if (/[぀-ヿ]/u.test(c)) {
      out += c;
      i++;
      continue;
    }
    // nn before a vowel or y is ん + an n-syllable (minna → みんな); otherwise nn is ん.
    if (rest.startsWith('nn') && rest.length > 2 && (VOWEL.test(rest[2]) || rest[2] === 'y')) {
      out += 'ん';
      i++;
      continue;
    }
    if (c === 'n' && rest.length > 1 && rest[1] !== 'n' && rest[1] !== "'" && rest[1] !== 'y' && !VOWEL.test(rest[1])) {
      out += 'ん';
      i++;
      continue;
    }
    // Double consonant (not n): っ, and "tch" is っch.
    if (CONSONANT.test(c) && c !== 'n' && (rest[1] === c || (c === 't' && rest.startsWith('tch')))) {
      out += 'っ';
      i++;
      continue;
    }
    const key = KEYS.find((k) => rest.startsWith(k));
    if (key) {
      out += TABLE[key];
      i += key.length;
      continue;
    }
    // Could still become a syllable: leave it pending.
    if (KEYS.some((k) => k.startsWith(rest))) break;
    // Not romaji: keep as typed.
    out += c;
    i++;
  }
  let pending = s.slice(i);
  if (final && pending === 'n') {
    out += 'ん';
    pending = '';
  }
  return { kana: script === 'katakana' ? toKatakana(out) : out, pending };
}

/** Hepburn per kana (hiragana); combinations first. */
const HEPBURN: Record<string, string> = Object.fromEntries(
  Object.entries({
    あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
    か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko', きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
    さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so', しゃ: 'sha', しゅ: 'shu', しょ: 'sho', しぇ: 'she',
    た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to', ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho', ちぇ: 'che', てぃ: 'ti', とぅ: 'tu', つぁ: 'tsa',
    な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no', にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
    は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho', ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo', ふぁ: 'fa', ふぃ: 'fi', ふぇ: 'fe', ふぉ: 'fo',
    ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo', みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
    や: 'ya', ゆ: 'yu', よ: 'yo', いぇ: 'ye',
    ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro', りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
    わ: 'wa', を: 'o', ん: 'n', うぃ: 'wi', うぇ: 'we', うぉ: 'wo',
    が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go', ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
    ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo', じゃ: 'ja', じゅ: 'ju', じょ: 'jo', じぇ: 'je',
    だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do', でぃ: 'di', でゅ: 'dyu', どぅ: 'du',
    ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo', びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
    ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po', ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
    ゔ: 'vu', ゔぁ: 'va', ゔぃ: 'vi', ゔぇ: 've', ゔぉ: 'vo',
    ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o', ゃ: 'ya', ゅ: 'yu', ょ: 'yo', ゎ: 'wa',
  }),
);

/** Hepburn for one word of kana (no spaces). */
function wordToRomaji(word: string): string {
  const k = toHiragana(word);
  let out = '';
  let geminate = false;
  for (let i = 0; i < k.length; ) {
    const two = k.slice(i, i + 2);
    const one = k[i];
    if (one === 'っ') {
      geminate = true;
      i++;
      continue;
    }
    if (one === 'ー') {
      const v = out.match(/[aiueo]$/)?.[0];
      out += v ?? '-';
      i++;
      continue;
    }
    const piece = HEPBURN[two] ?? HEPBURN[one] ?? one;
    i += HEPBURN[two] ? 2 : 1;
    if (geminate) {
      out += piece.startsWith('ch') ? 't' : /^[a-z]/.test(piece) && !/^[aiueo]/.test(piece) ? piece[0] : '';
      geminate = false;
    }
    // ん before a vowel or y is written n'.
    if (out.endsWith('n') && one !== 'ん' && /^[aiueoy]/.test(piece) && k[i - (HEPBURN[two] ? 2 : 1) - 1] === 'ん') out += "'";
    out += piece;
  }
  if (geminate) out += 't';
  return out;
}

/**
 * Hepburn romaji for kana written as word tokens (the `kana` field). With `particles`, a lone は へ
 * token is said wa / e (を is always o).
 */
export function kanaToRomaji(kana: string, { particles = true }: { particles?: boolean } = {}): string {
  return kana
    .trim()
    .split(/\s+/)
    .filter((w) => w && !/^[、。！？「」]+$/u.test(w))
    .map((w) => {
      if (particles && w === 'は') return 'wa';
      if (particles && w === 'へ') return 'e';
      return wordToRomaji(w.replace(/[、。！？「」]/gu, ''));
    })
    .join(' ');
}
