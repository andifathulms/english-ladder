import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getCurriculum,
  getLesson,
  getLessons,
  getNouns,
  getRung,
  getTestPool,
  summarize,
} from '@ladder/core/lib/content/load';
import { LessonPlayer } from '@ladder/core/components/lesson/LessonPlayer';

type Params = { params: { rung: string; lesson: string } };

export function generateStaticParams() {
  const params = getCurriculum().flatMap((r) =>
    getLessons(r.id).map((l) => ({ rung: r.id, lesson: l.slug })),
  );
  // A static export needs at least one path; it renders the not-found page.
  return params.length ? params : [{ rung: 'easy-1', lesson: 'none' }];
}

export function generateMetadata({ params }: Params): Metadata {
  const l = getLesson(params.rung, params.lesson);
  return { title: l ? l.title.en : undefined };
}

export default function LessonPage({ params }: Params) {
  const rung = getRung(params.rung);
  const lesson = getLesson(params.rung, params.lesson);
  if (!rung || !lesson) notFound();

  const lessons = getLessons(rung.id);
  const nextLesson =
    (lesson.next && lessons.find((l) => l.id === lesson.next)) ||
    lessons.find((l) => l.order === lesson.order + 1) ||
    null;
  const rungs = getCurriculum();
  const spiral = rungs
    .slice(rungs.findIndex((r) => r.id === rung.id) + 1)
    .find((r) => r.threads.includes(lesson.spiral));
  const usesNouns =
    lesson.visual?.id === 'noun-builder' ||
    lesson.check.some((c) => c.type === 'scene' && c.visual.id === 'noun-builder');

  return (
    <LessonPlayer
      lesson={lesson}
      rung={rung}
      rungLessons={lessons.map(summarize)}
      next={nextLesson ? summarize(nextLesson) : null}
      hasTest={!!getTestPool(rung.id)}
      spiralRung={spiral?.name ?? null}
      nouns={usesNouns ? getNouns() : undefined}
    />
  );
}
