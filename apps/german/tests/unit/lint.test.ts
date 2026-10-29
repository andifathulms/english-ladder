import { describe, expect, it } from 'vitest';
import { getCurriculum, getData, getLessons } from '@/course/content';
import { bracketFocusError, lintLessons } from '@/course/lint';
import type { CheckItem, GlossaryEntry, Lesson } from '@/course/types';

// The real data and curriculum, with the sample lesson changed per case.
const rungs = getCurriculum();
const data = getData();
const base = getLessons('easy-1', { includeDrafts: true }).find((l) => l.id === 'easy1-01-hallo')!;

type Opts = { order?: number; rung?: string; introduces?: string[] };
function lint(change: (l: Lesson) => Partial<Lesson>, opts: Opts = {}) {
  const lesson = { ...base, ...change(base), order: opts.order ?? base.order, rung: opts.rung ?? base.rung, introduces: opts.introduces ?? base.introduces } as Lesson;
  const byRung = new Map<string, Lesson[]>([[lesson.rung, [lesson]]]);
  return lintLessons(rungs, byRung, data);
}
const G = (de: string, pos: GlossaryEntry['pos'], extra: Partial<GlossaryEntry> = {}): GlossaryEntry => ({ de, id: 'x', pos, ...extra }) as GlossaryEntry;
const V = (de: string): GlossaryEntry => {
  const v = data.verbs.find((x) => x.inf === de)!;
  return G(de, 'verb', { verb: { aux: v.aux, partizip: v.partizip }, ...(v.sep ? { sep: v.sep } : {}) });
};
const N = (de: string): GlossaryEntry => {
  const n = data.nouns.find((x) => x.de === de)!;
  return G(de, 'noun', { gender: n.gender, ...(n.plural ? { plural: n.plural } : {}) });
};
/** One example line, with extra glossary words. */
const example = (de: string, glossary: GlossaryEntry[] = []) => (l: Lesson) => ({ examples: [...l.examples.slice(0, 5), { de, id: 'x' }], glossary: [...l.glossary.slice(0, 12 - glossary.length), ...glossary] });
const errors = (fs: { level: string; message: string }[]) => fs.filter((f) => f.level === 'error').map((f) => f.message).join('\n');
const warns = (fs: { level: string; message: string }[]) => fs.filter((f) => f.level === 'warn').map((f) => f.message).join('\n');
const E2 = { rung: 'easy-2', order: 12, introduces: ['a1-review'] };

describe('lint: the sample lesson', () => {
  it('is clean', () => expect(lint(() => ({}))).toEqual([]));
});

describe('lint: inventory detectors (CLAUDE.md §4.1)', () => {
  it('dative before Easy 2 lesson 6, except chunks', () => {
    expect(errors(lint(example('Ich fahre mit dem Bus.', [V('fahren'), N('Bus')])))).toMatch(/dem.*dative/);
    expect(errors(lint(example('Wie geht es [[dir]]?')))).toBe('');
  });
  it('dative is fine from Easy 2 lesson 6', () => {
    expect(errors(lint(example('Ich fahre mit dem Bus.', [V('fahren'), N('Bus')]), { rung: 'easy-2', order: 6, introduces: ['a1-dative-prepositions'] }))).not.toMatch(/dative/);
  });
  it('Perfekt before Easy 2 lesson 11', () => {
    expect(errors(lint(example('Ich habe gearbeitet.', [V('arbeiten'), V('haben')]), { rung: 'easy-2', order: 10, introduces: ['a1-forms'] }))).toMatch(/Perfekt/);
    expect(errors(lint(example('Ich habe gearbeitet.', [V('arbeiten'), V('haben')]), { rung: 'easy-2', order: 11, introduces: ['a1-perfekt-intro'] }))).not.toMatch(/Perfekt/);
  });
  it('weil and dass before Easy 3', () => {
    expect(errors(lint(example('Ich lerne, weil ich in Berlin arbeite.', [V('lernen'), V('arbeiten')]), E2))).toMatch(/weil.*Easy 3/);
  });
  it('genitive and Konjunktiv II before Medium 2', () => {
    expect(errors(lint(example('Das Auto des Lehrers.', [N('Auto'), N('Lehrer')]), E2))).toMatch(/des.*genitive/);
    expect(errors(lint(example('Ich wäre gern hier.', [V('sein')]), E2))).toMatch(/wäre.*Konjunktiv II/);
  });
  it('attributive adjective endings before Medium 1, but not taught phrases', () => {
    expect(errors(lint(example('Das ist ein kleines Haus.', [G('klein', 'adj'), N('Haus'), V('sein')]), E2))).toMatch(/kleines Haus.*Medium 1/);
    expect(errors(lint(example('[[Guten]] Morgen!')))).toBe('');
  });
  it('the passive before Medium 3', () => {
    expect(errors(lint(example('Die Tür wird geöffnet.', [N('Tür'), V('öffnen'), V('werden')]), E2))).toMatch(/passive/);
  });
  it('an imperative before Easy 2 lesson 5', () => {
    expect(errors(lint(example('Komm!', [V('kommen')]), { rung: 'easy-2', order: 4, introduces: ['a1-pronouns-akk'] }))).toMatch(/Komm.*imperative/);
  });
});

