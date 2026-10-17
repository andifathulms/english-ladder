import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sceneVisualIds, type Content } from '@ladder/core/lib/content/load';
import { TestRunner } from '@ladder/core/components/check/TestRunner';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';

type Params = { params: { rung: string } };

/** A rung test. */
export function testPage(content: Content) {
  return {
    generateStaticParams() {
      const live = content.getCurriculum().filter((r) => content.getTestPool(r.id));
      return live.length ? live.map((r) => ({ rung: r.id })) : [{ rung: 'easy-1' }];
    },
    generateMetadata({ params }: Params): Metadata {
      const r = content.getRung(params.rung);
      return { title: r ? `${r.name} test` : undefined };
    },
    Page({ params }: Params) {
      const rung = content.getRung(params.rung);
      const pool = rung && content.getTestPool(rung.id);
      if (!rung || !pool) notFound();
      const rungs = content.getCurriculum();
      const next = rungs[rungs.findIndex((r) => r.id === rung.id) + 1] ?? null;
      return (
        <VisualDataProvider value={content.visualDataFor(sceneVisualIds(pool.items))}>
          <TestRunner rung={rung} next={next} pool={pool} lessons={content.getLessons(rung.id).map(content.summarize)} />
        </VisualDataProvider>
      );
    },
  };
}
