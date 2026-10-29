import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';
import { AllProviders } from '../providers';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { MouthPlacesDe } from '@/visuals/MouthPlacesDe';
import { GenderTiles, KNOWN_SUFFIXES, TRAY_CLUE_SUFFIXES } from '@/visuals/GenderTiles';
import { CaseMachine } from '@/visuals/CaseMachine';
import { VerbBracket } from '@/visuals/VerbBracket';
import { WechselScene, wechselPhrase, WECHSEL_PLACES } from '@/visuals/WechselScene';
import { CompoundBuilder } from '@/visuals/CompoundBuilder';
import { DayPlanner } from '@/visuals/DayPlanner';
import type { DeVisualData } from '@/visuals/data';

const load = (f: string) => yaml.load(fs.readFileSync(path.join(__dirname, '../../content/data', f), 'utf8'));
const data = { nouns: load('nouns.yaml'), verbs: load('verbs.yaml') } as DeVisualData;
const wrap = (ui: React.ReactNode) =>
  render(
    <AllProviders>
      <VisualDataProvider value={data}>{ui}</VisualDataProvider>
    </AllProviders>,
  );
// Core's Toggle names its switch through an id built from the label, which breaks on spaces (noted in
// the M6 review); find switches by position instead.
const switches = () => screen.getAllByRole('switch');
const sentence = (c: HTMLElement) => c.querySelector('[data-sentence]')!.textContent!.replace(/\s+/g, ' ').trim();

it('every visual id is registered', () => {
  expect(Object.keys(registry).sort()).toEqual([...VISUAL_IDS].sort());
});

describe('MouthPlacesDe (DESIGN §7.1)', () => {
  it('ü is the i-tongue with rounded lips; the toggle spreads them into i', () => {
    const { container } = wrap(<MouthPlacesDe lang="id" initial="ü" />);
    expect(container.querySelector('[data-lips="rounded"]')).not.toBeNull();
    expect(container.querySelector('[data-tongue]')?.getAttribute('data-tongue')).toBe('front-high');
    fireEvent.click(switches()[0]);
    expect(container.querySelector('[data-lips="rounded"]')).toBeNull();
    expect(container.querySelector('[aria-live]')?.textContent).toMatch(/^i:/);
  });
  it('ach is made at the soft palate, with the kh bridge', () => {
    const { container } = wrap(<MouthPlacesDe lang="id" initial="ach" />);
    expect(container.querySelector('[data-tongue]')?.getAttribute('data-tongue')).toBe('back-high');
    expect(container.querySelector('[aria-live]')?.textContent).toContain('kh');
  });
});

describe('GenderTiles (DESIGN §7.2)', () => {
  it('its tray clues are lib/de clues', () => {
    for (const s of TRAY_CLUE_SUFFIXES) expect(KNOWN_SUFFIXES).toContain(s);
  });
  it('a noun in its tray lights its clue; a wrong tray says the article', () => {
    const { container } = wrap(<GenderTiles lang="id" nouns={['Zeitung', 'Kuchen']} />);
    fireEvent.click(container.querySelector('[data-noun="Zeitung"]')!);
    fireEvent.click(container.querySelector('[data-tray="m"]')!);
    expect(container.querySelector('[aria-live]')?.textContent).toBe('Belum: Zeitung itu die.');
    fireEvent.click(container.querySelector('[data-tray="f"]')!);
    expect(container.querySelector('[aria-live]')?.textContent).toContain('akhiran -ung');
    expect((container.querySelector('[data-clue="-ung"]') as HTMLElement).style.fontWeight).toBe('700');
    fireEvent.click(container.querySelector('[data-noun="Kuchen"]')!);
    fireEvent.click(container.querySelector('[data-tray="m"]')!);
    expect(container.querySelector('[aria-live]')?.textContent).toContain('hafalkan saja');
  });
});

