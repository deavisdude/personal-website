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
    screen.getByRole('img', {
      name: 'Davis Odom smiling in a white shirt and orange apron.',
    }),
  ).toHaveAttribute('src', '/assets/davis-odom-profile.jpg');
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
  const aboutSection = screen
    .getByRole('heading', { name: 'About' })
    .closest('section');
  expect(aboutSection).toHaveTextContent(
    'I enjoy building useful tools and playful creative experiments.',
  );
  expect(aboutSection).not.toHaveTextContent(
    'I’m a software engineer from Georgia who builds tools, games, simulations and anything else that inspires me.',
  );
  expect(aboutSection).not.toHaveTextContent(
    'Current software-engineering and developer-tools context at The Home Depot.',
  );
  expect(
    screen.getByRole('link', { name: 'LinkedIn profile' }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/davisodom');
  expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Experience' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Work', level: 2 }),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Support' })).toBeInTheDocument();
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
  const workLink = within(navigation).getByRole('link', { name: 'Work' });

  expect(aboutLink).toHaveAttribute('href', '#about');
  expect(experienceLink).toHaveAttribute('href', '#experience');
  expect(workLink).toHaveAttribute('href', '#work');
  expect(aboutLink).toHaveAttribute('aria-current', 'location');
  expect(experienceLink).not.toHaveAttribute('aria-current');

  fireEvent.click(experienceLink);

  expect(experienceLink).toHaveAttribute('aria-current', 'location');
  expect(aboutLink).not.toHaveAttribute('aria-current');
});

test('tracks the mouse position through CSS variables', () => {
  render(React.createElement(App));

  fireEvent.mouseMove(window, { clientX: 240, clientY: 360 });

  expect(document.documentElement.style.getPropertyValue('--pointer-x')).toBe(
    '240px',
  );
  expect(document.documentElement.style.getPropertyValue('--pointer-y')).toBe(
    '360px',
  );
});

test('spawns a random tool from the Home Depot work card', () => {
  render(React.createElement(App));

  fireEvent.click(
    screen.getByRole('button', {
      name: 'The Home Depot work. Click for a surprise.',
    }),
    { clientX: 240, clientY: 360 },
  );

  expect(screen.getByTestId('home-depot-tool')).toHaveAttribute('data-tool');
});
