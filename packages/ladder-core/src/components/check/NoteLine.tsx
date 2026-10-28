'use client';

import { parseInline } from '@ladder/core/lib/markup';
import type { GradeNote } from '@ladder/core/lib/check/itemTypes';
import { useCourse } from '@ladder/core/course/context';
import { useT } from '../ProgressProvider';

/** The note a correct answer carries (GradeResult.note), small and muted; *italic* is target text. */
export function NoteLine({ note }: { note: GradeNote }) {
  const { t } = useT();
  const { target } = useCourse();
  const text = (t as (k: string, p?: Record<string, string | number>) => string)(note.key, note.params);
  return (
    <p className="text-small text-muted" data-note>
      {parseInline(text).map((tok, i) =>
        tok.t === 'em' || tok.t === 'focus' ? (
          <em key={i} lang={target.lang}>
            {tok.v}
          </em>
        ) : (
          <span key={i}>{tok.v}</span>
        ),
      )}
    </p>
  );
}
