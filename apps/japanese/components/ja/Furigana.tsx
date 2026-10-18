import { Fragment } from 'react';
import type { Seg, Word } from '@/lib/ja/text';

/**
 * One word's text with furigana (DESIGN §4.3): a <ruby> per kanji group, an <rt> per kanji (or one for
 * a word read as a whole), okurigana outside. A hidden <rt> keeps its height so lines never jump.
 */
export function Furigana({ word, visible }: { word: Word; visible: (kanji: string) => boolean }) {
  return (
    <>
      {word.segs.map((s: Seg, i) => {
        if (!s.ruby) return <span key={i}>{s.text}</span>;
        const chars = [...s.text];
        if (s.whole) {
          const show = chars.some(visible);
          return (
            <ruby key={i} className="ja-ruby">
              {s.text}
              <rt className={show ? undefined : 'rt-hidden'} aria-hidden={show ? undefined : true}>
                {s.ruby[0]}
              </rt>
            </ruby>
          );
        }
        return (
          <ruby key={i} className="ja-ruby">
            {chars.map((c, k) => {
              const show = visible(c);
              return (
                <Fragment key={k}>
                  {c}
                  <rt className={show ? undefined : 'rt-hidden'} aria-hidden={show ? undefined : true}>
                    {s.ruby![k]}
                  </rt>
                </Fragment>
              );
            })}
          </ruby>
        );
      })}
    </>
  );
}