describe('lint: words, capitals and spelling (CLAUDE.md §4.5)', () => {
  it('an unknown word is a warning in a draft and an error once reviewed', () => {
    expect(warns(lint(example('Hallo, Giraffe!')))).toMatch(/unknown word "Giraffe"/);
    expect(errors(lint((l) => ({ ...example('Hallo, Giraffe!')(l), status: 'reviewed', review: { by: 'X', date: '2026-12-01' } })))).toMatch(/Giraffe/);
  });
  it('a noun written small', () => {
    expect(errors(lint(example('Das ist ein haus.', [N('Haus'), V('sein')]), E2))).toMatch(/"haus" is a noun: write "Haus"/);
  });
  it('ss for ß', () => {
    expect(errors(lint(example('Die Strasse ist hier.', [N('Straße'), V('sein')]), E2))).toMatch(/Strasse.*Straße/);
  });
  it('straight quotes and capital ẞ', () => {
    expect(errors(lint(example('Er sagt "Hallo".', [V('sagen')]), E2))).toMatch(/straight quotes/);
    expect(errors(lint(example('STRAẞE', [N('Straße')]), E2))).toMatch(/capital ẞ/);
  });
});

describe('lint: agreement (CLAUDE.md §4.2)', () => {
  it('article and noun gender', () => {
    expect(errors(lint(example('Das ist der Haus.', [N('Haus'), V('sein')]), E2))).toMatch(/der Haus.*n/);
    expect(errors(lint(example('Das ist das Haus.', [N('Haus'), V('sein')]), E2))).toBe('');
    expect(errors(lint(example('Die Kinder spielen.', [N('Kind'), V('spielen')]), E2))).toBe('');
  });
});

describe('lint: verb position and conjugation (CLAUDE.md §4.3, §4.4)', () => {
  it('the verb in position 2', () => {
    expect(warns(lint(example('Heute ich arbeite.', [V('arbeiten')]), E2))).toMatch(/position 2/);
    expect(warns(lint(example('Heute arbeite ich.', [V('arbeiten')]), E2))).not.toMatch(/position 2/);
  });
  it('the separable prefix at the end, and never joined in a main clause', () => {
    expect(errors(lint(example('Ich stehe auf um 6 Uhr.', [V('aufstehen')]), E2))).toMatch(/prefix goes to the end/);
    expect(errors(lint(example('Ich aufstehe um 6 Uhr.', [V('aufstehen')]), E2))).toMatch(/aufstehe.*separates/);
    expect(errors(lint(example('Ich stehe um 6 Uhr auf.', [V('aufstehen')]), E2))).toBe('');
  });
  it('the pronoun and the verb form agree', () => {
    expect(errors(lint(example('Ich wohnt in Berlin.', [V('wohnen')]), E2))).toMatch(/wohnt.*ich form of wohnen.*wohne/);
    expect(errors(lint(example('Wo wohnst du?', [V('wohnen')]), E2))).toBe('');
  });
  it('Kerja cards use Sie', () => {
    expect(errors(lint((l) => ({ work: { ...l.work!, lines: [...l.work!.lines.slice(0, 3), { who: 'Rina', de: 'Und dir?', id: 'x' }] } })))).toMatch(/Kerja card.*Sie/);
  });
});

