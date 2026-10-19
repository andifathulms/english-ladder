// Kartu kata and Kartu kanji (PRD §5.7): built from the imported lists, taught by lessons, on the core deck.
import { beforeEach, describe, expect, it } from 'vitest';
import { decksData, deckLevels, kanjiDeck, wordDeck, wordIdOf } from '@/course/decks';
import { getLessons, model } from '@/course/content';
import { onCompleteLesson } from '@/course/progress';
import { emptyState } from '@ladder/core/lib/progress/defaults';
import { kunShown } from '@/components/decks';

describe('the decks', () => {
  it('give N5 one word deck and one kanji deck, placed on Easy 1', () => {
    expect(deckLevels()).toEqual([{ level: 'N5', rung: 'easy-1', name: 'Easy 1' }]);
    const d = decksData();
    expect(d.words.map((x) => x.level)).toEqual(['N5']);
    expect(d.words[0].words.length).toBeGreaterThan(700);
    expect(d.kanji[0].words.length).toBeGreaterThanOrEqual(79);
  });
  it('use a lesson glossary for the Indonesian meaning, and mark the rest English', () => {
    const words = wordDeck('N5');
    const gakusei = words.find((w) => w.ja === '学生')!;
    expect(gakusei).toMatchObject({ mean: 'pelajar, mahasiswa', meanLang: 'id', lesson: 'easy1-01-hajimemashite' });
    expect(words.some((w) => w.meanLang === 'en')).toBe(true);
    expect(new Set(words.map((w) => w.id)).size).toBe(words.length);
  });
  it('give each kanji its readings, examples and an id k-<char>', () => {
    const kanji = kanjiDeck('N5');
    const shoku = kanji.find((k) => k.char === '食')!;
    expect(shoku.id).toBe('k-食');
    expect(shoku.on).toContain('ショク');
    expect(shoku.kun.map(kunShown)).toContain('た(べる)');
    expect(shoku.meaning).toEqual({ text: 'makan', lang: 'id' });
    expect(shoku.examples.length).toBeGreaterThan(0);
    // Kanji a lesson introduces are in the deck even when the list has no level for them (分).
    expect(kanji.find((k) => k.char === '分')).toMatchObject({ lesson: 'easy1-06-nanji' });
  });
});

describe('lesson completion', () => {
  beforeEach(() => localStorage.clear());
  it('teaches the glossary words and the new kanji into their decks', () => {
    const lesson = getLessons('easy-1', { includeDrafts: true })[0];
    const data = model.lessonData!(lesson as never) as { wordIds: string[]; kanjiIds: string[] };
    expect(data.kanjiIds).toEqual(['k-人', 'k-日', 'k-本', 'k-学', 'k-生', 'k-先']);
    expect(data.wordIds).toContain(wordIdOf({ ja: '{学生|がく|せい}', kana: 'がくせい' }));
    const s = onCompleteLesson({ ...emptyState(), deck: {}, kanjiDeck: {} } as never, lesson.id, data);
    expect(Object.keys(s.deck as object)).toEqual(expect.arrayContaining(data.wordIds));
    expect((s.kanjiDeck as Record<string, { learned: boolean }>)['k-学'].learned).toBe(true);
  });
});
