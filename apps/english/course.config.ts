// English Ladder's course configuration. Reproduces the engine's historical English
// behaviour exactly, so the app looks and behaves identically after the extraction.
import type { CourseConfig } from '@ladder/core/course/types';
import { Contours } from '@ladder/core/components/ui/Contours';
import { ALLOWED_SETTINGS, DEFAULT_SETTINGS, SCHEMA_VERSION, STORAGE_KEY, migrations } from '@/course/progress';
import { baseStrings, extendStrings } from '@ladder/core/lib/i18n';
import { idOverrides, enOverrides } from '@/i18n/overrides';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, sentenceSplit, sampleText } from '@/course/speech';
import { adapter } from '@/course/adapter';
import { SoundStrand, TalkStrand, WordsStrand } from '@/components/StrandCards';
import { wordAnnotator } from '@/course/words';

export const course: CourseConfig = {
  id: 'english-ladder',
  name: 'English Ladder',
  rangeLabel: 'A1 → C1',
  storageKey: STORAGE_KEY,
  cachePrefix: 'english-ladder-',
  exportFilePrefix: 'english-ladder-progress',
  repoUrl: 'https://github.com/andifathulms/english-ladder',

  target: { lang: 'en', dir: 'ltr', fontClass: '', sentenceClass: '' },
  ui: { defaultLang: 'id' },

  strings: {
    id: extendStrings(baseStrings.id, idOverrides),
    en: extendStrings(baseStrings.en, enOverrides),
  },

  explainLangs: [
    { value: 'id', label: { id: 'ID', en: 'ID' } },
    { value: 'en', label: { id: 'EN', en: 'EN' } },
  ],

  settings: {
    defaults: DEFAULT_SETTINGS,
    allowed: ALLOWED_SETTINGS,
    options: {
      accents: [
        { value: 'gb', label: { id: 'Britania', en: 'British' } },
        { value: 'us', label: { id: 'Amerika', en: 'American' } },
      ],
      voices: [
        { value: 'female', label: { id: 'Perempuan', en: 'Female' } },
        { value: 'male', label: { id: 'Laki-laki', en: 'Male' } },
      ],
    },
  },

  progress: { schemaVersion: SCHEMA_VERSION, migrations },

  speech: { voiceScorer, sentenceSplit, canSpeak, sampleText },

  text,

  adapter,
  ladder: {
    // The rung board names the explanation language the rung's lessons default to.
    rungMeta: (rung, t) => [t('rung.explainLang'), ': ', t(`rung.explain.${rung.explain_lang as string}`)],
  },
  strands: { examples: [TalkStrand, SoundStrand], contrast: [WordsStrand] },

  visuals: registry,
  visualIds: VISUAL_IDS,
  boardPattern: Contours,

  extraData: { wordAnnotator },
};
