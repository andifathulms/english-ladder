// The Japanese check items (CLAUDE.md §5.3, §7.3): grading, and the answer areas in practice.
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { grade } from '@ladder/core/lib/check/grade';
import { isAnswered } from '@ladder/core/lib/check/itemTypes';
import { answerText, itemText } from '@ladder/core/lib/check/text';
import { CheckItemView } from '@ladder/core/components/check/CheckItemView';
import type { CheckItem } from '@ladder/core/lib/types';
import { text } from '@/course/text';
import { AllProviders } from '../providers';

const why = { id: 'x', en: 'x' };
const kana = { id: 'k', type: 'kana', audio: 'きって', answer: 'きって', script: 'hiragana', why } as unknown as CheckItem;
const kata = { id: 'kk', type: 'kana', audio: 'コーヒー', answer: 'コーヒー', script: 'any', why } as unknown as CheckItem;
const mora = { id: 'm', type: 'mora', audio: 'おばあさん', ask: 'count', options: ['4', '5', '6'], answer: '5', why } as unknown as CheckItem;
const spelling = { id: 'ms', type: 'mora', audio: 'おばあさん', ask: 'spelling', options: ['おばさん', 'おばあさん'], answer: 'おばあさん', why } as unknown as CheckItem;
const pitch = {
  id: 'p',
  type: 'pitch',
  audio: '{箸|はし}',
  pair: [
    { ja: '{箸|はし}', kana: 'はし', pitch: 1, id: 'sumpit' },
    { ja: '{橋|はし}', kana: 'はし', pitch: 2, id: 'jembatan' },
  ],
  answer: 'sumpit',
  why,
} as unknown as CheckItem;
const form = { id: 'f', type: 'form', word: '{食|た}べる', target: 'masu', answer: '{食|た}べます', why } as unknown as CheckItem;
const order = { id: 'o', type: 'order', tiles: ['です', 'わたし', 'は', '{学生|がく|せい}'], answer: ['わたし', 'は', '{学生|がく|せい}', 'です'], why } as unknown as CheckItem;

describe('grading', () => {
  it('kana: exact after normalisation, so long vowels and っ count', () => {
    expect(grade(kana, 'きって', text).correct).toBe(true);
    expect(grade(kana, 'きて', text).correct).toBe(false);
    expect(grade(kana, 'キッテ', text).correct).toBe(false);
    expect(grade(kata, 'こーひー', text).correct).toBe(true); // script: any
  });
  it('mora, pitch and form', () => {
    expect(grade(mora, '5', text).correct).toBe(true);
    expect(grade(pitch, 'sumpit', text).correct).toBe(true);
    expect(grade(pitch, 'jembatan', text).correct).toBe(false);
    expect(grade(form, '食べます', text).correct).toBe(true);
    expect(grade(form, 'たべます', text).correct).toBe(true); // the reading counts too
    expect(grade(form, 'たべる', text).correct).toBe(false);
  });
  it('order: tokens compared after normJa (ruby markup and spaces ignored)', () => {
    expect(grade(order, ['わたし', 'は', '{学生|がく|せい}', 'です'], text).correct).toBe(true);
    expect(grade(order, ['は', 'わたし', '{学生|がく|せい}', 'です'], text).correct).toBe(false);
  });
  it('item and answer texts read without markup', () => {
    expect(itemText(form)).toBe('Ubah 食べる.');
    expect(answerText(form)).toBe('食べます');
    expect(answerText(pitch)).toBe('箸 · sumpit');
    expect(answerText(order)).toBe('わたしは学生です');
  });
  it('an empty kana box is not an answer in a test', () => {
    expect(isAnswered(kana, '', 'test')).toBe(false);
    expect(isAnswered(kana, 'き', 'test')).toBe(true);
  });
});

const practise = (item: CheckItem) => {
  const onSolved = vi.fn();
  render(
    <AllProviders>
      <CheckItemView item={item} mode="practice" onSolved={onSolved} />
    </AllProviders>,
  );
  return onSolved;
};

describe('answer areas', () => {
  it('kana: romaji becomes kana as you type, and Periksa grades it', () => {
    const solved = practise(kana);
    const input = document.querySelector('[data-kana-input]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'kitt' } });
    expect(document.querySelector('[data-kana-preview]')!.textContent).toBe('きっt');
    fireEvent.change(input, { target: { value: 'kitte' } });
    fireEvent.click(screen.getByRole('button', { name: /^(Periksa|Check)$/ }));
    expect(solved).toHaveBeenCalledWith(true);
  });

  it('kana helper keys add っ ー ゃ', () => {
    practise(kana);
    fireEvent.click(screen.getByRole('button', { name: 'っ' }));
    expect(document.querySelector('[data-kana-preview]')!.textContent).toBe('っ');
  });

  it('mora: beat counts and spellings with their beat rows', () => {
    const solved = practise(mora);
    fireEvent.click(screen.getByRole('button', { name: /5 ketukan|5 beats/ }));
    expect(solved).toHaveBeenCalledWith(true);
  });

  it('mora spelling options draw the beats', () => {
    practise(spelling);
    expect(screen.getAllByRole('img', { name: /4 ketukan|5 ketukan|4 beats|5 beats/ })).toHaveLength(2);
  });

  it('pitch: meanings with their pitch lines', () => {
    const solved = practise(pitch);
    expect(screen.getAllByRole('img', { name: /箸: 1|橋: 2/ })).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: /sumpit/ }));
    expect(solved).toHaveBeenCalledWith(true);
  });

  it('form: the word, its target form, and a kana box', () => {
    const solved = practise(form);
    expect(screen.getByText(/bentuk ます|ます form/)).toBeTruthy();
    fireEvent.change(document.querySelector('[data-kana-input]')!, { target: { value: 'tabemasu' } });
    fireEvent.click(screen.getByRole('button', { name: /^(Periksa|Check)$/ }));
    expect(solved).toHaveBeenCalledWith(true);
  });
});
