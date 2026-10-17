import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Content } from '@ladder/core/lib/content/load';
import { ReadingView } from '@ladder/core/components/lesson/ReadingView';
import { titleText } from './meta';

type Params = { params: { rung: string } };

/** A rung's Read & listen capstone. */
export function readPage(content: Content) {
  return {
    generateStaticParams() {
      const withReading = content.getCurriculum().filter((r) => content.getReading(r.id));
      // A static export needs at least one path; it renders the not-found page.
      return withReading.length ? withReading.map((r) => ({ rung: r.id })) : [{ rung: 'easy-1' }];
    },
    generateMetadata({ params }: Params): Metadata {
      const reading = content.getReading(params.rung);
      return { title: reading ? titleText(content, content.adapter.reading.title(reading)) : undefined };
    },
    Page({ params }: Params) {
      const rung = content.getRung(params.rung);
      const reading = rung && content.getReading(rung.id);
      if (!rung || !reading) notFound();
      return <ReadingView rung={rung} reading={reading} />;
    },
  };
}
