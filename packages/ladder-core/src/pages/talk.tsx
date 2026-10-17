import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Content } from '@ladder/core/lib/content/load';
import { DialogueView } from '@ladder/core/components/lesson/DialogueView';
import { titleText } from './meta';

type Params = { params: { rung: string } };

/** A rung's dialogue capstone. */
export function talkPage(content: Content) {
  return {
    generateStaticParams() {
      const withDialogue = content.getCurriculum().filter((r) => content.getDialogue(r.id));
      // A static export needs at least one path; it renders the not-found page.
      return withDialogue.length ? withDialogue.map((r) => ({ rung: r.id })) : [{ rung: 'easy-1' }];
    },
    generateMetadata({ params }: Params): Metadata {
      const d = content.getDialogue(params.rung);
      return { title: d && content.adapter.dialogue ? titleText(content, content.adapter.dialogue.title(d)) : undefined };
    },
    Page({ params }: Params) {
      const rung = content.getRung(params.rung);
      const dialogue = rung && content.getDialogue(rung.id);
      if (!rung || !dialogue) notFound();
      return <DialogueView rung={rung} dialogue={dialogue} />;
    },
  };
}
