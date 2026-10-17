import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sceneVisualIds, type Content } from '@ladder/core/lib/content/load';
import { LessonPlayer } from '@ladder/core/components/lesson/LessonPlayer';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';
import { LessonDataProvider } from '@ladder/core/components/lesson/LessonData';
import { titleText } from './meta';

type Params = { params: { rung: string; lesson: string } };

/** The six-step lesson player. */
export function lessonPage(content: Content) {
  return {
    generateStaticParams() {
      const params = content
        .getCurriculum()
        .flatMap((r) => content.getLessons(r.id).map((l) => ({ rung: r.id, lesson: l.slug })));
      // A static export needs at least one path; it renders the not-found page.
      return params.length ? params : [{ rung: 'easy-1', lesson: 'none' }];
    },
    generateMetadata({ params }: Params): Metadata {
      const l = content.getLesson(params.rung, params.lesson);
      return { title: l ? titleText(content, content.adapter.lesson.title(l)) : undefined };
    },
    Page({ params }: Params) {
      const rung = content.getRung(params.rung);
      const lesson = content.getLesson(params.rung, params.lesson);
      if (!rung || !lesson) notFound();

      const lessons = content.getLessons(rung.id);
      const nextLesson =
        (lesson.next && lessons.find((l) => l.id === lesson.next)) ||
        lessons.find((l) => l.order === lesson.order + 1) ||
        null;
      const rungs = content.getCurriculum();
      const spiral = rungs.slice(rungs.findIndex((r) => r.id === rung.id) + 1).find((r) => r.threads.includes(lesson.spiral));
      const visualIds = [...(lesson.visual ? [lesson.visual.id] : []), ...sceneVisualIds(lesson.check)];

      return (
        <VisualDataProvider value={content.visualDataFor(visualIds, { lesson })}>
          <LessonDataProvider value={content.model.lessonData?.(lesson)}>
          <LessonPlayer
            lesson={lesson}
            rung={rung}
            rungLessons={lessons.map(content.summarize)}
            next={nextLesson ? content.summarize(nextLesson) : null}
            hasTest={!!content.getTestPool(rung.id)}
            spiralRung={spiral?.name ?? null}
          />
          </LessonDataProvider>
        </VisualDataProvider>
      );
    },
  };
}
