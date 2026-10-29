// German Ladder's course configuration: everything the shared engine needs to run the course
// (docs/german/CLAUDE.md, adjusted by docs/german/plan.md).
import type { CourseConfig } from '@ladder/core/course/types';
import { baseStrings, extendStrings } from '@ladder/core/lib/i18n';
import { idOverrides, enOverrides, type GermanKey } from '@/i18n/overrides';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { adapter } from '@/course/adapter';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, sentenceSplit, sampleText } from '@/course/speech';
import { CefrChip, ClimbExtra, DoorNote, GermanSentence, WordmarkLeiter, rungSubtitle } from '@/components/slots';
import { Bauhaus } from '@/components/Bauhaus';
import { SoundStrand, TalkStrand, TirukanStrand, WordsStrand, WorkStrand } from '@/components/StrandCards';
import { WordsRow, matchesWord } from '@/components/WordsRow';
import { WordDeckPanel } from '@/components/decks';
import { answerText, itemText, itemTypes } from '@/course/items';
import { checkSlots } from '@/components/check/slots';
import { ALLOWED_SETTINGS, DEFAULT_SETTINGS, EXTENSIONS, SCHEMA_VERSION, STORAGE_KEY, THEME_COLOR, onCompleteLesson } from '@/course/progress';

export const course: CourseConfig = {
  id: 'german-ladder',
  name: 'German Ladder',
  // DESIGN §2's "A1 → C1 · GOETHE" wraps beside *Leiter* (as Spanish's did); rung chips carry the exits.
  rangeLabel: 'A1 → C1',
  storageKey: STORAGE_KEY,
  cachePrefix: 'german-ladder-',
  exportFilePrefix: 'german-ladder-progress',
  repoUrl: 'https://github.com/andifathulms/german-ladder',

  target: { lang: 'de', dir: 'ltr', fontClass: '', sentenceClass: '' },
  shell: { dir: 'ltr' },
  ui: { defaultLang: 'id' },

  strings: {
    id: extendStrings<GermanKey>(baseStrings.id, idOverrides),
    en: extendStrings<GermanKey>(baseStrings.en, enOverrides),
  },

  // v1: explanations follow the UI language (plan R7); the id → mixed → de fade arrives with Medium 2.
  explainLangs: [],

  settings: {
    defaults: DEFAULT_SETTINGS,
    allowed: ALLOWED_SETTINGS,
    options: {
      accents: [],
      voices: [
        { value: 'female', label: { id: 'Perempuan', en: 'Female' } },
        { value: 'male', label: { id: 'Laki-laki', en: 'Male' } },
      ],
    },
    rows: [
      {
        group: 'display',
        key: 'caseColours',
        labelKey: 'settings.caseColours',
        hintKey: 'settings.caseColoursHint',
        options: [
          { value: 'rung', labelKey: 'settings.caseColours.rung' },
          { value: 'on', labelKey: 'settings.caseColours.on' },
          { value: 'off', labelKey: 'settings.caseColours.off' },
        ],
      },
      {
        group: 'study',
        key: 'spellingStrict',
        labelKey: 'settings.spellingStrict',
        hintKey: 'settings.spellingStrictHint',
        options: [
          { value: 'rung', labelKey: 'settings.spellingStrict.rung' },
          { value: 'always', labelKey: 'settings.spellingStrict.always' },
        ],
      },
      { group: 'study', key: 'deckDaily', labelKey: 'settings.deckDaily', options: [{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 20, label: '20' }] },
      {
        group: 'study',
        key: 'deckFace',
        labelKey: 'settings.deckFace',
        options: [
          { value: 'word', labelKey: 'settings.deckFace.word' },
          { value: 'meaning', labelKey: 'settings.deckFace.meaning' },
          { value: 'audio', labelKey: 'settings.deckFace.audio' },
        ],
      },
    ],
  },
  progress: { schemaVersion: SCHEMA_VERSION, features: { capstones: true, placement: true }, extensions: EXTENSIONS, onCompleteLesson },

  speech: { voiceScorer, sentenceSplit, canSpeak, sampleText },
  // Recorded audio first (Dasar pairs, Tirukan); everything else the browser's de-DE voice.
  audio: {},
  text,
  adapter,
  itemTypes,
  itemText,
  answerText,
  check: checkSlots,
  // The accent bar under every text field (CLAUDE.md §5.3): ä ö ü ß, and Ä Ö Ü for nouns (Äpfel, Übung).
  // Core's bar has no shift layer, so the capitals are keys of their own.
  input: {
    accentKeys: [
      { char: 'ä', labelKey: 'accent.ae' },
      { char: 'ö', labelKey: 'accent.oe' },
      { char: 'ü', labelKey: 'accent.ue' },
      { char: 'ß', labelKey: 'accent.ss' },
      { char: 'Ä', labelKey: 'accent.AE' },
      { char: 'Ö', labelKey: 'accent.OE' },
      { char: 'Ü', labelKey: 'accent.UE' },
    ],
  },
  components: { Sentence: GermanSentence, WordmarkExtra: WordmarkLeiter },
  strands: {
    examples: [SoundStrand, WorkStrand, TalkStrand, TirukanStrand],
    contrast: [WordsStrand],
  },
  lesson: { explain: 'ui' },
  ladder: {
    tiers: ['hard', 'medium', 'easy', 'dasar'],
    LevelChip: CefrChip,
    rungSubtitle: (r) => rungSubtitle(r),
  },
  home: {
    welcome: 'twoDoor',
    // Door 1 opens Easy 1, lesson 1; Dasar is optional, offered in the line under the door.
    firstRung: (rungs) => rungs.find((r) => r.id === 'easy-1'),
    DoorNote,
  },
  placement: {
    sections: ['dasar', 'easy1', 'easy2', 'easy3'],
    // The first rung where a section is under 75% (PRD §5.2). Passing everything while Easy 3 is still
    // soon places the learner in Easy 2, with Dasar and Easy 1 climbed.
    outcomes: [
      { result: 'easy-2', requires: [{ section: 'dasar', min: 0.75 }, { section: 'easy1', min: 0.75 }], climbs: ['dasar', 'easy-1'] },
      { result: 'easy-1', requires: [{ section: 'dasar', min: 0.75 }], climbs: ['dasar'] },
      { result: 'dasar', climbs: [] },
    ],
    retakeRung: 'easy-1',
  },
  climb: { Extra: ClimbExtra },
  words: {
    match: matchesWord,
    Row: WordsRow,
    tabs: { titleKey: 'words.tab', list: [{ hash: 'deck', labelKey: 'words.deckTab', Panel: WordDeckPanel }] },
  },
  themeColor: THEME_COLOR,
  // The English Ladder fixes the siblings ship with (all on).
  fixes: {
    reviewExit: true,
    capstoneDone: true,
    lessonScopedToggles: true,
    testProgressLabel: true,
    climbTitleTranslated: true,
    themeColorFollowsTheme: true,
    glossaryAudio: true,
    wordsGroupLabel: true,
    cefrLabelLocalised: true,
  },

  visuals: registry,
  visualIds: VISUAL_IDS,
  boardPattern: Bauhaus,
};
