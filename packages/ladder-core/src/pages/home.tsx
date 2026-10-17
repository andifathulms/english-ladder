import type { Content } from '@ladder/core/lib/content/load';
import { HomeView } from '@ladder/core/components/ladder/HomeView';

/** Home: the board, your rung's lessons and the ladder. */
export function homePage(content: Content) {
  return function Home() {
    const rungs = content.getCurriculum();
    return (
      <HomeView
        rungs={rungs}
        lessons={content.getAllSummaries()}
        testRungs={rungs.filter((r) => content.getTestPool(r.id)).map((r) => r.id)}
        hasPlacement={!!content.getPlacement()}
      />
    );
  };
}
