import { sceneVisualIds, type Content } from '@ladder/core/lib/content/load';
import { ReviewRunner } from '@ladder/core/components/check/ReviewRunner';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';

/** Quick review across every lesson's check items. */
export function reviewPage(content: Content) {
  return function ReviewPage() {
    const lessons = content.getCurriculum().flatMap((r) => content.getLessons(r.id));
    const items = lessons.flatMap((l) => l.check.map((item) => ({ item, lessonId: l.id })));
    return (
      <VisualDataProvider value={content.visualDataFor(sceneVisualIds(items.map((i) => i.item)))}>
        <ReviewRunner items={items} />
      </VisualDataProvider>
    );
  };
}
