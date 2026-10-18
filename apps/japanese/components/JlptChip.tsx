import { jlptLabel } from '@/course/adapter';

/** "N5" in mono (DESIGN §6.3): muted on paper, brass on the board; nothing for the Kana rungs. A brass
 *  "JFT" chip follows on the rung that lines up with JFT-Basic (Medium 1): brass text on the board, a
 *  brass outline on paper. */
export function JlptChip({ jlpt, jft = false, onBoard = false }: { jlpt: string; jft?: boolean; onBoard?: boolean }) {
  const label = jlptLabel(jlpt);
  if (!label && !jft) return null;
  return (
    <>
      {label && <span className={`label tnum whitespace-nowrap ${onBoard ? 'text-brass' : 'text-muted'}`}>{label}</span>}
      {jft &&
        (onBoard ? (
          <span className="label whitespace-nowrap text-brass">JFT</span>
        ) : (
          // Brass is too light for text on paper: ink text in a brass outline.
          <span className="label whitespace-nowrap rounded-sm px-1 text-ink" style={{ boxShadow: 'inset 0 0 0 1px var(--brass)' }}>
            JFT
          </span>
        ))}
    </>
  );
}
