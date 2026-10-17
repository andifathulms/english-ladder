import { getAllSummaries, getCurriculum, getTestPool } from '@ladder/core/lib/content/load';
import { HomeView } from '@ladder/core/components/ladder/HomeView';

export default function Home() {
  const rungs = getCurriculum();
  return (
    <HomeView
      rungs={rungs}
      lessons={getAllSummaries()}
      testRungs={rungs.filter((r) => getTestPool(r.id)).map((r) => r.id)}
    />
  );
}
