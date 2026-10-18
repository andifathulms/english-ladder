import { createElement } from 'react';

type Props = Omit<React.HTMLAttributes<HTMLElement>, 'lang'> & {
  children: React.ReactNode;
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'li';
  /** Klee One for teaching text (default); Noto Sans JP for small Japanese in UI chrome. */
  face?: 'ja' | 'ui';
};

/**
 * Plain Japanese text (no ruby): rung subtitles, chips, labels. Sets lang="ja" and the Japanese face,
 * and resets italics, letter-spacing and case so Latin styling never leaks onto Japanese.
 */
export function JaText({ children, as = 'span', face = 'ja', className = '', ...rest }: Props) {
  return createElement(as, { ...rest, lang: 'ja', className: `ja ${face === 'ui' ? 'font-ja-ui' : 'font-ja'} ${className}`.trim() }, children);
}
