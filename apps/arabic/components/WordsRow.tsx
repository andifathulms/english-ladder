'use client';

// My words for Arabic (PRD §5.7): each word fully vowelled with its transliteration, meaning,
// Egyptian form, root (once Easy 3 has introduced roots) and gender; search in any script.
import type { Gloss, LessonSummary, Rung } from '@ladder/core/lib/types';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { useProgress, useT } from '@ladder/core/components/ProgressProvider';
import { usePlay } from '@ladder/core/components/useSpeech';
import { looseKey, hasArabic } from '@/lib/arabic/text';
import { translitKey } from '@/lib/arabic/translit';
import type { ArabicKey } from '@/i18n/overrides';
import type { GlossaryEntry } from '@/course/types';
import { ArIsland } from './ar/ArIsland';
import { Translit } from './ar/Translit';
import { EgChip } from './ar/EgChip';

/** Roots are shown once this rung has been reached. */
const ROOTS_FROM = 'easy-3';

/** Search accepts Arabic with or without harakat, transliteration, or Indonesian (PRD §5.7). */
export function matchesWord(word: Gloss, q: string): boolean {
  const g = word.raw as GlossaryEntry;
  const needle = q.trim();
  if (!needle) return true;
  if (hasArabic(needle)) {
    const k = looseKey(needle);
    return looseKey(g.ar).includes(k) || (!!g.eg && looseKey(g.eg).includes(k));
  }
  const n = translitKey(needle);
  const plain = (s: string) => translitKey(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
  return (
    translitKey(g.tr).includes(n) ||
    plain(g.tr).includes(plain(needle)) ||
    g.id.toLowerCase().includes(needle.toLowerCase()) ||
    (g.en ?? '').toLowerCase().includes(needle.toLowerCase())
  );
}

export function WordsRow({ word, rungs, lessons }: { word: Gloss; rungs: Rung[]; lessons: LessonSummary[] }) {
  const { t, lang } = useT<ArabicKey>();
  const progress = useProgress();
  const play = usePlay();
  const w = word.raw as GlossaryEntry;
  const rungIndex = (id: string) => rungs.findIndex((r) => r.id === id);
  const showRoots = Object.keys(progress.lessons).some((id) => {
    const l = lessons.find((x) => x.id === id);
    return l && rungIndex(l.rung) >= rungIndex(ROOTS_FROM);
  });
  return (
    <li className="flex min-h-[64px] items-center gap-3 px-4 py-2">
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex flex-wrap items-baseline gap-x-3">
          {/* Always fully vowelled here, whatever the rung's harakat level. */}
          <ArIsland size="small">{w.ar}</ArIsland>
          <Translit text={w.tr} />
          <span lang={lang === 'en' && w.en ? 'en' : 'id'} className="id-text text-small">
            {lang === 'en' ? (w.en ?? w.id) : w.id}
          </span>
        </span>
        {w.eg && (
          <span className="flex flex-wrap items-center gap-2">
            <EgChip />
            <ArIsland size="small" variety="eg">
              {w.eg}
            </ArIsland>
            {w.eg_tr && <Translit text={w.eg_tr} />}
          </span>
        )}
        {showRoots && w.root && (
          <span className="label text-muted">
            {t('words.root')} <ArIsland face="ui">{w.root}</ArIsland>
          </span>
        )}
      </span>
      {w.gender && (
        <span className="label rounded-sm bg-accent-soft px-2 py-[2px] text-accent" title={t(w.gender === 'm' ? 'words.genderM' : 'words.genderF')}>
          {w.gender}
        </span>
      )}
      <PlayButton text={w.ar} onPlay={() => void play(w.ar)} small />
    </li>
  );
}
