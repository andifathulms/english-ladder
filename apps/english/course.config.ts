// English Ladder's course configuration. Reproduces the engine's historical English
// behaviour exactly, so the app looks and behaves identically after the extraction.
import type { CourseConfig, Token } from '@ladder/core/course/types';
import { scoreVoice, pickVoice } from '@ladder/core/lib/speech/speak';
import {
  INVENTORY_DETECTORS,
  STRUCTURE_RULES,
  WORD_REGEX,
  knownWord as enKnownWord,
} from '@ladder/core/lib/content/lint-rules';
import { registry } from '@ladder/core/components/visuals/registry';
import { VISUAL_IDS } from '@ladder/core/lib/visualIds';
import { Contours } from '@ladder/core/components/ui/Contours';
import { DEFAULT_SETTINGS } from '@ladder/core/lib/progress/defaults';

/** Whitespace word tokeniser with character offsets (for speech-boundary highlighting). */
function tokenise(s: string): Token[] {
  const out: Token[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  return out;
}

export const course: CourseConfig = {
  id: 'english-ladder',
  name: 'English Ladder',
  rangeLabel: 'A1 → C1',
  storageKey: 'english-ladder:v1',
  cachePrefix: 'english-ladder-',
  exportFilePrefix: 'english-ladder-progress',
  repoUrl: 'https://github.com/andifathulms/english-ladder',

  target: { lang: 'en', dir: 'ltr', fontClass: '', sentenceClass: '' },
  ui: { defaultLang: 'id' },

  explainLangs: [
    { value: 'id', label: { id: 'ID', en: 'ID' } },
    { value: 'en', label: { id: 'EN', en: 'EN' } },
  ],

  settings: {
    defaults: DEFAULT_SETTINGS,
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

  speech: {
    voiceScorer: (voice, settings) => scoreVoice(voice, settings.accent, settings.voice),
    sentenceSplit: /[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g,
    canSpeak: (voices) => pickVoice(voices) !== null,
    sampleText: 'Hello! This is your English Ladder voice. Is it clear?',
  },

  text: {
    normalise: (s) => s,
    tokenEquals: (a, b, i) => (i === 0 ? a === b : a.toLowerCase() === b.toLowerCase()),
    trimPunct: /[.,!?;:]+$/u,
    tokenise,
  },

  lint: {
    wordRegex: WORD_REGEX,
    knownWord: (word, { lex }) => enKnownWord(word, lex),
    detectors: Object.entries(INVENTORY_DETECTORS).map(([id, re]) => ({ id, re })),
    structureRules: STRUCTURE_RULES,
  },

  visuals: registry,
  visualIds: VISUAL_IDS,
  boardPattern: Contours,

  extraData: { nounsFile: 'data/nouns.yaml' },
};
