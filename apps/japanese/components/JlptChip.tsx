import { jlptLabel } from '@/course/adapter';

/** "N5" in mono (DESIGN §6.3): muted on paper, brass on the board; nothing for the Kana rungs. A brass
 *  "JFT" chip follows on the rung that lines up with JFT-Basic (Medium 1). */
export function JlptChip({ jlpt, jft = false, onBoard = false }: { jlpt: string; jft?: boolean; onBoard?: boolean }) {
  const label = jlptLabel(jlpt);
  if (!label && !jft) return null;
  return (
    <>
      {label && <span className={`label tnum whitespace-nowrap ${onBoard ? 'text-brass' : 'text-muted'}`}>{label}</span>}
      {jft && <span className="label whitespace-nowrap text-brass">JFT</span>}
    </>
  );
}
