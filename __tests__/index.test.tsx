import Page from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Page />); // ARRANGE

    const myElem = screen.getByTitle('Testing-title'); // ACT

    expect(myElem).toBeInTheDocument(); // ASSERT
  });
});
