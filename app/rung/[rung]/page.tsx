import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSummaries, getCurriculum, getRung, getTestPool } from '@/lib/content/load';
import { RungView } from '@/components/ladder/RungView';

type Params = { params: { rung: string } };

export function generateStaticParams() {
  return getCurriculum().map((r) => ({ rung: r.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const r = getRung(params.rung);
  return { title: r ? `${r.name} · ${r.cefr}` : undefined };
}

export default function RungPage({ params }: Params) {
  const rung = getRung(params.rung);
  if (!rung) notFound();
  return (
    <RungView
      rung={rung}
      rungs={getCurriculum()}
      lessons={getAllSummaries().filter((l) => l.rung === rung.id)}
      hasTest={!!getTestPool(rung.id)}
    />
  );
}
