'use client';

import { createElement } from 'react';
import type { TargetTextProps } from '@ladder/core/course/types';
import { useCourse } from '@ladder/core/course/context';

/** The engine's plain target-text element: lang/dir from the course, classes as given. */
function DefaultTargetText({ children, block, as, size: _size, face: _face, variety: _variety, className, ...rest }: TargetTextProps) {
  const { target } = useCourse();
  return createElement(as ?? (block ? 'div' : 'span'), { ...rest, lang: target.lang, dir: target.dir, className }, children);
}

/** Target-language text outside sentences (titles, keywords, glossary words), via the course's slot. */
export function TargetText(props: TargetTextProps) {
  const C = useCourse().components?.TargetText ?? DefaultTargetText;
  return <C {...props} />;
}

/** Attributes for plain spans of target/metadata text (topics, threads, answers). */
export function useTextAttrs(): { lang?: string; dir?: 'ltr' | 'rtl' } {
  const { target } = useCourse();
  return target.textAttrs ?? { lang: target.lang, dir: target.dir };
}
