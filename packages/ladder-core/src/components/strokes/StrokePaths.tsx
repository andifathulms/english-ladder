import { TRACE_CONFIG, type StrokeData, type TraceConfig } from '@ladder/core/lib/strokes/trace';
import { useCourse } from '@ladder/core/course/context';

/** The practice grid (田字格, and optionally the 米字格 diagonals) behind a character, in the 1024 grid. */
export function PracticeGrid({ mizi = false }: { mizi?: boolean }) {
  const s = { stroke: 'var(--grid-line)', strokeWidth: 6 };
  const d = { ...s, strokeDasharray: '24 20' };
  return (
    <g aria-hidden>
      <rect x="3" y="3" width="1018" height="1018" fill="none" style={s} />
      <line x1="0" y1="512" x2="1024" y2="512" style={d} />
      <line x1="512" y1="0" x2="512" y2="1024" style={d} />
      {mizi && (
        <>
          <line x1="0" y1="0" x2="1024" y2="1024" style={d} />
          <line x1="1024" y1="0" x2="0" y2="1024" style={d} />
        </>
      )}
    </g>
  );
}

/** Pen width for centreline strokes, in the stroke file's own units (KanjiVG: 109). */
export const centrelineWidth = (data: StrokeData) => (data.size ?? 109) * 0.042;

/** One stroke's shape at a colour: a filled outline, or a centreline drawn with the pen width. */
export function strokeStyle(data: StrokeData, color: string, extra: React.CSSProperties = {}): React.CSSProperties {
  return data.kind === 'centreline'
    ? { fill: 'none', stroke: color, strokeWidth: centrelineWidth(data), strokeLinecap: 'round', strokeLinejoin: 'round', ...extra }
    : { fill: color, ...extra };
}

/** The transform from a stroke file's space to the 1024 screen grid. */
export const strokeTransform = (data: StrokeData) => (data.kind === 'centreline' ? `scale(${1024 / (data.size ?? 109)})` : 'translate(0 900) scale(1 -1)');

/** The course's matching thresholds over the defaults. */
export function useTraceConfig(): TraceConfig {
  const c = useCourse().strokes?.config;
  return c ? { ...TRACE_CONFIG, ...c } : TRACE_CONFIG;
}
