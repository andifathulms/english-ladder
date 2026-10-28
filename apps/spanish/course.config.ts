// Spanish Ladder's course configuration: everything the shared engine needs to run the course
// (docs/spanish/CLAUDE.md, adjusted by docs/spanish/plan.md).
import type { CourseConfig } from '@ladder/core/course/types';
import { Contours } from '@ladder/core/components/ui/Contours';
import { baseStrings, extendStrings } from '@ladder/core/lib/i18n';
import { idOverrides, enOverrides, type SpanishKey } from '@/i18n/overrides';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { adapter } from '@/course/adapter';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, sentenceSplit, sampleText } from '@/course/speech';
import { SpanishSentence } from '@/components/slots';
import { ALLOWED_SETTINGS, DEFAULT_SETTINGS, EXTENSIONS, SCHEMA_VERSION, STORAGE_KEY, THEME_COLOR, onCompleteLesson } from '@/course/progress';

export const course: CourseConfig = {
  id: 'spanish-ladder',
  name: 'Spanish Ladder',
  rangeLabel: 'A1 → C1 · DELE',
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
  components: { Sentence: SpanishSentence },
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
