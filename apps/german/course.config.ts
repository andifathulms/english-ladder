// German Ladder's course configuration: everything the shared engine needs to run the course
// (docs/german/CLAUDE.md, adjusted by docs/german/plan.md).
import type { CourseConfig } from '@ladder/core/course/types';
import { Contours } from '@ladder/core/components/ui/Contours';
import { baseStrings, extendStrings } from '@ladder/core/lib/i18n';
import { idOverrides, enOverrides, type GermanKey } from '@/i18n/overrides';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { adapter } from '@/course/adapter';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, sentenceSplit, sampleText } from '@/course/speech';
import { GermanSentence } from '@/components/slots';
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
  components: { Sentence: GermanSentence },
  lesson: { explain: 'ui' },
  ladder: { tiers: ['hard', 'medium', 'easy', 'dasar'] },
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

  visuals: registry as CourseConfig['visuals'],
  visualIds: VISUAL_IDS,
  boardPattern: Contours,
};