describe('CaseMachine (DESIGN §7.3)', () => {
  it('builds the sentence with articles from lib/de, colouring only the changed letters', () => {
    const { container } = wrap(<CaseMachine lang="id" />);
    expect(sentence(container)).toBe('Der Mann gibt dem Kind den Ball.');
    expect([...container.querySelectorAll('[data-sentence] .case-dat, [data-sentence] .case-akk')].map((e) => e.textContent)).toEqual(['m', 'n']);
    expect(container.querySelector('[data-meaning]')?.textContent).toBe('Laki-laki itu memberi anak bola.');
  });
  it('role changes give the right articles; labels stay with colours off', () => {
    const { container } = wrap(<CaseMachine lang="id" />);
    fireEvent.change(screen.getByRole('combobox', { name: /WEN\?/ }), { target: { value: 'Tasche' } });
    fireEvent.change(screen.getByRole('combobox', { name: /WEM\?/ }), { target: { value: 'Frau' } });
    expect(sentence(container)).toBe('Der Mann gibt der Frau die Tasche.');
    fireEvent.click(switches()[0]);
    expect(sentence(container)).toBe('Der Mann gibt einer Frau eine Tasche.');
    document.documentElement.setAttribute('data-case-colours', 'off');
    expect([...container.querySelectorAll('[data-role] .label:not([data-gender])')].map((e) => e.textContent)).toEqual(['WER?', 'Nom', 'WEM?', 'Dat', 'WEN? / WAS?', 'Akk']);
  });
});

describe('VerbBracket (DESIGN §7.4)', () => {
  it('fronting a chip keeps the verb in zone 2', () => {
    const { container } = wrap(<VerbBracket lang="id" id="Aku bangun jam 6." />);
    expect(sentence(container)).toBe('Ich stehe um 6 Uhr auf.');
    fireEvent.click(screen.getByRole('button', { name: 'Pindahkan um 6 Uhr ke posisi 1' }));
    expect(sentence(container)).toBe('Um 6 Uhr stehe ich auf.');
    expect(container.querySelector('[data-zone="verb"]')?.textContent).toContain('stehe');
  });
  it('the modal sends the infinitive to the end; weil sends the verb last', () => {
    const { container } = wrap(<VerbBracket lang="id" weil />);
    fireEvent.click(switches()[0]);
    expect(sentence(container)).toBe('Ich kann um 6 Uhr aufstehen.');
    fireEvent.click(switches()[0]);
    fireEvent.click(switches()[1]);
    expect(sentence(container)).toBe('Weil ich um 6 Uhr aufstehe …');
  });
});

describe('WechselScene (DESIGN §7.5)', () => {
  it('wo? takes the dative, wohin? the accusative', () => {
    const { container } = wrap(<WechselScene lang="id" />);
    expect(sentence(container)).toBe('Der Ball liegt auf der Kiste. Dat');
    fireEvent.click(switches()[0]);
    expect(sentence(container)).toBe('Ich lege den Ball auf die Kiste. Akk');
    expect(container.querySelector('[data-motion-arc]')).not.toBeNull();
  });
  it('eight places, with zwischen drawing the second box (G4)', () => {
    expect(WECHSEL_PLACES).toHaveLength(8);
    expect(wechselPhrase('under', false)).toMatchObject({ prep: 'unter', art: 'dem', noun: 'Tisch' });
    expect(wechselPhrase('between', false)).toMatchObject({ prep: 'zwischen', art: 'den', noun: 'Kisten' });
    expect(wechselPhrase('between', true)).toMatchObject({ art: 'die', kase: 'akk' });
    const { container } = wrap(<WechselScene lang="id" initial="between" />);
    expect(container.querySelector('[data-second-box]')).not.toBeNull();
  });
});

describe('CompoundBuilder (DESIGN §7.6)', () => {
  it('shows the joint and takes the last part’s gender', () => {
    const { container } = wrap(<CompoundBuilder lang="id" compounds={['Arbeitsplatz']} />);
    expect(container.querySelector('[data-joint]')?.textContent).toBe('s');
    fireEvent.click(screen.getByRole('button', { name: 'Gabungkan' }));
    expect(container.querySelector('[data-result]')?.textContent).toContain('Arbeitsplatz');
    expect(container.querySelector('[data-result] [data-gender]')?.getAttribute('data-gender')).toBe('m');
  });
});

describe('DayPlanner (DESIGN §7.7)', () => {
  it('builds am + day, um + hour and the separable bracket', () => {
    const { container } = wrap(<DayPlanner lang="id" />);
    expect(sentence(container)).toBe('Am Montag stehe ich um 6 Uhr auf.');
    fireEvent.click(screen.getByRole('radio', { name: /^an\s?rufen$/ }));
    fireEvent.click(screen.getByRole('radio', { name: 'Mittwoch' }));
    expect(sentence(container)).toBe('Am Mittwoch rufe ich um 6 Uhr meine Mutter an.');
  });
});
