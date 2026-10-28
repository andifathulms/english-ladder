import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StressWords } from '@/components/es/StressWords';
import { langOf } from '@/components/es/EsLine';

describe('StressWords (Tirukan)', () => {
  it('underlines the stressed syllable of each word of two or more syllables', () => {
    const { container } = render(<p>{<StressWords text="¡Hola! Me llamo Rina. [[Mucho]] gusto." />}</p>);
    expect([...container.querySelectorAll('.es-stress')].map((e) => e.textContent)).toEqual(['Ho', 'lla', 'Ri', 'Mu', 'gus']);
    expect(container.textContent).toBe('¡Hola! Me llamo Rina. Mucho gusto.');
  });

  it('follows the written accent', () => {
    const { container } = render(<p>{<StressWords text="El café, la música." />}</p>);
    expect([...container.querySelectorAll('.es-stress')].map((e) => e.textContent)).toEqual(['fé', 'mú']);
  });
});

it('Spanish lines are es-419, España lines es-ES', () => {
  expect(langOf('latam')).toBe('es-419');
  expect(langOf('es')).toBe('es-ES');
});
