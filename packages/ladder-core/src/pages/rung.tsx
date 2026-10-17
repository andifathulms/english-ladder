import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Content } from '@ladder/core/lib/content/load';
import { RungView } from '@ladder/core/components/ladder/RungView';

type Params = { params: { rung: string } };

/** A rung: its board, lessons, test and capstones. */
export function rungPage(content: Content) {
  return {
    generateStaticParams: () => content.getCurriculum().map((r) => ({ rung: r.id })),
    generateMetadata({ params }: Params): Metadata {
      const r = content.getRung(params.rung);
      return { title: r ? [r.name, content.adapter.rung?.levelLabel(r) ?? r.cefr].filter(Boolean).join(' · ') : undefined };
    },
    Page({ params }: Params) {
      const rung = content.getRung(params.rung);
      if (!rung) notFound();
      const pool = content.getTestPool(rung.id);
      const reading = content.getReading(rung.id);
      const dialogue = content.getDialogue(rung.id);
      const talk = content.adapter.dialogue;
      return (
        <RungView
          rung={rung}
          rungs={content.getCurriculum()}
          lessons={content.getAllSummaries().filter((l) => l.rung === rung.id)}
          test={pool ? { draw: pool.draw, pass: pool.pass } : null}
          reading={reading ? { title: content.adapter.reading.title(reading), items: reading.items.length } : null}
          hasPlacement={!!content.getPlacement()}
          extra={content.model.rungData?.(rung)}
          dialogue={
            dialogue && talk
              ? { title: talk.title(dialogue), lines: talk.lines(dialogue).length, items: dialogue.items.length }
              : null
          }
        />
      );
    },
  };
}
