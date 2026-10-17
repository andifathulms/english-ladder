import { notFound } from 'next/navigation';
import { sceneVisualIds, type Content } from '@ladder/core/lib/content/load';
import { PlacementRunner } from '@ladder/core/components/check/PlacementRunner';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';

/** The placement check (courses with content/placement.yaml). */
export function placementPage(content: Content) {
  return function PlacementPage() {
    const placement = content.getPlacement();
    if (!placement) notFound();
    return (
      <VisualDataProvider value={content.visualDataFor(sceneVisualIds(placement.items))}>
        <PlacementRunner placement={placement} rungs={content.getCurriculum()} lessons={content.getAllSummaries()} />
      </VisualDataProvider>
    );
  };
}
