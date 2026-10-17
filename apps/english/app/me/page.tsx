import { MeView } from '@ladder/core/components/MeView';
import { content } from '@/course/content';

export const metadata = { title: 'Saya' };

export default function MePage() {
  return <MeView lessons={content.getAllSummaries()} />;
}
