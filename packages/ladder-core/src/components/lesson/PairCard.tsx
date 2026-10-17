'use client';

import type { Line } from '@ladder/core/lib/types';
import { TargetSentence } from './TargetSentence';
import { IconCheck, IconClose } from '../ui/Icon';
import { useT } from '../ProgressProvider';

/** The off → natural pair for the Contrast step. Icon + word + colour, never colour alone. */
export function PairCard({ off, natural }: { off: Line; natural: Line }) {
  const { t } = useT();
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="flex flex-col gap-2 rounded-md p-4" style={{ background: 'var(--off-bg)' }}>
        <span className="label flex items-center gap-1 text-off">
          <IconClose size={14} /> {t('lesson.off')}
        </span>
        <TargetSentence line={off} use="pairOff" />
      </div>
      <div className="flex flex-col gap-2 rounded-md p-4" style={{ background: 'var(--good-bg)' }}>
        <span className="label flex items-center gap-1 text-good">
          <IconCheck size={14} /> {t('lesson.natural')}
        </span>
        <TargetSentence line={natural} use="pairNatural" />
      </div>
    </div>
  );
}
