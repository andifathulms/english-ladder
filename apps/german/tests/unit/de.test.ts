import { describe, expect, it } from 'vitest';
import {
  adjEnding,
  article,
  capsCheck,
  compound,
  determinerReadings,
  genderClue,
  normDe,
  pronoun,
  separate,
  stressOf,
  syllabify,
  validOrder,
  zonesOf,
  type Kase,
  type Zone,
} from '@/lib/de';

const KASES: Kase[] = ['nom', 'akk', 'dat', 'gen'];

describe('article', () => {
  // m f n pl, per case
  const table = (type: Parameters<typeof article>[0]) =>
    KASES.map((k) => [article(type, 'm', 'sg', k), article(type, 'f', 'sg', k), article(type, 'n', 'sg', k), article(type, 'm', 'pl', k)]);
  it('definite', () => {
    expect(table('def')).toEqual([
      ['der', 'die', 'das', 'die'],
      ['den', 'die', 'das', 'die'],
      ['dem', 'der', 'dem', 'den'],
      ['des', 'der', 'des', 'der'],
    ]);
  });
  it('indefinite (no plural)', () => {
    expect(table('indef')).toEqual([
      ['ein', 'eine', 'ein', null],
      ['einen', 'eine', 'ein', null],
      ['einem', 'einer', 'einem', null],
      ['eines', 'einer', 'eines', null],
    ]);
  });
  it('kein', () => {
    expect(table('kein')).toEqual([
      ['kein', 'keine', 'kein', 'keine'],
      ['keinen', 'keine', 'kein', 'keine'],
      ['keinem', 'keiner', 'keinem', 'keinen'],
      ['keines', 'keiner', 'keines', 'keiner'],
    ]);
  });
  it('possessives, including euer → eure', () => {
    expect(table('mein')[1]).toEqual(['meinen', 'meine', 'mein', 'meine']);
    expect(table('unser')[2]).toEqual(['unserem', 'unserer', 'unserem', 'unseren']);
    expect(table('euer')[0]).toEqual(['euer', 'eure', 'euer', 'eure']);
    expect(table('euer')[1]).toEqual(['euren', 'eure', 'euer', 'eure']);
    expect(table('Ihr')[2]).toEqual(['Ihrem', 'Ihrer', 'Ihrem', 'Ihren']);
  });
  it('the agreement lint can read a form back', () => {
    const r = determinerReadings();
    expect(r.get('den')!.map((x) => `${x.kase}-${x.number === 'pl' ? 'pl' : x.gender}`).sort()).toEqual(['akk-m', 'dat-pl']);
    expect(r.get('dem')!.length).toBe(2); // dat m, dat n
    expect(r.has('ein')).toBe(true);
  });
});

