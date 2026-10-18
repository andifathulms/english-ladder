'use client';

// Japanese Ladder's check-item rendering (CourseConfig.check): Japanese prompts, options and tiles
// with furigana per the item's setting. The kana, mora, pitch and form item types land in M5.
import type { CheckSlots, TileTrayProps } from '@ladder/core/course/types';
import type { CheckItem as CoreItem } from '@ladder/core/lib/types';
import { TileTray } from '@ladder/core/components/check/TileTray';
import { hasJapanese, toPlain } from '@/lib/ja/text';
import { JaInline } from '../ja/JaInline';

type Fu = { furigana?: boolean };
const fu = (item: CoreItem | undefined) => (item as unknown as Fu | undefined)?.furigana;

const isLatinLine = (s: string) => /[A-Za-z]/.test(s.replace(/\*\*|\*|\[\[|\]\]|___|\{[^}]*\}/g, ''));

function Inline({ text, item }: { text: string; item: CoreItem }) {
  return <JaInline text={text} furigana={fu(item)} />;
}

/** A prompt: Japanese at --t-ja-sentence with furigana per the item; Latin as a display line. */
function Prompt({ item, text, fill, off }: { item: CoreItem; text: string; fill?: string; off?: boolean }) {
  const latin = isLatinLine(text);
  return (
    <p
      lang={latin ? 'id' : undefined}
      className={`${latin ? 'font-display text-sentence font-medium' : 'text-ja-sentence font-semibold'} ${off ? 'off-text' : 'text-ink'}`}
    >
      <JaInline text={text} furigana={fu(item)} fill={fill} />
    </p>
  );
}

const Wrong = ({ text, item }: { text: string; item: CoreItem }) => <Prompt item={item} text={text} off />;

/** Japanese option labels at --t-ja-body with furigana per the item; Latin labels as written. */
function PillLabel({ raw, wrong, item }: { text: string; wrong: boolean; raw: string; item?: CoreItem }) {
  const strike = wrong ? 'line-through decoration-[1.5px]' : '';
  if (hasJapanese(raw)) return <JaInline text={raw} furigana={fu(item)} className={`min-w-0 flex-1 text-ja-body font-normal ${strike}`} />;
  return <span className={strike}>{raw}</span>;
}

/** Word tiles with furigana when they are Japanese; the answer line shows the joined sentence. */
function Tray({ item, slots: _slots, ...p }: TileTrayProps & { item: CoreItem; slots: number }) {
  const ja = p.tiles.some(hasJapanese);
  if (!ja) return <TileTray {...p} tileAttrs={() => ({ lang: 'id' })} />;
  return (
    <TileTray
      {...p}
      tileAttrs={() => ({})}
      tileClass={() => 'text-ja-body font-normal'}
      Label={({ text }) => <JaInline text={text} furigana={fu(item)} />}
      AfterLine={({ placed }) =>
        placed.length ? (
          <p className="text-small text-muted" aria-live="polite">
            <span lang="ja" className="ja font-ja text-ja-small text-ink">
              {placed.map(toPlain).join('')}
            </span>
          </p>
        ) : null
      }
    />
  );
}

export const checkSlots: CheckSlots = {
  Inline,
  Prompt,
  Wrong,
  TileTray: Tray,
  rootAttrs: (item) => ({ 'data-type': item.type }),
  correctPillByGrade: true,
  dedupeWrong: true,
  optionLayout: (item, options) => {
    const ja = options.some(hasJapanese);
    return { wide: ja || item.type === 'fix' || item.type === 'scene' || item.type === 'listen', badge: ja };
  },
  pill: {
    attrs: (text) => ({ lang: hasJapanese(text) ? undefined : 'id', 'data-option': text }),
    Label: PillLabel,
    gapClass: 'gap-3',
  },
};
