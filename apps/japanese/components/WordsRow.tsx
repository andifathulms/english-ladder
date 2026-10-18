'use client';

// My words for Japanese (PRD §5.7): the word with furigana, its reading, romaji on request, the
// Indonesian meaning, a pitch mark, the word type and the JLPT level; search by kana, kanji, romaji
// or Indonesian.
import type { Gloss } from '@ladder/core/lib/types';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { useSettings, useT } from '@ladder/core/components/ProgressProvider';
import { usePlay } from '@ladder/core/components/useSpeech';
import { normJa, toPlain } from '@/lib/ja/text';
import { toHiragana } from '@/lib/ja/kana';
import { kanaToRomaji, romajiToKana } from '@/lib/ja/romaji';
import type { JapaneseKey } from '@/i18n/overrides';
import type { GlossaryEntry } from '@/course/types';
import { JaSentence } from './ja/JaSentence';
import { JaTextOverride } from './ja/JaContext';
import { PitchLineMini } from '@/visuals/PitchLineMini';

/** Facts for a word from the imported data: Tokyo accent and JLPT level, keyed "plain|kana". */
export type WordFacts = Record<string, { pitch?: number; jlpt?: string }>;

const TYPE_LABEL: Record<string, { id: string; en: string }> = {
  'verb-1': { id: 'kata kerja 1', en: 'verb group 1' },
  'verb-2': { id: 'kata kerja 2', en: 'verb group 2' },
  'verb-3': { id: 'kata kerja 3', en: 'verb group 3' },
  'adj-i': { id: 'kata sifat い', en: 'い adjective' },
  'adj-na': { id: 'kata sifat な', en: 'な adjective' },
};

/** Search: kana or kanji (normalised, hiragana and katakana alike), romaji, or Indonesian. */
export function matchesEntry(g: GlossaryEntry, q: string): boolean {
  const needle = q.trim();
  if (!needle) return true;
  const lower = needle.toLowerCase();
  if (g.id.toLowerCase().includes(lower) || (g.en ?? '').toLowerCase().includes(lower)) return true;
  const hira = (s: string) => toHiragana(normJa(s));
  if (/[぀-ヿ㐀-鿿]/u.test(needle)) return hira(toPlain(g.ja)).includes(hira(needle)) || hira(g.kana).includes(hira(needle));
  const asKana = romajiToKana(lower, 'hiragana', true);
  if (!asKana.pending && asKana.kana && hira(g.kana).includes(asKana.kana)) return true;
  return kanaToRomaji(g.kana).replace(/[\s']/g, '').includes(lower.replace(/[\s']/g, ''));
}

export const matchesWord = (word: Gloss, q: string) => matchesEntry(word.raw as GlossaryEntry, q);

export function WordsRow({ word, data }: { word: Gloss; data?: unknown }) {
  const { lang } = useT<JapaneseKey>();
  const { pitchMarks, romajiInWords } = useSettings();
  const play = usePlay();
  const g = word.raw as GlossaryEntry;
  const plain = toPlain(g.ja);
  const f = (data as WordFacts | undefined)?.[`${plain}|${g.kana}`] ?? {};
  const pitch = g.pitch ?? f.pitch;
  const jlpt = g.jlpt ?? f.jlpt;
  const type = g.type ? TYPE_LABEL[g.type] : undefined;
  return (
    <li className="flex min-h-[64px] items-center gap-3 px-4 py-2">
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-baseline gap-x-3">
          {/* My words always shows readings, whatever the rung's fade. */}
          <JaTextOverride showFurigana>
            <JaSentence ja={g.ja} size="small" play={false} />
          </JaTextOverride>
          {plain !== g.kana.replace(/\s+/g, '') && (
            <span lang="ja" className="ja font-ja-ui text-small text-muted">
              {g.kana}
            </span>
          )}
          {romajiInWords && (
            <span lang="ja-Latn" className="romaji">
              {kanaToRomaji(g.kana, { particles: false })}
            </span>
          )}
          <span lang={lang === 'en' && g.en ? 'en' : 'id'} className="id-text text-small">
            {lang === 'en' ? (g.en ?? g.id) : g.id}
          </span>
        </span>
        {pitchMarks && pitch !== undefined && <PitchLineMini kana={g.kana} accent={pitch} label={`${g.kana}: ${pitch}`} />}
      </span>
      {type && <span className="label rounded-sm bg-accent-soft px-2 py-[2px] text-accent">{type[lang]}</span>}
      {jlpt && <span className="label rounded-sm bg-paper-2 px-2 py-[2px] text-muted">{jlpt}</span>}
      <PlayButton text={g.ja} onPlay={() => void play(g.ja)} small />
    </li>
  );
}
