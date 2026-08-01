// @vitest-environment jsdom

import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import ProjectArchive from './ProjectArchive';
import { projectEntries } from '../content/siteContent';

afterEach(() => {
  cleanup();
});

test('renders the seven approved Phase 4 projects in selected-work and archive groups', () => {
  render(<ProjectArchive projects={projectEntries} />);

  expect(screen.getByRole('heading', { name: 'Selected work' })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Archive & historical context' }),
  ).toBeInTheDocument();

  [
    'Restaurant Tracker',
    'Football Idle Game',
    'Support',
    'Flux',
    'Battle of the Masses',
    'UPBETOD',
    'BBQ App',
  ].forEach((title) => {
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  });

  expect(
    screen.getAllByText(/Two-day SPSU Summer Game Jam project/).length,
  ).toBeGreaterThan(0);
  expect(screen.queryByText(/Keep the source private/)).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Play in browser' })).not.toBeInTheDocument();
});

test('keeps empty and malformed catalogs useful', () => {
  render(<ProjectArchive projects={[null, {}, { id: 'missing-title' }]} />);

  expect(screen.getByText('No selected work is available to show right now.')).toBeInTheDocument();
  expect(
    screen.getByText('No archived or historical projects are available to show right now.'),
  ).toBeInTheDocument();
});
