// Mandarin Ladder's course configuration: everything the shared engine needs to run the course
// exactly as the standalone app did (same storage key, cache prefix, export name and look).
import { createElement, type ComponentType } from 'react';
import type { CourseConfig, TargetTextProps } from '@ladder/core/course/types';
import { baseStrings, extendStrings } from '@ladder/core/lib/i18n';
import { IconChat } from '@ladder/core/components/ui/Icon';
import { isSyllableKey, zhAudioKey } from '@/lib/zh/audio';
import { idOverrides, enOverrides, type MandarinKey } from '@/i18n/overrides';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { adapter } from '@/course/adapter';
import { answerText, itemText, itemTypes } from '@/course/items';
import { text } from '@/course/text';
import { voiceScorer, canSpeak, chunkMax, estimateMs, sentenceSplit, sampleText, rateScale } from '@/course/speech';
import { ALLOWED_SETTINGS, DEFAULT_SETTINGS, EXTENSIONS, SCHEMA_VERSION, STORAGE_KEY, THEME_COLOR, onCompleteLesson } from '@/course/progress';
import type { Rung } from '@/course/types';
import { Grid } from '@/components/Grid';
import { checkSlots } from '@/components/check/slots';
import { WordsRow, matchesWord } from '@/components/WordsRow';
import { DeckHome, type Deck } from '@/components/zh/DeckHome';
import {
  BoardQuote,
  CapstoneWrap,
  ClimbExtra,
  DeckLink,
  DoorsOrnament,
  GlossExtra,
  GlossWord,
  HanziStrand,
  LevelChip,
  MandarinSentence,
  MandarinTargetText,
  NadaStrand,
  PlacementWrap,
  ProseTerm,
  ProseText,
  RungSubtitle,
  TalkStrand,
  TirukanStrand,
  TitleTarget,
  WordmarkLadder,
  WordsStrand,
  ZhSizePreview,
  useMandarinSession,
} from '@/components/slots';

const rung = (r: unknown) => r as Rung;

/** "HSK 1–3" for the rungs of one tier, in curriculum order; empty for Dasar. */
function tierRange(rungs: unknown[], tier: string): string {
  const inTier = (rungs as Rung[]).filter((r) => r.tier === tier && r.hsk !== '—');
  if (!inTier.length) return '';
  const first = inTier[0].hsk;
  const last = inTier[inTier.length - 1].hsk;
  return first === last ? `HSK ${first.replace('-', '–')}` : `HSK ${first}–${last.replace('-', '–')}`;
}

const DeckPanel = ({ data }: { data: unknown }) => createElement(DeckHome, { decks: data as Deck[] });

export const course: CourseConfig = {
  id: 'mandarin-ladder',
  name: 'Mandarin Ladder',
  rangeLabel: 'DASAR → HSK 9',
  storageKey: STORAGE_KEY,
  cachePrefix: 'mandarin-ladder-',
  exportFilePrefix: 'mandarin-ladder-progress',
  repoUrl: 'https://github.com/andifathulms/mandarin-ladder',

  // Chinese is set in lang="zh-Hans" spans and ruby; the page and its shell stay LTR.
  target: { lang: 'zh-Hans', dir: 'ltr', fontClass: 'font-zh', sentenceClass: '', textAttrs: { lang: 'en' }, topicAttrs: { lang: 'id' } },
  shell: { dir: 'ltr' },
  titles: 'ui',
  ui: { defaultLang: 'id' },

  strings: {
    id: extendStrings<MandarinKey>(baseStrings.id, idOverrides),
    en: extendStrings<MandarinKey>(baseStrings.en, enOverrides),
  },

  // Explanations are always in the UI language; the fades are pinyin and tone colours (PRD §4.5).
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
    targetSize: { key: 'zhSize', attr: 'data-zh-size', options: [100, 120, 140], labelKey: 'settings.zhSize', Preview: ZhSizePreview },
  },
  progress: {
    schemaVersion: SCHEMA_VERSION,
    features: { capstones: true, placement: true },
    extensions: EXTENSIONS,
    onCompleteLesson,
  },

  speech: { voiceScorer, sentenceSplit, canSpeak, sampleText, rateScale, chunkMax, estimateMs },
  // Recorded audio first; isolated syllables never fall back to browser speech (CLAUDE.md §7.7).
  audio: { key: zhAudioKey, speechFallback: (t) => !isSyllableKey(t) },
  text,
  adapter,
  itemTypes,
  itemText,
  answerText,
  check: checkSlots,
  prose: { Term: ProseTerm, Text: ProseText },
  components: {
    Sentence: MandarinSentence,
    TargetText: MandarinTargetText as ComponentType<TargetTextProps>,
    TitleTarget,
    BoardQuote,
    WordmarkExtra: WordmarkLadder,
    wordmarkAlign: 'end',
  },
  glossary: { Word: GlossWord, Extra: GlossExtra },
  strands: {
    examples: [NadaStrand, HanziStrand, TalkStrand, TirukanStrand],
    contrast: [WordsStrand],
  },
  lesson: { explain: 'ui', useSession: useMandarinSession, exampleListClass: 'flex flex-col gap-6' },
  ladder: {
    tiers: ['hard', 'medium', 'easy', 'dasar'],
    RungSubtitle,
    LevelChip,
    tierRange,
    longRung: { minLessons: 18 },
    RungExtra: DeckLink,
    rungMeta: (r, t) => [t(`rung.pinyin.${rung(r).pinyin}`), ' · ', t(rung(r).tone_colours_default ? 'rung.toneColours.on' : 'rung.toneColours.off')],
  },
  home: {
    welcome: 'twoDoor',
    // Door 1 opens Dasar 1, lesson 1.
    firstRung: (rungs) => rungs.find((r) => r.tier === 'dasar' && r.status === 'live'),
    Ornament: DoorsOrnament,
  },
  placement: {
    sections: ['tones', 'pinyin', 'sandhi', 'strokes', 'radicals', 'chars'],
    // 17+ → Easy 1; 12–16 → Dasar 2; under 12 → Dasar 1 (PRD §5.2); thresholds from placement.yaml.
    outcomes: [
      { result: 'easy-1', threshold: 'easy1', climbs: ['dasar-1', 'dasar-2'] },
      { result: 'dasar-2', threshold: 'dasar2', climbs: ['dasar-1'] },
      { result: 'dasar-1', climbs: [] },
    ],
    retakeRung: 'dasar-1',
    Wrap: PlacementWrap,
  },
  capstones: { Wrap: CapstoneWrap, dialogue: { Icon: IconChat } },
  climb: { Extra: ClimbExtra },
  words: { match: matchesWord, Row: WordsRow, tab: { hash: 'deck', titleKey: 'words.tab', labelKey: 'deck.tab', Panel: DeckPanel } },
  themeColor: THEME_COLOR,
  // The English Ladder fixes Mandarin Ladder shipped with (PRD §5.9).
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
  boardPattern: Grid,
};

