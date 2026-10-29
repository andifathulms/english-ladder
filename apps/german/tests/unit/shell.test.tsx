import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Rung as CoreRung } from '@ladder/core/lib/types';
import { LessonDataProvider } from '@ladder/core/components/lesson/LessonData';
import { AllProviders } from '../providers';
import { CefrChip, ClimbExtra, DoorNote } from '@/components/slots';
import { GenderChip } from '@/components/GenderChip';
import { bauhausPaths } from '@/components/Bauhaus';
import { WordsRow, foldDe, matchesWord } from '@/components/WordsRow';
import { WordsCard, WorkCard } from '@/components/StrandCards';
import { CaseColours, caseColoursValue } from '@/components/CaseColours';
import { getCurriculum, getLessons, model } from '@/course/content';
import type { DeLessonData } from '@/course/lessonData';
import type { GlossaryEntry, Lesson } from '@/course/types';

const wrap = (ui: React.ReactNode) => render(<AllProviders>{ui}</AllProviders>);
const rungs = getCurriculum();
const rung = (id: string) => rungs.find((r) => r.id === id)! as unknown as CoreRung;

describe('level chips (DESIGN §6)', () => {
  it('show the CEFR half-level, and the exit flag only on exit rungs', () => {
    const { container: e2 } = wrap(<CefrChip rung={rung('easy-2')} />);
    expect(e2.textContent).toContain('A1.2');
    expect(e2.textContent).toContain('A1 · Goethe');
    const { container: e1 } = wrap(<CefrChip rung={rung('easy-1')} />);
    expect(e1.textContent).toBe('A1.1');
    const { container: d } = wrap(<CefrChip rung={rung('dasar')} />);
    expect(d.textContent).toBe('Pra-A1');
  });
  it('the exits sit on Easy 2, Medium 1, Medium 3, Hard 2 and Hard 3', () => {
    expect(rungs.filter((r) => r.milestone).map((r) => r.id)).toEqual(['easy-2', 'medium-1', 'medium-3', 'hard-2', 'hard-3']);
  });
});

describe('climb moment (G2)', () => {
  it('names the exam on an exit rung, and only there', () => {
    const { container: exit } = wrap(<ClimbExtra rung={rung('easy-2')} />);
    expect(exit.querySelector('[data-exit]')?.textContent).toBe('A1 selesai. Ini level ujian Goethe-Zertifikat A1 / Start Deutsch 1.');
    expect(exit.textContent).toContain('Schritt für Schritt.');
    const { container: plain } = wrap(<ClimbExtra rung={rung('easy-1')} />);
    expect(plain.querySelector('[data-exit]')).toBeNull();
  });
});

it('door 1 offers Dasar', () => {
  wrap(<DoorNote />);
  expect(screen.getByRole('link', { name: 'Mulai dari Dasar.' }).getAttribute('href')).toMatch(/\/rung\/dasar\/?$/);
});

describe('gender chips (DESIGN §3.2)', () => {
  it('carry the article, a shape and a text label, never colour alone', () => {
    const { container } = wrap(
      <>
        <GenderChip gender="m" />
        <GenderChip gender="f" />
        <GenderChip gender="n" />
      </>,
    );
    const chips = [...container.querySelectorAll('[data-gender]')];
    expect(chips.map((c) => c.textContent)).toEqual(['der · maskulin', 'die · feminin', 'das · netral']);
    expect(chips.map((c) => c.querySelector('svg > *')!.tagName)).toEqual(['rect', 'circle', 'path']);
  });
});

it('the Bauhaus board is deterministic, with brass on every fifth shape', () => {
  const a = bauhausPaths();
  expect(a).toEqual(bauhausPaths());
  const count = (d: string) => (d.match(/M/g) ?? []).length;
  expect(count(a.brass)).toBeGreaterThan(0);
  expect(count(a.shapes)).toBeGreaterThan(count(a.brass) * 3);
});

describe('My words row', () => {
  const row = (g: GlossaryEntry) => wrap(<ul><WordsRow word={{ key: g.de, text: g.de, meaning: { id: g.id }, raw: g }} /></ul>);
  it('a noun: chip, plural with die, and its gender clue', () => {
    const { container } = row({ de: 'Zeitung', id: 'koran', pos: 'noun', gender: 'f', plural: 'Zeitungen' } as GlossaryEntry);
    expect(container.textContent).toContain('die Zeitungen');
    expect(container.textContent).toContain('-ung');
  });
  it('a separable verb: the joint and the Perfekt', () => {
    const { container } = row({ de: 'anrufen', id: 'menelepon', pos: 'verb', sep: 'an', verb: { aux: 'haben', partizip: 'angerufen' } } as GlossaryEntry);
    expect(container.textContent).toContain('an|rufen');
    expect(container.textContent).toContain('hat angerufen');
  });
  it('search ignores umlauts and ß', () => {
    expect(foldDe('Straße')).toBe(foldDe('strasse'));
    const g = { de: 'schön', id: 'indah', pos: 'adj' } as GlossaryEntry;
    expect(matchesWord({ key: 'schön', text: 'schön', meaning: { id: 'indah' }, raw: g }, 'schon')).toBe(true);
    expect(matchesWord({ key: 'schön', text: 'schön', meaning: { id: 'indah' }, raw: g }, 'indah')).toBe(true);
  });
});

describe('strand cards', () => {
  const lesson = getLessons('easy-1', { includeDrafts: true })[0] as Lesson;
  it('Kerja: the situation and the Sie exchange', () => {
    const { container } = wrap(<WorkCard work={lesson.work!} />);
    expect(container.textContent).toContain('Kerja');
    expect(container.textContent).toContain('Wie geht es Ihnen?');
  });
  it('Kata: bridges through Dutch, false friends and compound joints', () => {
    const data = model.lessonData!({ ...lesson, words: { id: 'x', en: 'x', bridges: ['Koffer', 'Pension'], compounds: [['Arbeit', 'Platz']] } } as never) as DeLessonData;
    const { container } = wrap(
      <LessonDataProvider value={data}>
        <WordsCard words={{ id: 'Kata.', en: 'Words.' }} data={data} />
      </LessonDataProvider>,
    );
    expect(container.textContent).toContain('koper');
    expect(container.textContent).toContain('koffer');
    expect(container.textContent).toContain('Pension');
    expect(container.textContent).toMatch(/Arbeit\s*s\s*·\s*platz/);
    expect(container.textContent).toContain('Arbeitsplatz');
  });
});

describe('case colours (plan R10)', () => {
  it('follow the rung: on until Medium 1 is climbed; on and off as set', () => {
    expect(caseColoursValue('rung', false)).toBe('on');
    expect(caseColoursValue('rung', true)).toBe('off');
    expect(caseColoursValue('on', true)).toBe('on');
    expect(caseColoursValue('off', false)).toBe('off');
  });
  it('sets data-case-colours on <html> (on by default)', () => {
    wrap(<CaseColours />);
    expect(document.documentElement.getAttribute('data-case-colours')).toBe('on');
  });
});
