// Romaji ↔ kana (CLAUDE.md §9): live conversion against 300+ inputs, and Hepburn with particles.
import { describe, expect, it } from 'vitest';
import { kanaToRomaji, romajiToKana } from '@/lib/ja/romaji';

const conv = (s: string, script: 'hiragana' | 'katakana' = 'hiragana') => romajiToKana(s, script, true).kana;

// Every gojūon, dakuten and yōon syllable in Hepburn, and the kana it must produce.
const SYLLABLES: [string, string][] = [
  ['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え'], ['o', 'お'],
  ['ka', 'か'], ['ki', 'き'], ['ku', 'く'], ['ke', 'け'], ['ko', 'こ'],
  ['sa', 'さ'], ['shi', 'し'], ['su', 'す'], ['se', 'せ'], ['so', 'そ'],
  ['ta', 'た'], ['chi', 'ち'], ['tsu', 'つ'], ['te', 'て'], ['to', 'と'],
  ['na', 'な'], ['ni', 'に'], ['nu', 'ぬ'], ['ne', 'ね'], ['no', 'の'],
  ['ha', 'は'], ['hi', 'ひ'], ['fu', 'ふ'], ['he', 'へ'], ['ho', 'ほ'],
  ['ma', 'ま'], ['mi', 'み'], ['mu', 'む'], ['me', 'め'], ['mo', 'も'],
  ['ya', 'や'], ['yu', 'ゆ'], ['yo', 'よ'],
  ['ra', 'ら'], ['ri', 'り'], ['ru', 'る'], ['re', 'れ'], ['ro', 'ろ'],
  ['wa', 'わ'], ['wo', 'を'], ["n'", 'ん'],
  ['ga', 'が'], ['gi', 'ぎ'], ['gu', 'ぐ'], ['ge', 'げ'], ['go', 'ご'],
  ['za', 'ざ'], ['ji', 'じ'], ['zu', 'ず'], ['ze', 'ぜ'], ['zo', 'ぞ'],
  ['da', 'だ'], ['de', 'で'], ['do', 'ど'],
  ['ba', 'ば'], ['bi', 'び'], ['bu', 'ぶ'], ['be', 'べ'], ['bo', 'ぼ'],
  ['pa', 'ぱ'], ['pi', 'ぴ'], ['pu', 'ぷ'], ['pe', 'ぺ'], ['po', 'ぽ'],
  ['kya', 'きゃ'], ['kyu', 'きゅ'], ['kyo', 'きょ'], ['sha', 'しゃ'], ['shu', 'しゅ'], ['sho', 'しょ'],
  ['cha', 'ちゃ'], ['chu', 'ちゅ'], ['cho', 'ちょ'], ['nya', 'にゃ'], ['nyu', 'にゅ'], ['nyo', 'にょ'],
  ['hya', 'ひゃ'], ['hyu', 'ひゅ'], ['hyo', 'ひょ'], ['mya', 'みゃ'], ['myu', 'みゅ'], ['myo', 'みょ'],
  ['rya', 'りゃ'], ['ryu', 'りゅ'], ['ryo', 'りょ'], ['gya', 'ぎゃ'], ['gyu', 'ぎゅ'], ['gyo', 'ぎょ'],
  ['ja', 'じゃ'], ['ju', 'じゅ'], ['jo', 'じょ'], ['bya', 'びゃ'], ['byu', 'びゅ'], ['byo', 'びょ'],
  ['pya', 'ぴゃ'], ['pyu', 'ぴゅ'], ['pyo', 'ぴょ'],
];

// Common variants (Kunrei and IME habits) that must give the same kana.
const VARIANTS: [string, string][] = [
  ['si', 'し'], ['ti', 'ち'], ['tu', 'つ'], ['hu', 'ふ'], ['zi', 'じ'], ['sya', 'しゃ'], ['syu', 'しゅ'], ['syo', 'しょ'],
  ['tya', 'ちゃ'], ['tyu', 'ちゅ'], ['tyo', 'ちょ'], ['cya', 'ちゃ'], ['zya', 'じゃ'], ['zyu', 'じゅ'], ['zyo', 'じょ'],
  ['jya', 'じゃ'], ['jyu', 'じゅ'], ['jyo', 'じょ'], ['nn', 'ん'], ['la', 'ら'], ['li', 'り'], ['lu', 'る'], ['le', 'れ'], ['lo', 'ろ'],
  ['di', 'ぢ'], ['du', 'づ'], ['xa', 'ぁ'], ['xtu', 'っ'], ['xtsu', 'っ'], ['xya', 'ゃ'],
];

