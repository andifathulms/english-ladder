'use client';

// My words for Mandarin (PRD §5.7): hanzi with pinyin (always shown here), meaning, traditional form,
// measure word and HSK level; search by hanzi, pinyin with or without tones, or Indonesian.
import type { Gloss } from '@ladder/core/lib/types';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { useT } from '@ladder/core/components/ProgressProvider';
import { usePlay } from '@ladder/core/components/useSpeech';
import { hasHan, normZh } from '@/lib/zh/text';
import { normPinyin, stripTone } from '@/lib/zh/pinyin';
import type { MandarinKey } from '@/i18n/overrides';
import type { GlossaryEntry } from '@/course/types';
import { ZhText } from './zh/ZhText';
import { Pinyin } from './zh/Pinyin';

/** Extra facts for a word, from the HSK data: traditional form, level, measure word. */
export type WordFacts = Record<string, { trad?: string; hsk?: string; mw?: string }>;

const plainPy = (s: string) => stripTone(s.normalize('NFC').toLowerCase()).replace(/[\s'’-]/g, '').replace(/v|u:/g, 'ü');

/** Search accepts hanzi, pinyin with or without tones (marks or numbers), or Indonesian (PRD §5.7). */
export function matchesEntry(g: GlossaryEntry, q: string): boolean {
  const needle = q.trim();
  if (!needle) return true;
  if (hasHan(needle)) return normZh(g.zh).includes(normZh(needle));
  const lower = needle.toLowerCase();
  if (g.id.toLowerCase().includes(lower) || (g.en ?? '').toLowerCase().includes(lower)) return true;
  // With tones (marks or digits): compare tone for tone; without: ignore tones.
  if (/[1-5]|[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(needle.normalize('NFC'))) {
    const a = normPinyin(g.py);
    const b = normPinyin(needle);
    return !!a && !!b && a.includes(b);
  }
  return plainPy(g.py).includes(plainPy(needle));
}

export const matchesWord = (word: Gloss, q: string) => matchesEntry(word.raw as GlossaryEntry, q);

export function WordsRow({ word, data }: { word: Gloss; data?: unknown }) {
  const { t, lang } = useT<MandarinKey>();
  const play = usePlay();
  const w = word.raw as GlossaryEntry;
  const f = (data as WordFacts | undefined)?.[w.zh] ?? {};
  const mw = w.mw ?? f.mw;
  const hsk = w.hsk ?? f.hsk;
  return (
    <li className="flex min-h-[64px] items-center gap-3 px-4 py-2">
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex flex-wrap items-baseline gap-x-3">
          <ZhText className="text-zh-small">{w.zh.replace(/\s+/g, '')}</ZhText>
          {/* My words always shows pinyin, whatever the rung's fade. */}
          <Pinyin text={w.py} tones />
          <span lang={lang === 'en' && w.en ? 'en' : 'id'} className="id-text text-small">
            {lang === 'en' ? (w.en ?? w.id) : w.id}
          </span>
        </span>
        {f.trad && f.trad !== w.zh && (
          <span className="label text-muted">
            {t('words.trad')} <ZhText face="ui">{f.trad}</ZhText>
          </span>
        )}
      </span>
      {mw && (
        <ZhText face="ui" className="label rounded-sm bg-accent-soft px-2 py-[2px] text-accent" title={t('words.mw')}>
          {`一${mw}`}
        </ZhText>
      )}
      {hsk && <span className="label rounded-sm bg-paper-2 px-2 py-[2px] text-muted">HSK {hsk.replace('-', '–')}</span>}
      <PlayButton text={w.zh} onPlay={() => void play(w.zh)} small />
    </li>
  );
}
