// The Japanese content lint (CLAUDE.md §6): one rule per case, on fixture lessons.
import { describe, expect, it } from 'vitest';
import { lintLessons, type LintData } from '@/course/lint';
import type { Lesson, Rung } from '@/course/types';

const data: LintData = {
  jmdict: new Map([
    ['箱', new Set(['はこ'])],
    ['上', new Set(['うえ', 'かみ'])],
    ['今日', new Set(['きょう', 'こんにち'])],
    ['食べる', new Set(['たべる'])],
  ]),
  kanji: new Map([
    ['食', { readings: new Set(['しょく', 'た', 'く']), jlpt: 'N5' }],
    ['本', { readings: new Set(['ほん', 'もと']), jlpt: 'N5' }],
    ['山', { readings: new Set(['さん', 'やま']), jlpt: 'N5' }],
    ['川', { readings: new Set(['せん', 'かわ']), jlpt: 'N5' }],
  ]),
  words: new Map([
    ['箱|はこ', 'N5'],
    ['はこ', 'N5'],
    ['上|うえ', 'N5'],
    ['うえ', 'N5'],
    ['経済|けいざい', 'N3'],
    ['けいざい', 'N3'],
    ['あい', 'N5'],
  ]),
  names: new Set(['田中']),
  counters: [{ counter: '本', reading: 'ほん', readings: ['いっぽん', 'にほん', 'さんぼん', 'よんほん', 'ごほん', 'ろっぽん', 'ななほん', 'はっぽん', 'きゅうほん', 'じゅっぽん'], objects: { id: '', en: '' } }],
  grammar: new Set(['n5-wa-desu', 'k1-vowels']),
};

const rung = (over: Partial<Rung>): Rung =>
  ({ id: 'easy-1', name: 'Easy 1', name_ja: 'x', tier: 'easy', jlpt: 'N5', jft: false, cefr: 'A1', status: 'live', optional: false, lessons: 1, furigana: 'always', romaji: 'none', words_cum: 0, kanji_cum: 0, description: { id: 'x', en: 'x' }, topics: ['x'], threads: [], inventory: [], ...over }) as Rung;

const ex = (ja: string, kana: string) => ({ ja, kana, id: 'x' });
const lesson = (over: Partial<Lesson>): Lesson =>
  ({
    id: 'l1',
    slug: '01-x',
    rung: 'easy-1',
    order: 1,
    status: 'draft',
    minutes: 8,
    title: { id: 'x', en: 'x', ja: 'はこ', kana: 'はこ' },
    summary: { id: 'x', en: 'x' },
    introduces: ['n5-wa-desu'],
    spiral: 'x',
    worked: [ex('はこ です 。', 'はこ です 。'), ex('はこ です 。', 'はこ です 。')],
    examples: [ex('{箱|はこ} の [[{上|うえ}]] です 。', 'はこ の うえ です 。')],
    pair: { off: { ja: 'はこ', kana: 'はこ' }, natural: { ja: 'はこ', kana: 'はこ' } },
    tirukan: { ja: 'はこ です 。', kana: 'はこ です 。', id: 'x' },
    check: [],
    glossary: Array.from({ length: 8 }, () => ({ ja: '{箱|はこ}', kana: 'はこ', id: 'kotak' })),
    kanji: ['箱', '上', '中'],
    concept: { id: 'x', en: 'x' },
    contrast: { id: 'x', en: 'x' },
    ...over,
  }) as Lesson;

const run = (l: Lesson, r = rung({})) => lintLessons([r], new Map([[r.id, [l]]]), data).map((f) => `${f.level}: ${f.message.replace(/^[^:]+: /, '')}`);

