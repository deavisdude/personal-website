// @vitest-environment jsdom

import React from 'react';
import '@testing-library/jest-dom/vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import App from './App';

afterEach(() => {
  cleanup();
});

test('renders the P1 identity and current-first experience flow', () => {
  render(React.createElement(App));

  expect(
    screen.getByRole('heading', { name: 'Davis Odom', level: 1 }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByText('Senior Software Engineer').length,
  ).toBeGreaterThan(0);
  expect(screen.getByText('Georgia, USA')).toBeInTheDocument();
  expect(
    screen.getAllByText(/software engineer from Georgia who builds tools/i)
      .length,
  ).toBeGreaterThan(0);
  expect(
    screen.getAllByText(/Current software-engineering and developer-tools context/i)
      .length,
  ).toBeGreaterThan(0);
  expect(
    screen.getByRole('link', { name: 'LinkedIn profile' }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/davisodom');
  expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Experience' }),
  ).toBeInTheDocument();
});

test('provides anchored navigation and updates the active section', () => {
  render(React.createElement(App));

  const navigation = screen.getByRole('navigation', {
    name: 'Primary navigation',
  });
  const aboutLink = within(navigation).getByRole('link', { name: 'About' });
  const experienceLink = within(navigation).getByRole('link', {
    name: 'Experience',
  });

  expect(aboutLink).toHaveAttribute('href', '#about');
  expect(experienceLink).toHaveAttribute('href', '#experience');
  expect(aboutLink).toHaveAttribute('aria-current', 'location');
  expect(experienceLink).not.toHaveAttribute('aria-current');

  fireEvent.click(experienceLink);

  expect(experienceLink).toHaveAttribute('aria-current', 'location');
  expect(aboutLink).not.toHaveAttribute('aria-current');
});
