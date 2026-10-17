// Proves the CourseConfig seam: engine components take their target lang/dir and text
// alignment from the config, not from hard-coded English. Renders with a fake RTL course
// (lang: 'ar', dir: 'rtl') and asserts the attributes and text-start alignment.
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { CourseProvider } from '@ladder/core/course/context';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { OptionPill } from '@ladder/core/components/check/OptionPill';
import { CheckItemView } from '@ladder/core/components/check/CheckItemView';
import type { CheckItem } from '@ladder/core/lib/types';
import { fakeArabic } from './fakeCourse';


const wrap = (ui: React.ReactNode) =>
  render(
    <CourseProvider config={fakeArabic}>
      <ProgressProvider>{ui}</ProgressProvider>
    </CourseProvider>,
  );

describe('CourseConfig seam (fake RTL course)', () => {
  it('Sentence takes lang/dir and text-start from the course', () => {
    const { container } = wrap(<Sentence en="The ball is [[under]] the table." play={false} />);
    const p = container.querySelector('p');
    expect(p?.getAttribute('lang')).toBe('ar');
    expect(p?.getAttribute('dir')).toBe('rtl');
    expect(p?.className).toContain('text-start');
    expect(p?.className).toContain('sentence-arabic');
  });

  it('OptionPill takes lang/dir and text-start from the course', () => {
    const { container } = wrap(
      <OptionPill label="under" state="idle" index={0} onClick={() => {}} />,
    );
    const btn = container.querySelector('button');
    expect(btn?.getAttribute('lang')).toBe('ar');
    expect(btn?.getAttribute('dir')).toBe('rtl');
    expect(btn?.className).toContain('text-start');
  });

  it('CheckItemView gap prompt takes lang/dir and text-start from the course', () => {
    const item: CheckItem = {
      id: 'x',
      type: 'gap',
      prompt: 'The keys are ___ the table.',
      options: ['in', 'on'],
      answer: 'on',
      why: { id: 'x', en: 'y' },
    };
    const { container } = wrap(
      <CheckItemView item={item} mode="practice" onSolved={() => {}} />,
    );
    const prompt = container.querySelector('p[lang="ar"]');
    expect(prompt).not.toBeNull();
    expect(prompt?.getAttribute('dir')).toBe('rtl');
    expect(prompt?.className).toContain('text-start');
    // Options also carry the course lang/dir.
    const opt = container.querySelector('button[data-state]');
    expect(opt?.getAttribute('lang')).toBe('ar');
    expect(opt?.getAttribute('dir')).toBe('rtl');
  });
});

import { shellDir } from '@ladder/core/course/types';

describe('shell direction', () => {
  it('follows the target unless the course pins the shell (Arabic: LTR page, RTL islands)', () => {
    expect(shellDir(fakeArabic)).toBe('rtl');
    expect(shellDir({ ...fakeArabic, shell: { dir: 'ltr' } })).toBe('ltr');
  });
});
