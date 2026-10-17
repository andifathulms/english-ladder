'use client';

import { useCourse } from '@ladder/core/course/context';
import { useT } from '../ProgressProvider';
import { cefrLabel } from './tier';

/** CEFR label for display: localised when the course has fixes.cefrLabelLocalised. */
export function useCefr(): (cefr: string) => string {
  const { lang } = useT();
  const { fixes } = useCourse();
  return (cefr) => cefrLabel(cefr, lang, !!fixes?.cefrLabelLocalised);
}
