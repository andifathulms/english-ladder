'use client';

import { useCourse } from '@ladder/core/course/context';
import { useT } from '../ProgressProvider';
import type { Rung } from '@ladder/core/lib/types';
import { cefrLabel } from './tier';

/** CEFR label for display: localised when the course has fixes.cefrLabelLocalised. */
export function useCefr(): (cefr: string) => string {
  const { lang } = useT();
  const { fixes } = useCourse();
  return (cefr) => cefrLabel(cefr, lang, !!fixes?.cefrLabelLocalised);
}

/** A rung's level label: the course's (adapter.rung.levelLabel; may be empty), else its CEFR. */
export function useLevel(): (rung: Rung) => string {
  const cefr = useCefr();
  const { adapter } = useCourse();
  const own = adapter.rung?.levelLabel;
  return own ? (r) => own(r) : (r) => cefr(r.cefr);
}