describe('pronoun', () => {
  it('nominative, accusative, dative', () => {
    const row = (k: Kase) => (['ich', 'du', 'er', 'sie-sg', 'es', 'wir', 'ihr', 'sie-pl', 'Sie'] as const).map((p) => pronoun(p, k));
    expect(row('nom')).toEqual(['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'Sie']);
    expect(row('akk')).toEqual(['mich', 'dich', 'ihn', 'sie', 'es', 'uns', 'euch', 'sie', 'Sie']);
    expect(row('dat')).toEqual(['mir', 'dir', 'ihm', 'ihr', 'ihm', 'uns', 'euch', 'ihnen', 'Ihnen']);
  });
});

describe('adjEnding', () => {
  it('weak, mixed and strong', () => {
    expect(adjEnding('weak', 'm', 'sg', 'nom')).toBe('e'); // der große Tisch
    expect(adjEnding('weak', 'm', 'sg', 'akk')).toBe('en'); // den großen Tisch
    expect(adjEnding('mixed', 'm', 'sg', 'nom')).toBe('er'); // ein großer Tisch
    expect(adjEnding('mixed', 'n', 'sg', 'akk')).toBe('es'); // ein großes Haus
    expect(adjEnding('strong', 'f', 'sg', 'dat')).toBe('er'); // mit kalter Milch
    expect(adjEnding('strong', 'm', 'pl', 'nom')).toBe('e'); // große Tische
  });
});

describe('separate', () => {
  it('splits a separable prefix and leaves others', () => {
    expect(separate({ inf: 'aufstehen', sep: 'auf' })).toEqual({ prefix: 'auf', base: 'stehen' });
    expect(separate({ inf: 'fernsehen', sep: 'fern' })).toEqual({ prefix: 'fern', base: 'sehen' });
    expect(separate({ inf: 'verstehen' })).toEqual({ prefix: null, base: 'verstehen' });
  });
});

// ---------- bracket ----------
// Tiles split by " | "; ^ marks the finite verb, $ an end-zone tile. Main clauses: the first tile is
// position 1. Subordinate clauses: the first tile is the conjunction, the verb last.
const MAIN = [
  'Ich | ^wohne | in Balikpapan',
  'Ich | ^heiße | Rina',
  'Ich | ^komme | aus Indonesien',
  'Du | ^arbeitest | im Krankenhaus',
  'Budi | ^lernt | jeden Tag | Deutsch',
  'Wir | ^trinken | morgens | Kaffee',
  'Mein Bruder | ^ist | Mechaniker',
  'Sie | ^hat | zwei Kinder',
  'Ich | ^habe | einen Bruder',
  'Dewi | ^kauft | heute | Brot',
  'Das Buch | ^liegt | auf dem Tisch',
  'Ich | ^möchte | einen Kaffee',
  'Der Bus | ^kommt | um 8 Uhr',
  'Andi | ^spielt | am Sonntag | Fußball',
  'Meine Mutter | ^kocht | heute | Rendang',
  'Wir | ^wohnen | seit zwei Jahren | in Berlin',
  'Ich | ^brauche | eine Fahrkarte',
  'Er | ^sucht | eine Wohnung',
  'Die Kinder | ^spielen | im Garten',
  'Siti | ^arbeitet | als Pflegerin',
  'Ich | ^stehe | um 6 Uhr | $auf',
  'Ich | ^stehe | heute | um 6 Uhr | $auf',
  'Rina | ^ruft | ihre Mutter | $an',
  'Wir | ^kaufen | am Samstag | $ein',
  'Er | ^sieht | am Abend | $fern',
  'Der Zug | ^kommt | um 9 Uhr | $an',
  'Ich | ^hole | die Kinder | um 3 Uhr | $ab',
  'Putu | ^räumt | sein Zimmer | $auf',
  'Die Arbeit | ^fängt | um 7 Uhr | $an',
  'Du | ^steigst | am Bahnhof | $um',
  'Ich | ^kann | gut | $schwimmen',
  'Ich | ^muss | heute | $arbeiten',
  'Wir | ^wollen | am Wochenende | nach Hamburg | $fahren',
  'Du | ^darfst | hier nicht | $rauchen',
  'Mei | ^kann | ein bisschen Deutsch | $sprechen',
  'Ich | ^muss | um 5 Uhr | $aufstehen',
  'Er | ^soll | morgen | zum Arzt | $gehen',
  'Sie | ^möchte | eine Ausbildung | $machen',
  'Wir | ^müssen | die Formulare | $ausfüllen',
  'Yohanes | ^will | in Deutschland | $arbeiten',
  'Ich | ^habe | gestern | $gearbeitet',
  'Wir | ^sind | nach Berlin | $gefahren',
  'Er | ^hat | einen Kuchen | $gekauft',
  'Ich | ^bin | um 6 Uhr | $aufgestanden',
  'Sie | ^hat | ihre Mutter | $angerufen',
  'Budi | ^ist | zu Hause | $geblieben',
  'Wir | ^haben | am Samstag | $eingekauft',
  'Du | ^hast | Deutsch | $gelernt',
  'Ich | ^war | gestern | im Krankenhaus',
  'Er | ^hatte | keine Zeit',
  'Ich | ^werde | Pflegerin',
  'Der Arzt | ^gibt | dem Patienten | eine Tablette',
  'Ich | ^lege | das Buch | auf den Tisch',
  'Sie | ^stellt | die Flasche | in den Kühlschrank',
  'Mir | ^tut | der Kopf | $weh',
  'Wir | ^fahren | mit dem Bus | zur Arbeit',
  'Ich | ^gehe | zu Fuß | nach Hause',
  'Die Apotheke | ^ist | neben der Bank',
  'Mein Handy | ^ist | in der Tasche',
  'Wir | ^können | morgen | zusammen | $kochen',
];

const QUESTIONS = [
  '^Wohnst | du | hier',
  '^Kommst | du | aus Indonesien',
  '^Hast | du | Kinder',
  '^Sprechen | Sie | Deutsch',
  '^Kannst | du | mir | $helfen',
  '^Stehst | du | früh | $auf',
  '^Hast | du | gestern | $gearbeitet',
  '^Bist | du | mit dem Bus | $gefahren',
  '^Möchten | Sie | einen Tee',
  '^Musst | du | heute | $arbeiten',
  '^Rufst | du | mich | morgen | $an',
  '^Ist | das | dein Schlüssel',
];

const SUB = [
  'weil | ich | müde | ^bin',
  'weil | er | heute | $arbeiten | ^muss',
  'dass | du | gut | Deutsch | ^sprichst',
  'weil | sie | um 6 Uhr | $auf | ^steht',
  'dass | wir | gestern | $gearbeitet | ^haben',
  'weil | der Bus | nicht | ^kommt',
  'dass | er | nach Berlin | $gefahren | ^ist',
  'weil | ich | keine Zeit | ^habe',
  'dass | Rina | eine Ausbildung | $machen | ^will',
  'weil | die Kinder | im Garten | ^spielen',
];

type Parsed = { tiles: string[]; zones: Zone[] };
function parse(s: string, clause: 'main' | 'question' | 'sub'): Parsed {
  const raw = s.split(' | ');
  const tiles = raw.map((t) => t.replace(/^[\^$]/, ''));
  const zones = raw.map((t, i): Zone => {
    if (t.startsWith('^')) return 'verb';
    if (t.startsWith('$')) return 'end';
    return (clause === 'main' || clause === 'sub') && i === 0 ? 'p1' : 'middle';
  });
  return { tiles, zones };
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s: string) => (/^(Ich|Du|Er|Wir|Es)$/.test(s.split(' ')[0]) ? s.charAt(0).toLowerCase() + s.slice(1) : s);

describe('bracket: validOrder', () => {
  let sentences = 0;

  for (const s of MAIN) {
    const { tiles, zones } = parse(s, 'main');
    it(`main: ${tiles.join(' ')}`, () => {
      expect(validOrder(tiles, tiles, zones, 'main')).toBe(true);
      sentences++;
      const verbAt = zones.indexOf('verb');
      const movable = tiles.map((_, i) => i).filter((i) => zones[i] === 'p1' || zones[i] === 'middle');
      // Front each other constituent: "Heute stehe ich um 6 Uhr auf".
      for (const i of movable.slice(1)) {
        const rest = movable.filter((j) => j !== i).map((j) => low(tiles[j]));
        const ends = tiles.filter((_, j) => zones[j] === 'end');
        const given = [cap(tiles[i]), tiles[verbAt], ...rest, ...ends];
        expect(validOrder(given, tiles, zones, 'main'), given.join(' ')).toBe(true);
        sentences++;
      }
      // Verb third (when there is a middle): wrong.
      if (tiles.length > 3 && zones[2] === 'middle') {
        const v3 = [tiles[0], tiles[2], tiles[1], ...tiles.slice(3)];
        expect(validOrder(v3, tiles, zones, 'main'), v3.join(' ')).toBe(false);
      }
      // The end part not at the end: wrong (*Ich stehe auf um 6 Uhr).
      const endAt = zones.indexOf('end');
      if (endAt > 2) {
        const early = [...tiles.slice(0, 2), tiles[endAt], ...tiles.slice(2, endAt), ...tiles.slice(endAt + 1)];
        expect(validOrder(early, tiles, zones, 'main'), early.join(' ')).toBe(false);
      }
      // Verb first in a statement: wrong.
      const v1 = [tiles[verbAt], low(tiles[0]), ...tiles.slice(2)];
      expect(validOrder(v1, tiles, zones, 'main')).toBe(false);
    });
  }

  for (const s of QUESTIONS) {
    const { tiles, zones } = parse(s, 'question');
    it(`question: ${tiles.join(' ')}?`, () => {
      expect(validOrder(tiles, tiles, zones, 'question')).toBe(true);
      sentences++;
      // The statement order is not a yes/no question.
      const statement = [cap(tiles[1]), low(tiles[0]), ...tiles.slice(2)];
      expect(validOrder(statement, tiles, zones, 'question')).toBe(false);
    });
  }

  for (const s of SUB) {
    const { tiles, zones } = parse(s, 'sub');
    it(`subordinate: ${tiles.join(' ')}`, () => {
      expect(validOrder(tiles, tiles, zones, 'sub')).toBe(true);
      sentences++;
      // The verb in second place (main-clause order) is wrong after weil/dass.
      const verb = tiles[tiles.length - 1];
      const v2 = [tiles[0], tiles[1], verb, ...tiles.slice(2, -1)];
      expect(validOrder(v2, tiles, zones, 'sub'), v2.join(' ')).toBe(false);
    });
  }

  it('covers at least 150 valid sentences', () => {
    expect(sentences).toBeGreaterThanOrEqual(150);
  });

  it('zonesOf labels a fronted order for feedback', () => {
    const { tiles, zones } = parse('Ich | ^stehe | heute | um 6 Uhr | $auf', 'main');
    expect(zonesOf(['Heute', 'stehe', 'ich', 'um 6 Uhr', 'auf'], tiles, zones)).toEqual(['p1', 'verb', 'middle', 'middle', 'end']);
  });
  it('rejects a different number of tiles', () => {
    const { tiles, zones } = parse('Ich | ^wohne | in Balikpapan', 'main');
    expect(validOrder(['Ich', 'wohne'], tiles, zones)).toBe(false);
  });
});

// ---------- spelling ----------
describe('normDe', () => {
  it('strict: exact, with a free sentence-start capital', () => {
    expect(normDe('Straße', 'Straße')).toEqual({ correct: true, notes: [] });
    expect(normDe('ich wohne hier.', 'Ich wohne hier')).toEqual({ correct: true, notes: [] });
    expect(normDe('Strasse', 'Straße')).toEqual({ correct: false, notes: [] });
    expect(normDe('Mutter', 'Mütter')).toEqual({ correct: false, notes: [] });
  });
  it('lenient: digraphs pass with a note', () => {
    expect(normDe('Strasse', 'Straße', { spelling: 'lenient' })).toEqual({ correct: true, notes: ['digraph'] });
    expect(normDe('Muetter', 'Mütter', { spelling: 'lenient' })).toEqual({ correct: true, notes: ['digraph'] });
    expect(normDe('schoen', 'schön', { spelling: 'lenient' })).toEqual({ correct: true, notes: ['digraph'] });
  });
  it('lenient umlaut only when allowed', () => {
    expect(normDe('Mutter', 'Mütter', { spelling: 'lenient' }).correct).toBe(false);
    expect(normDe('Mutter', 'Mütter', { spelling: 'lenient', umlautLenient: true })).toEqual({ correct: true, notes: ['umlaut'] });
  });
  it('a digraph only counts where the expected word has the umlaut', () => {
    // "Feuer" has a real ue; it must not match "Feür".
    expect(normDe('Feuer', 'Feuer', { spelling: 'lenient' })).toEqual({ correct: true, notes: [] });
    expect(normDe('Masse', 'Maße', { spelling: 'lenient' })).toEqual({ correct: true, notes: ['digraph'] });
  });
  it('caps: a lower-case noun is wrong with a note, unless nounCaps is off', () => {
    expect(normDe('ich habe einen bruder', 'Ich habe einen Bruder')).toEqual({ correct: false, notes: ['caps'] });
    expect(normDe('ich habe einen bruder', 'Ich habe einen Bruder', { nounCaps: false })).toEqual({ correct: true, notes: [] });
    expect(capsCheck('ich habe einen bruder', 'Ich habe einen Bruder')).toEqual(['Bruder']);
  });
  it('ignores German quotation marks and trailing punctuation', () => {
    expect(normDe('„Hallo!“', 'Hallo').correct).toBe(true);
  });
});

// ---------- syllables ----------
describe('syllabify and stressOf', () => {
  it.each([
    ['Mutter', ['Mut', 'ter']],
    ['Arbeit', ['Ar', 'beit']],
    ['Schule', ['Schu', 'le']],
    ['Kaffee', ['Kaf', 'fee']],
    ['Deutsch', ['Deutsch']],
  ])('%s', (word, parts) => {
    expect(syllabify(word)).toEqual(parts);
  });
  it('stress: first syllable, after an unstressed prefix, and on -ieren', () => {
    expect(stressOf('Arbeit')).toBe(0);
    expect(stressOf('verstehen')).toBe(1);
    expect(stressOf('studieren')).toBe(1);
  });
});

describe('genderClue and compound (basics)', () => {
  it('clues', () => {
    expect(genderClue('Zeitung')?.gender).toBe('f');
    expect(genderClue('Mädchen')?.gender).toBe('n');
    expect(genderClue('Lehrer', { person: true })?.gender).toBe('m');
    expect(genderClue('Zimmer')).toBeNull(); // -er only for people
    expect(genderClue('Baum')).toBeNull(); // -aum is not Latin -um
    expect(genderClue('Zentrum')?.gender).toBe('n');
  });
  it('compound', () => {
    expect(compound(['Arbeit', 'Platz'], ['s'], 'm')).toEqual({ word: 'Arbeitsplatz', gender: 'm' });
    expect(compound(['Kranken', 'Haus'])).toEqual({ word: 'Krankenhaus' });
  });
});

describe('syllabify with prefixes', () => {
  it.each([
    ['verstehen', ['ver', 'ste', 'hen'], 1],
    ['Gemüse', ['Ge', 'mü', 'se'], 1],
    ['bezahlen', ['be', 'zah', 'len'], 1],
    ['Erde', ['Er', 'de'], 0],
    ['gestern', ['ges', 'tern'], 0],
  ])('%s', (word, parts, stress) => {
    expect(syllabify(word)).toEqual(parts);
    expect(stressOf(word)).toBe(stress);
  });
});
