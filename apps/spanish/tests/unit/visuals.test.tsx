import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';
import { AllProviders } from '../providers';
import type { VerbData } from '@/lib/es/conjugate';
import { StressMap } from '@/visuals/StressMap';
import { Agreement } from '@/visuals/Agreement';
import { SerEstar } from '@/visuals/SerEstar';
import { ConjugationGrid } from '@/visuals/ConjugationGrid';
import { GustarFlip } from '@/visuals/GustarFlip';
import { PlaceSceneEs, placeSentenceEs } from '@/visuals/PlaceSceneEs';
import { RoutineClock, clockPhrase } from '@/visuals/RoutineClock';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';

const VERBS = yaml.load(fs.readFileSync(path.join(__dirname, '../../content/data/verbs.yaml'), 'utf8'), { schema: yaml.JSON_SCHEMA }) as VerbData[];
const wrap = (ui: React.ReactNode) => render(<AllProviders>{ui}</AllProviders>);
const live = (c: HTMLElement) => c.querySelector('[aria-live="polite"]')!.textContent;

it('every visual id is registered', () => {
  expect(Object.keys(registry).sort()).toEqual([...VISUAL_IDS].sort());
});

describe('StressMap', () => {
  it('raises the stressed syllable and lights the right lane', () => {
    const { container } = wrap(<StressMap lang="id" initial="música" />);
    expect(live(container)).toBe('música: MÚ-si-ca, esdrujula, perlu aksen.');
    fireEvent.click(screen.getByRole('radio', { name: 'casa' }));
    expect(live(container)).toBe('casa: CA-sa, llana, tanpa aksen.');
  });
  it('analyses a typed word with lib/es', () => {
    const { container } = wrap(<StressMap lang="en" initial="café" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ciudad' } });
    expect(live(container)).toBe('ciudad: ciu-DAD, aguda, no accent.');
  });
});

describe('Agreement', () => {
  it('article and adjective follow the noun and its number', () => {
    const { container } = wrap(<Agreement lang="id" />);
    expect(live(container)).toMatch(/^la casa blanca/);
    fireEvent.click(screen.getByRole('radio', { name: 'libro' }));
    expect(live(container)).toMatch(/^el libro blanco/);
    fireEvent.click(screen.getByRole('switch'));
    expect(live(container)).toMatch(/^los libros blancos/);
  });
  it('the exceptions: el problema, la mano', () => {
    const { container } = wrap(<Agreement lang="id" initial={{ noun: 'mano' }} />);
    expect(live(container)).toMatch(/^la mano blanca/);
    expect(screen.getByText(/pengecualian/)).toBeTruthy();
  });
});

describe('SerEstar', () => {
  it('tap a chip, then a side: right settles with its reason, wrong goes back with a hint', () => {
    wrap(<SerEstar lang="id" />);
    fireEvent.click(screen.getByRole('button', { name: 'Estoy cansada.' }));
    fireEvent.click(screen.getByRole('button', { name: /Taruh di SER/ }));
    expect(screen.getByText(/Coba sisi lainnya/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Taruh di ESTAR/ }));
    expect(within(screen.getByRole('region', { name: 'ESTAR' })).getByText('Estoy cansada.')).toBeTruthy();
  });
  it('the keyboard path: S and E place the picked chip', () => {
    wrap(<SerEstar lang="en" />);
    const chip = screen.getByRole('button', { name: 'Soy de Medan.' });
    fireEvent.click(chip);
    fireEvent.keyDown(chip, { key: 's' });
    expect(within(screen.getByRole('region', { name: 'SER' })).getByText('Soy de Medan.')).toBeTruthy();
  });
});

describe('ConjugationGrid', () => {
  const grid = (props: Record<string, unknown> = {}) =>
    wrap(
      <VisualDataProvider value={{ verbs: VERBS }}>
        <ConjugationGrid lang="id" {...props} />
      </VisualDataProvider>,
    );
  it('is a real table with column and row headers', () => {
    grid({ verb: 'comer' });
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('columnheader')).toHaveLength(2);
    expect(within(table).getAllByRole('rowheader').map((h) => h.textContent)).toEqual(['yo', 'tú', 'él / ella / usted', 'nosotros/as', 'vosotros/asESPAÑA', 'ellos / ellas / ustedes']);
  });
  it('stems in ink, endings in the accent, from lib/es', () => {
    const { container } = grid({ verb: 'hablar' });
    expect([...container.querySelectorAll('td .es-ending')].map((e) => e.textContent)).toEqual(['o', 'as', 'a', 'amos', 'an']);
  });
  it('marks the boot for stem changes and irregular cells, and hides vosotros until asked', () => {
    const { container } = grid({ verb: 'tener' });
    const text = container.querySelector('table')!.textContent!;
    expect(text).toMatch(/tengo.*tak beraturan/);
    expect(text).toMatch(/tienes.*akar berubah/);
    expect(text).not.toMatch(/tenéis/);
    fireEvent.click(screen.getByRole('button', { name: /vosotros/ }));
    expect(container.querySelector('table')!.textContent).toMatch(/tenéis/);
  });
  it('finds a verb with or without accents', () => {
    grid({ verb: 'hablar' });
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'oir' } });
    fireEvent.click(screen.getByRole('radio', { name: 'oír' }));
    expect(screen.getByRole('table').textContent).toMatch(/oigo/);
  });
});

describe('GustarFlip', () => {
  it('gusta follows the thing liked, the pronoun follows the person', () => {
    const { container } = wrap(<GustarFlip lang="id" />);
    expect(live(container)).toMatch(/^Me gusta el café\. Saya suka kopi\./);
    fireEvent.click(screen.getByRole('switch'));
    expect(live(container)).toMatch(/^Me gustan los libros\. Saya suka buku-buku\./);
    fireEvent.click(screen.getByRole('radio', { name: 'nos · Kami' }));
    expect(live(container)).toMatch(/^Nos gustan los libros\. Kami suka/);
  });
});

describe('PlaceSceneEs', () => {
  it('sentences use estar and the table or the box as the reference', () => {
    expect(placeSentenceEs('under').es).toBe('La pelota está [[debajo de]] la mesa.');
    expect(placeSentenceEs('next to').es).toBe('La pelota está [[al lado de]] la caja.');
  });
  it('arrow keys move between places and the text alternative follows', () => {
    const { container } = wrap(<PlaceSceneEs lang="id" initial="on" />);
    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowRight' });
    expect(live(container)).toBe('La pelota está debajo de la mesa. Bolanya ada di bawah meja.');
  });
});

describe('RoutineClock', () => {
  it('says the time the Spanish way', () => {
    expect(clockPhrase(390).text).toBe('las seis y media');
    expect(clockPhrase(780).text).toBe('la una');
    expect(clockPhrase(495).text).toBe('las ocho y cuarto');
  });
  it('a time chip sets the hand and the sentence; ¿Qué hora es? switches the form', () => {
    const { container } = wrap(<RoutineClock lang="id" />);
    expect(live(container)).toBe('06:30: Me levanto a las seis y media.');
    fireEvent.click(screen.getByRole('radio', { name: '13:00' }));
    expect(live(container)).toBe('13:00: Almuerzo a la una.');
    fireEvent.click(screen.getByRole('switch'));
    expect(live(container)).toBe('13:00: Es la una.');
  });
});
