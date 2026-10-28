'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import { PageShell } from '@ladder/core/components/ui/PageShell';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';
import type { VerbData } from '@/lib/es/conjugate';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';

/** Every visual on its stage, for review and the accessibility run (not linked from the app). */
export function VisualsSheet({ verbs }: { verbs: VerbData[] }) {
  const { lang } = useT();
  return (
    <PageShell title="Visuals">
      <VisualDataProvider value={{ verbs }}>
        {VISUAL_IDS.map((id) => {
          const C = registry[id] as React.ComponentType<{ lang: 'id' | 'en'; tenses?: string[] }>;
          return (
            <section key={id} className="flex flex-col gap-2" aria-labelledby={`v-${id}`}>
              <h2 id={`v-${id}`} className="label text-muted">
                {id}
              </h2>
              <div className="rounded-lg bg-paper-2 p-4">
                <C lang={lang} {...(id === 'conjugation-grid' ? { tenses: ['presente', 'imperativo'] } : {})} />
              </div>
            </section>
          );
        })}
      </VisualDataProvider>
    </PageShell>
  );
}
