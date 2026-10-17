// Content-model hooks a course may add (Mandarin uses all of them); English declares none.
import { describe, expect, it } from 'vitest';
import { createContent } from '@ladder/core/lib/content/load';
import { content, model } from '@/course/content';

const hooked = createContent({
  ...model,
  postParse: {
    lesson: (l, where) => ({ ...l, check: l.check.map((c) => ({ ...c, cue: `${where}:${c.id}` })) }),
    testPool: (p, rungId) => ({ ...p, items: p.items.slice(0, 1), rungId }) as typeof p,
  },
  summaryExtra: (l) => ({ wordCount: (l.glossary as unknown[]).length }),
  lessonData: (l) => ({ id: l.id }),
  visualData: (ids, ctx) => ({ ids: [...ids], lesson: ctx.lesson?.id ?? null }),
  adapter: { ...model.adapter, lesson: { ...model.adapter.lesson, quote: (line) => ({ text: 'Q', raw: line.text }) } },
});

describe('content hooks', () => {
  const rung = content.getCurriculum().find((r) => r.status === 'live')!;
  const lessons = hooked.getLessons(rung.id, { includeDrafts: true });

  it('postParse fills parsed lessons and pools', () => {
    expect(lessons[0].check[0].cue).toBe(`${rung.id}/${lessons[0].slug}.md:${lessons[0].check[0].id}`);
    expect(hooked.getTestPool(rung.id)?.items).toHaveLength(1);
  });

  it('summaries carry summaryExtra and the course quote', () => {
    const s = hooked.summarize(lessons[0]);
    expect(s.wordCount).toBe((lessons[0].glossary as unknown[]).length);
    expect(s.resume[0]).toMatchObject({ text: 'Q' });
  });

  it('lesson and visual data come from the model', () => {
    expect(hooked.model.lessonData?.(lessons[0])).toEqual({ id: lessons[0].id });
    expect(hooked.visualDataFor(['a'], { lesson: lessons[0] })).toEqual({ ids: ['a'], lesson: lessons[0].id });
  });

  it('without hooks nothing changes', () => {
    const plain = content.summarize(content.getLessons(rung.id, { includeDrafts: true })[0]);
    expect(plain).not.toHaveProperty('wordCount');
    expect(plain.resume[0].raw).toBeUndefined();
  });
});
