'use client';

// Japanese Ladder's rendering slots for the engine (CourseConfig.components, ladder, climb, home,
// settings). Japanese reaches the page through JaText (plain) and JaSentence (furigana; M2).
import type { SentenceSlotProps, TargetTextProps } from '@ladder/core/course/types';
import type { Rung as CoreRung } from '@ladder/core/lib/types';
import { useT } from '@ladder/core/components/ProgressProvider';
import type { JapaneseKey } from '@/i18n/overrides';
import type { Rung } from '@/course/types';
import { toPlain } from '@/lib/ja/text';
import { JaText } from './ja/JaText';
import { JlptChip } from './JlptChip';
import { JaSentence } from './ja/JaSentence';

const jr = (r: CoreRung) => r as unknown as Rung;

type JaLine = { ja: string; kana: string; id?: string; en?: string; note?: { id: string; en: string } };
const raw = (x: { raw?: unknown }) => x.raw as JaLine;

/** Target lines through JaSentence, sized and supported per place (DESIGN §6.4). */
export function JapaneseSentence({ line, use }: SentenceSlotProps) {
  const e = raw(line);
  switch (use) {
    case 'example':
      return <JaSentence ja={e.ja} id={e.id} en={e.en} note={line.note} />;
    case 'worked':
      return <JaSentence ja={e.ja} id={e.id} en={e.en} note={e.note} />;
    case 'pairOff':
      return <JaSentence ja={e.ja} off play={false} size="body" />;
    case 'pairNatural':
      return <JaSentence ja={e.ja} size="body" />;
    case 'reading':
      // The reading is a list of lines (adapter.reading.text).
      return (
        <ol className="flex flex-col gap-3">
          {(line.raw as JaLine[]).map((l, i) => (
            <li key={i}>
              <JaSentence ja={l.ja} size="body" />
            </li>
          ))}
        </ol>
      );
    case 'dialogue':
      return <JaSentence ja={e.ja} id={e.id} en={e.en} size="body" />;
    case 'tirukan':
      return <JaSentence ja={e.ja} id={e.id} en={e.en} play={false} />;
  }
}

const JA_SIZE: Record<NonNullable<TargetTextProps['size']>, string> = {
  sentence: 'text-ja-sentence',
  body: 'text-ja-small',
  small: 'text-ja-small',
  glyph: 'text-ja-glyph',
  title: 'text-ja-body',
  inherit: '',
};

/** Target text outside sentences (keywords, answers): JaText at the Japanese sizes, markup removed. */
export function JapaneseTargetText({ children, block, as, size, face, variety: _v, className = '', ...rest }: TargetTextProps) {
  const cls = [size ? JA_SIZE[size] : '', className].filter(Boolean).join(' ');
  const tag = (as ?? (block ? 'div' : 'span')) as 'span';
  return (
    <JaText as={tag} face={face === 'ui' ? 'ui' : 'ja'} className={cls} {...rest}>
      {typeof children === 'string' ? toPlain(children) : children}
    </JaText>
  );
}

/** The rung's Japanese name per place (DESIGN §6.3): Noto Sans JP on the rail, hidden below 380px. */
export function RungSubtitle({ rung, place }: { rung: CoreRung; place: 'rail' | 'board' | 'climb' | 'placement' }) {
  const name = toPlain(jr(rung).name_ja);
  switch (place) {
    case 'rail':
      return (
        <JaText face="ui" className="hidden text-ja-small leading-none text-muted min-[380px]:inline">
          {name}
        </JaText>
      );
    case 'board':
      return (
        <JaText as="p" className="text-ja-body leading-none text-board-muted">
          {name}
        </JaText>
      );
    case 'climb':
      return (
        <JaText as="p" className="text-center text-ja-body text-brass">
          {name}
        </JaText>
      );
    case 'placement':
      return (
        <JaText face="ui" className="text-ja-small leading-none text-muted">
          {name}
        </JaText>
      );
  }
}

export const LevelChip = ({ rung, onBoard }: { rung: CoreRung; onBoard?: boolean }) => (
  <JlptChip jlpt={jr(rung).jlpt} jft={jr(rung).jft} onBoard={onBoard} />
);

/** はしご (hashigo, ladder) after the wordmark's range line: the first word a Kana 1 learner reads. */
export function WordmarkHashigo() {
  return (
    <JaText className="text-[1rem] leading-none" title="hashigo: tangga">
      はしご
    </JaText>
  );
}

/** はしご on the two-door board. */
export function DoorsOrnament() {
  return (
    <JaText className="text-ja-body leading-none text-board-ink" aria-hidden>
      はしご
    </JaText>
  );
}

/** 一歩ずつ (ippo zutsu, one step at a time) under the climb line (DESIGN §6.9). */
export function ClimbExtra() {
  return (
    <p className="flex flex-col items-center gap-1 text-board-muted">
      <JaText className="text-ja-body">一歩ずつ</JaText>
      <span lang="ja-Latn" className="text-small">
        ippo zutsu
      </span>
    </p>
  );
}

/** The Ukuran teks Jepang preview line: わたしは がくせいです。 */
export function JaSizePreview() {
  const { t } = useT<JapaneseKey>();
  return (
    <div className="flex flex-col gap-1 rounded-md bg-paper-2 px-4 py-2" aria-live="polite">
      <JaText as="p" className="text-ja-sentence font-medium">
        わたしは がくせいです。
      </JaText>
      <p className="text-small">
        <span className="id-text">{t('settings.jaSizePreview')}</span>
      </p>
    </div>
  );
}
