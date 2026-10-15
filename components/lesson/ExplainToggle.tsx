'use client';

import * as store from '@/lib/progress/store';
import { useT } from '../ProgressProvider';

/** ID / EN switch for explanations, always in the lesson's top bar. */
export function ExplainToggle({ effective }: { effective: 'id' | 'en' | 'mixed' }) {
  const { t } = useT();
  const opts = [
    { v: 'id' as const, short: 'ID', name: 'Bahasa Indonesia', on: effective === 'id' },
    { v: 'en' as const, short: 'EN', name: 'English', on: effective !== 'id' },
  ];
  return (
    <div role="group" aria-label={t('lesson.explainToggle')} className="flex shrink-0 rounded-full bg-paper-2 p-[3px]">
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          lang={o.v}
          aria-pressed={o.on}
          aria-label={o.name}
          title={o.name}
          onClick={() => store.setSettings({ explain: o.v })}
          className={`label min-h-[38px] min-w-[40px] rounded-full px-2 transition-colors duration-quick ${
            o.on ? 'bg-surface text-ink shadow-e1' : 'text-muted hover:text-ink'
          }`}
        >
          {o.short}
        </button>
      ))}
    </div>
  );
}