// Words and edge cases: double consonants, n before consonants and vowels, long vowels, tch.
const WORDS: [string, string][] = [
  ['kitte', 'きって'], ['kite', 'きて'], ['kka', 'っか'], ['matte', 'まって'], ['zasshi', 'ざっし'], ['gakkou', 'がっこう'],
  ['kippu', 'きっぷ'], ['itte', 'いって'], ['massugu', 'まっすぐ'], ['tchi', 'っち'], ['matcha', 'まっちゃ'], ['kocchi', 'こっち'],
  ['nna', 'んな'], ["n'a", 'んあ'], ['kon\'ya', 'こんや'], ['konya', 'こにゃ'], ['konnichiwa', 'こんにちわ'], ['sensei', 'せんせい'],
  ['ten\'in', 'てんいん'], ['tenin', 'てにん'], ['hon', 'ほん'], ['honya', 'ほにゃ'], ['shinbun', 'しんぶん'], ['sanpo', 'さんぽ'],
  ['obasan', 'おばさん'], ['obaasan', 'おばあさん'], ['ojisan', 'おじさん'], ['ojiisan', 'おじいさん'], ['toukyou', 'とうきょう'],
  ['kyouto', 'きょうと'], ['oosaka', 'おおさか'], ['gohan', 'ごはん'], ['taberu', 'たべる'], ['tabemasu', 'たべます'],
  ['watashi', 'わたし'], ['nihongo', 'にほんご'], ['arigatou', 'ありがとう'], ['sumimasen', 'すみません'], ['ohayou', 'おはよう'],
  ['sayounara', 'さようなら'], ['densha', 'でんしゃ'], ['jisho', 'じしょ'], ['ryokou', 'りょこう'], ['byouin', 'びょういん'],
  ['kyuu', 'きゅう'], ['juu', 'じゅう'], ['hyaku', 'ひゃく'], ['sen', 'せん'], ['man', 'まん'], ['en', 'えん'], ['kin\'en', 'きんえん'],
  ['kinen', 'きねん'], ['onna', 'おんな'], ['minna', 'みんな'], ['hanbun', 'はんぶん'], ['kanji', 'かんじ'], ['hiragana', 'ひらがな'],
  ['katakana', 'かたかな'], ['tsukue', 'つくえ'], ['chotto', 'ちょっと'], ['shashin', 'しゃしん'], ['ikkai', 'いっかい'], ['sakki', 'さっき'],
  ['zutto', 'ずっと'], ['motto', 'もっと'], ['yappari', 'やっぱり'], ['hakkiri', 'はっきり'], ['kekkon', 'けっこん'], ['shuppatsu', 'しゅっぱつ'],
];

const KATAKANA: [string, string][] = [
  ['ko-hi-', 'コーヒー'], ['su-pa-', 'スーパー'], ['pasokon', 'パソコン'], ['konbini', 'コンビニ'], ['terebi', 'テレビ'],
  ['manshon', 'マンション'], ['fairu', 'ファイル'], ['ti-shatsu', 'チーシャツ'], ['thi-shatsu', 'ティーシャツ'], ['wi-ku', 'ウィーク'],
  ['baiorin', 'バイオリン'], ['vaiorin', 'ヴァイオリン'], ['kappu', 'カップ'], ['beddo', 'ベッド'], ['chi-zu', 'チーズ'],
  ['she-ku', 'シェーク'], ['fo-ku', 'フォーク'], ['firumu', 'フィルム'], ['pa-thi-', 'パーティー'], ['kukki-', 'クッキー'],
];

describe('romajiToKana', () => {
  it.each(SYLLABLES)('%s → %s', (r, k) => expect(conv(r)).toBe(k));
  it.each(VARIANTS)('variant %s → %s', (r, k) => expect(conv(r)).toBe(k));
  it.each(WORDS)('%s → %s', (r, k) => expect(conv(r)).toBe(k));
  it.each(KATAKANA)('%s → %s (katakana)', (r, k) => expect(conv(r, 'katakana')).toBe(k));
  it.each(SYLLABLES)('%s in katakana', (r, k) => expect(conv(r, 'katakana')).toBe(k.replace(/[ぁ-ゖ]/gu, (c) => String.fromCodePoint(c.codePointAt(0)! + 0x60))));

  it('leaves an unfinished syllable pending while typing', () => {
    expect(romajiToKana('ky')).toEqual({ kana: '', pending: 'ky' });
    expect(romajiToKana('tabem')).toEqual({ kana: 'たべ', pending: 'm' });
    expect(romajiToKana('hon')).toEqual({ kana: 'ほ', pending: 'n' });
    expect(romajiToKana('hon', 'hiragana', true)).toEqual({ kana: 'ほん', pending: '' });
    expect(romajiToKana('kit')).toEqual({ kana: 'き', pending: 't' });
  });

  it('passes kana from the helper keys through, and accepts upper case and macrons', () => {
    expect(conv('きっte')).toBe('きって');
    expect(conv('KITTE')).toBe('きって');
    expect(conv('tōkyō')).toBe('とうきょう');
  });
});

describe('kanaToRomaji', () => {
  it('writes Hepburn', () => {
    expect(kanaToRomaji('しんぶん')).toBe('shinbun');
    expect(kanaToRomaji('きって')).toBe('kitte');
    expect(kanaToRomaji('まっちゃ')).toBe('matcha');
    expect(kanaToRomaji('おばあさん')).toBe('obaasan');
    expect(kanaToRomaji('ちゅうごく')).toBe('chuugoku');
    expect(kanaToRomaji('ふじさん')).toBe('fujisan');
  });

  it("writes n' before a vowel or y", () => {
    expect(kanaToRomaji('きんえん')).toBe("kin'en");
    expect(kanaToRomaji('こんや')).toBe("kon'ya");
    expect(kanaToRomaji('こんにちは')).toBe('konnichiha');
  });

  it('says lone は and へ as particles wa and e; を is o', () => {
    expect(kanaToRomaji('わたし は がくせい です')).toBe('watashi wa gakusei desu');
    expect(kanaToRomaji('がっこう へ いきます')).toBe('gakkou e ikimasu');
    expect(kanaToRomaji('ごはん を たべます 。')).toBe('gohan o tabemasu');
    expect(kanaToRomaji('わたし は', { particles: false })).toBe('watashi ha');
  });

  it('extends a vowel for ー and reads katakana', () => {
    expect(kanaToRomaji('コーヒー')).toBe('koohii');
    expect(kanaToRomaji('パーティー')).toBe('paatii');
  });
});