describe('lint: check items against lib/de (CLAUDE.md §4.4)', () => {
  const withItem = (item: Partial<CheckItem>, glossary: GlossaryEntry[] = []) => (l: Lesson) => ({
    check: [...l.check.slice(0, 5), { id: 'x-1', why: { id: 'x', en: 'x' }, ...item } as CheckItem],
    glossary: [...l.glossary.slice(0, 12 - glossary.length), ...glossary],
  });
  it('form answers match conjugate()', () => {
    expect(errors(lint(withItem({ type: 'form', base: 'fahren', target: { person: 'er', tense: 'praesens' }, answer: 'fahrt' }, [V('fahren')]), E2))).toMatch(/fahrt.*fährt/);
  });
  it('gender items match nouns.yaml', () => {
    expect(errors(lint(withItem({ type: 'gender', noun: 'Haus', answer: 'm' }), E2))).toMatch(/Haus is n/);
  });
  it('case items: the article fits the role', () => {
    const item = (answer: string) => ({ type: 'case' as const, sentence: 'Ich habe ___ Bruder.', role: 'akk' as const, noun: 'Bruder', options: ['einen', 'ein'], answer });
    expect(errors(lint(withItem(item('ein'), [N('Bruder'), V('haben')]), E2))).toMatch(/not akk.*einen/);
    expect(errors(lint(withItem(item('einen'), [N('Bruder'), V('haben')]), E2))).toBe('');
  });
  it('wechsel items: motion takes the accusative', () => {
    const item = (answer: string, motion: boolean) => ({ type: 'wechsel' as const, scene: { place: 'on', motion }, sentence: 'Ich lege das Buch auf ___ Tisch.', verb: 'legen', options: ['den', 'dem'], answer });
    const g = [N('Buch'), N('Tisch'), V('legen')];
    const scope = { rung: 'easy-2', order: 7, introduces: ['a1-wechsel'] };
    expect(errors(lint(withItem(item('dem', true), g), scope))).toMatch(/not akk/);
    expect(errors(lint(withItem(item('den', true), g), scope))).not.toMatch(/not akk/);
  });
  it('wordorder zones describe the sentence', () => {
    type Z = ('p1' | 'verb' | 'middle' | 'end')[];
    const item = (answer: string[], zones: Z) => ({ type: 'wordorder' as const, tiles: [...answer].reverse(), answer, zones });
    expect(errors(lint(withItem(item(['Ich', 'auf', 'stehe'], ['p1', 'verb', 'end']), [V('aufstehen')]), E2))).toMatch(/"auf" is not a finite verb/);
    expect(errors(lint(withItem(item(['Ich', 'stehe', 'um 6 Uhr', 'auf'], ['p1', 'verb', 'middle', 'end']), [V('aufstehen')]), E2))).toBe('');
  });
});

describe('lint: data consistency', () => {
  it('glossary nouns and verbs match the data files', () => {
    expect(errors(lint(example('Hallo!', [G('Haus', 'noun', { gender: 'm', plural: 'Häuser' })])))).toMatch(/"Haus".*nouns.yaml/);
    expect(errors(lint(example('Hallo!', [G('fahren', 'verb', { verb: { aux: 'haben', partizip: 'gefahren' } })])))).toMatch(/"fahren".*verbs.yaml/);
  });
  it('Kata card bridges come from bridges.yaml', () => {
    expect(errors(lint((l) => ({ words: { id: 'x', en: 'x', bridges: ['Giraffe'] } })))).toMatch(/Giraffe.*bridges.yaml/);
  });
});

describe('bracket focus (G1)', () => {
  const f = (s: string) => bracketFocusError(s, (s.match(/\[\[/g) ?? []).length, data.formIndex);
  it('allows one mark, and two that form a bracket', () => {
    expect(f('Ich [[wohne]] hier.')).toBeNull();
    expect(f('Ich [[stehe]] um 6 Uhr [[auf]].')).toBeNull();
    expect(f('Ich [[kann]] gut [[schwimmen]].')).toBeNull();
    expect(f('Ich [[habe]] gestern [[gearbeitet]].')).toBeNull();
    expect(f('Wir [[sind]] nach Berlin [[gefahren]].')).toBeNull();
  });
  it('rejects two marks that are not one bracket, and three', () => {
    expect(f('[[Ich]] wohne in [[Berlin]].')).toMatch(/verbal bracket/);
    expect(f('Ich [[stehe]] [[um]] 6 Uhr [[auf]].')).toMatch(/3 \[\[focus\]\] marks/);
  });
});
