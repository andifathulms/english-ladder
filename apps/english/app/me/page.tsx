import { getAllSummaries } from '@ladder/core/lib/content/load';
import { MeView } from '@ladder/core/components/MeView';

export const metadata = { title: 'Saya' };

export default function MePage() {
  return <MeView lessons={getAllSummaries()} />;
}
