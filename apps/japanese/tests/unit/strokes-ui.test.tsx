// Core StrokeOrder, TracePad and trace items with Japanese KanjiVG data (CLAUDE.md §7.5).
import fs from 'node:fs';
import path from 'node:path';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { StrokeOrder } from '@ladder/core/components/strokes/StrokeOrder';
import { TraceCheck } from '@ladder/core/components/strokes/TraceCheck';
import { TracePad } from '@ladder/core/components/strokes/TracePad';
import { __setStrokes } from '@ladder/core/components/strokes/useStrokes';
import { resample, toScreen } from '@ladder/core/lib/strokes/trace';
import { kvgToStrokes } from '@/lib/ja/kvg';
import { AllProviders } from '../providers';

const svg = (ch: string) => fs.readFileSync(path.join(process.cwd(), 'tests', 'fixtures', 'kanjivg', `${ch.codePointAt(0)!.toString(16).padStart(5, '0')}.svg`), 'utf8');
const MIGI = kvgToStrokes(svg('右'));
const NI = kvgToStrokes(svg('二'));

beforeAll(() => {
  if (!('PointerEvent' in window)) {
    class PE extends MouseEvent {
      pointerId: number;
      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerId = init.pointerId ?? 1;
      }
    }
    (window as unknown as { PointerEvent: typeof PE }).PointerEvent = PE;
  }
  __setStrokes('右', MIGI);
  __setStrokes('二', NI);
});

const wrap = (ui: React.ReactNode) => render(<AllProviders>{ui}</AllProviders>);

describe('StrokeOrder with KanjiVG', () => {
  it('draws centrelines with a pen width and names the strokes in Indonesian', async () => {
    const { container } = wrap(<StrokeOrder char="右" size={240} />);
    await act(async () => {});
    expect(screen.getByRole('img', { name: '右: 5 goresan' })).toBeInTheDocument();
    const path0 = container.querySelector('svg g[transform^="scale"] path') as SVGPathElement;
    expect(path0.style.fill).toBe('none');
    expect(path0.style.strokeLinecap).toBe('round');
    const items = container.querySelectorAll('ol li');
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent('sapuan kiri');
    expect(items[0].querySelector('[title]')).toHaveAttribute('title', 'はらい');
    expect(items[1]).toHaveTextContent('mendatar');
  });
});

describe('TracePad with KanjiVG medians', () => {
  it('accepts 二 drawn along its medians', () => {
    const onDone = vi.fn();
    const { container } = wrap(<TracePad data={NI} onDone={onDone} />);
    const pad = container.querySelector('[data-trace-pad]')!;
    pad.getBoundingClientRect = () => ({ left: 0, top: 0, width: 1024, height: 1024, right: 1024, bottom: 1024, x: 0, y: 0, toJSON: () => ({}) });
    for (const m of NI.medians) {
      const pts = resample(m.map(toScreen), 12);
      fireEvent.pointerDown(pad, { clientX: pts[0][0], clientY: pts[0][1], pointerId: 7 });
      for (const [x, y] of pts.slice(1)) fireEvent.pointerMove(pad, { clientX: x, clientY: y, pointerId: 7 });
      fireEvent.pointerUp(pad, { clientX: pts[11][0], clientY: pts[11][1], pointerId: 7 });
    }
    expect(onDone).toHaveBeenCalledWith(0);
  });
});

describe('trace item keyboard alternative', () => {
  it('offers the Japanese stroke names and finishes', async () => {
    const onDone = vi.fn();
    const { container } = wrap(<TraceCheck item={{ char: '二', guide: 'on' }} onDone={onDone} />);
    await act(async () => {});
    fireEvent.click(screen.getByRole('button', { name: 'Pakai keyboard' }));
    await act(async () => {});
    expect(container.querySelector('[data-stroke-option="yoko"]')).toHaveTextContent('mendatarとめ');
    fireEvent.click(container.querySelector('[data-stroke-option="yoko"]')!);
    fireEvent.click(container.querySelector('[data-stroke-option="yoko"]')!);
    expect(onDone).toHaveBeenCalledWith(0);
  });
});
