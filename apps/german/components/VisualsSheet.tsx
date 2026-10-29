'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import { PageShell } from '@ladder/core/components/ui/PageShell';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import type { DeVisualData } from '@/visuals/data';

/** Every visual on its stage, for review and the accessibility run (not linked from the app). */
export function VisualsSheet({ data }: { data: DeVisualData }) {
  const { lang } = useT();
  return (
    <PageShell title="Visuals">
      <VisualDataProvider value={data}>
        {VISUAL_IDS.map((id) => {
          const C = registry[id] as React.ComponentType<{ lang: 'id' | 'en'; weil?: boolean; id?: string }>;
          return (
            <section key={id} className="flex flex-col gap-2" aria-labelledby={`v-${id}`}>
              <h2 id={`v-${id}`} className="label text-muted">
                {id}
              </h2>
              <div className="rounded-lg bg-paper-2 p-4">
                <C lang={lang} {...(id === 'verb-bracket' ? { weil: true, id: 'Aku bangun jam 6.' } : {})} />
              </div>
            </section>
          );
        })}
      </VisualDataProvider>
    </PageShell>
  );
}
