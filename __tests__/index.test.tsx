import Page from '@/app/[lang]/home/page';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('Index Testing', () => {
  render(<Page />);
  expect(screen.getByTitle('session')).toBeDefined();
});
