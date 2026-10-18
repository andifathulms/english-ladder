'use client';

import type { Bilingual } from '@ladder/core/lib/types';
import { useT } from '../ProgressProvider';
import { useCourse } from '@ladder/core/course/context';

export function WhyLine({ why, hint }: { why: Bilingual; hint?: boolean }) {
  const { t, lang } = useT();
  const Text = useCourse().check?.WhyText;
  const text = lang === 'en' ? why.en : why.id;
  return (
    <p className="fade-in max-w-measure text-body">
      {hint && <span className="label me-2 text-muted">{t('check.hint')}</span>}
      {Text ? <Text text={text} /> : text}
    </p>
  );
}