describe('Japanese lint', () => {
  it('passes a clean lesson', () => {
    expect(run(lesson({}))).toEqual([]);
  });

  it('checks kana against the ruby readings, token by token', () => {
    expect(run(lesson({ examples: [ex('{箱|はこ} です 。', 'はこ でず 。')] }))).toContain('error: example 1: kana "はこ でず 。" ≠ the ruby readings "はこ です 。"');
  });

  it('checks readings against JMdict and KANJIDIC2, allowing rendaku and listed jukujikun', () => {
    expect(run(lesson({ examples: [ex('{箱|ばこ} です 。', 'ばこ です 。')] }))).toContain('warn: example 1: "箱" is read はこ in JMdict, not ばこ');
    expect(run(lesson({ examples: [ex('{食|た}べます 。', 'たべます 。')] }))).toEqual([]);
    expect(run(lesson({ examples: [ex('{食|しょ}べます 。', 'しょべます 。')] })).some((m) => m.includes('食 read しょ'))).toBe(true);
    expect(run(lesson({ examples: [ex('{今日|=きょう} です 。', 'きょう です 。')] }))).toEqual([]);
    expect(run(lesson({ examples: [ex('{山川|やま|がわ} です 。', 'やまがわ です 。')] }))).toEqual([]);
  });

  it('takes counter readings from counters.yaml', () => {
    expect(run(lesson({ examples: [ex('{三本|さん|ほん} です 。', 'さんほん です 。')] }))).toContain('warn: example 1: 三本 is read さんぼん, not さんほん');
  });

  it('never accepts romaji', () => {
    expect(run(lesson({ examples: [ex('hako です 。', 'hako です 。')] }))).toContain('error: example 1: Latin letters in Japanese (romaji is never authored)');
  });

  it('flags plain endings before Easy 3, and drafts that carry review fields', () => {
    expect(run(lesson({ examples: [ex('わたし は たべる 。', 'わたし は たべる 。')] }))).toContain('warn: plain-form ending "たべる" before Easy 3: "わたし は たべる 。"');
    expect(run(lesson({ review: { by: 'x', date: '2026-01-01' } }))).toContain('warn: a draft lesson carries review fields; only the reviewer adds them');
  });

  it('keeps glossary words to the rung level unless listed in extra, and makes reviewed lessons strict', () => {
    const gl = [...Array.from({ length: 7 }, () => ({ ja: '{箱|はこ}', kana: 'はこ', id: 'kotak' })), { ja: '{経済|けい|ざい}', kana: 'けいざい', id: 'ekonomi' }];
    expect(run(lesson({ glossary: gl }))).toContain('warn: glossary "経済" is on the N3 list, above N5; add it to extra: with a reason');
    expect(run(lesson({ glossary: gl, extra: [{ ja: '{経済|けい|ざい}', reason: 'x' }] }))).toEqual([]);
    expect(run(lesson({ glossary: gl, status: 'reviewed' })).some((m) => m.startsWith('error: glossary "経済"'))).toBe(true);
  });

  it('allows no kanji in Kana 1, and only kana taught so far in its lines', () => {
    const k = rung({ id: 'kana-1', tier: 'kana', jlpt: '—', furigana: '—' });
    const base = { rung: 'kana-1', introduces: ['k1-vowels'], kana_new: ['あいうえお'], glossary: [{ ja: 'あい', kana: 'あい', id: 'cinta' }], kanji: [] };
    expect(run(lesson({ ...base, examples: [ex('あい', 'あい')], worked: [ex('あい', 'あい'), ex('いえ', 'いえ')], tirukan: { ja: 'あい', kana: 'あい', id: 'x' }, title: { id: 'x', en: 'x', ja: 'あいうえお', kana: 'あいうえお' }, pair: { off: { ja: 'あい', kana: 'あい' }, natural: { ja: 'いえ', kana: 'いえ' } } }), k)).toEqual([]);
    const bad = run(lesson({ ...base, examples: [ex('{上|うえ}', 'うえ'), ex('かお', 'かお')], worked: [ex('あい', 'あい'), ex('いえ', 'いえ')], tirukan: { ja: 'あい', kana: 'あい', id: 'x' }, title: { id: 'x', en: 'x', ja: 'あ', kana: 'あ' }, pair: { off: { ja: 'あい', kana: 'あい' }, natural: { ja: 'いえ', kana: 'いえ' } } }), k);
    expect(bad).toContain('error: example 1: kanji in Kana 1');
    expect(bad).toContain('warn: example 2: kana not taught yet: か');
  });

  it('knows the inventory ids', () => {
    expect(run(lesson({ introduces: ['n5-nope'] }))).toContain('error: introduces "n5-nope", which is not in content/data/grammar.yaml');
  });
});
