// Spanish Ladder's course configuration: everything the shared engine needs to run the course
// (docs/spanish/CLAUDE.md, adjusted by docs/spanish/plan.md).
import type { CourseConfig } from '@ladder/core/course/types';
import { baseStrings, extendStrings } from '@ladder/core/lib/i18n';
import { idOverrides, enOverrides, type SpanishKey } from '@/i18n/overrides';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { adapter } from '@/course/adapter';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, sentenceSplit, sampleText } from '@/course/speech';
import { ClimbExtra, DeleChip, DoorNote, SpanishSentence, WordmarkEscalera, rungSubtitle } from '@/components/slots';
import { Azulejo } from '@/components/Azulejo';
import { SoundStrand, SpainStrand, TalkStrand, TirukanStrand, WordsStrand } from '@/components/StrandCards';
import { WordsRow, matchesWord } from '@/components/WordsRow';
import { WordDeckPanel } from '@/components/decks';
import { checkSlots } from '@/components/check/slots';
import { answerText, itemText, itemTypes } from '@/course/items';
import { ALLOWED_SETTINGS, DEFAULT_SETTINGS, EXTENSIONS, SCHEMA_VERSION, STORAGE_KEY, THEME_COLOR, onCompleteLesson } from '@/course/progress';

export const course: CourseConfig = {
  id: 'spanish-ladder',
  name: 'Spanish Ladder',
  // DESIGN §2 asks for "A1 → C1 · DELE" beside *escalera*; that wraps in the sidebar and the phone header,
  // so the wordmark keeps A1 → C1 and every rung chip carries DELE.
  rangeLabel: 'A1 → C1',
  storageKey: STORAGE_KEY,
  cachePrefix: 'spanish-ladder-',
  exportFilePrefix: 'spanish-ladder-progress',
  repoUrl: 'https://github.com/andifathulms/spanish-ladder',

  // Spanish lines are neutral Latin American (es-419); España lines set es-ES themselves.
  target: { lang: 'es-419', dir: 'ltr', fontClass: '', sentenceClass: '' },
  shell: { dir: 'ltr' },
  ui: { defaultLang: 'id' },

  strings: {
    id: extendStrings<SpanishKey>(baseStrings.id, idOverrides),
    en: extendStrings<SpanishKey>(baseStrings.en, enOverrides),
  },

  // v1: explanations follow the UI language (plan R3); the id → mixed → es fade arrives with Medium 2.
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
        group: 'sound',
        key: 'variety',
        labelKey: 'settings.variety',
        options: [
          { value: 'latam', labelKey: 'settings.variety.latam' },
          { value: 'es', labelKey: 'settings.variety.es' },
        ],
      },
      {
        group: 'study',
        key: 'accentStrict',
        labelKey: 'settings.accentStrict',
        hintKey: 'settings.accentStrictHint',
        options: [
          { value: 'rung', labelKey: 'settings.accentStrict.rung' },
          { value: 'always', labelKey: 'settings.accentStrict.always' },
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
  // Recorded audio first (Dasar pairs, stress pairs, Tirukan); the default variety is Latin American.
  audio: { defaultVariety: 'latam' },
  text,
  adapter,
  itemTypes,
  itemText,
  answerText,
  check: checkSlots,
  // The accent bar under every text field (CLAUDE.md §5.3).
  input: {
    accentKeys: [
      { char: 'á', labelKey: 'accent.a' },
      { char: 'é', labelKey: 'accent.e' },
      { char: 'í', labelKey: 'accent.i' },
      { char: 'ó', labelKey: 'accent.o' },
      { char: 'ú', labelKey: 'accent.u' },
      { char: 'ü', labelKey: 'accent.ue' },
      { char: 'ñ', labelKey: 'accent.n' },
      { char: '¿', labelKey: 'accent.q' },
      { char: '¡', labelKey: 'accent.x' },
    ],
  },
  components: { Sentence: SpanishSentence, WordmarkExtra: WordmarkEscalera },
  strands: {
    examples: [SoundStrand, SpainStrand, TalkStrand, TirukanStrand],
    contrast: [WordsStrand],
  },
  lesson: { explain: 'ui' },
  ladder: {
    tiers: ['hard', 'medium', 'easy', 'dasar'],
    LevelChip: DeleChip,
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
    // soon places the learner in Easy 2, with Dasar and Easy 1 climbed (plan R8).
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
  boardPattern: Azulejo,
};
