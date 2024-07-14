import Page from '@/app/page';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('Index Testing', () => {
  render(<Page />, {
    hydrate: true,
    legacyRoot: true,
  });
  expect(screen.getByTitle('session')).toBeDefined();
});
