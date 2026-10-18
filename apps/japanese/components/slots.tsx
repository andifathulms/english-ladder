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

const jr = (r: CoreRung) => r as unknown as Rung;

/** Target lines (until JaSentence lands in M2): the plain Japanese, then the meaning. */
export function JapaneseSentence({ line }: SentenceSlotProps) {
  return (
    <div className="flex flex-col gap-1">
      <JaText as="p" className="ja-line text-ja-sentence font-medium">
        {toPlain(line.text)}
      </JaText>
      {line.meaning && (
        <p lang="id" className="id-text">
          {line.meaning.id}
        </p>
      )}
    </div>
  );
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
