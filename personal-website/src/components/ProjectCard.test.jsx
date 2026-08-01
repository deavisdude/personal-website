// @vitest-environment jsdom

import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import ProjectCard from './ProjectCard';

afterEach(() => {
  cleanup();
});

const unverifiedRepository = {
  id: 'archive-project',
  title: 'Archive project',
  category: 'archive',
  dateLabel: '2015',
  dateEvidence: [
    {
      source: 'Approved public profile evidence',
      detail: 'Historical profile record dated 2015.',
    },
  ],
  summary: 'A text-first project summary.',
  role: 'Software Engineer',
  status: 'repository-only',
  attribution: {
    text: 'Davis contributed as a Software Engineer.',
  },
  links: [
    {
      id: 'archive-repository',
      url: 'https://github.com/example/archive-project',
      type: 'repository',
      label: 'Public repository',
      source: 'Approved public source repository',
      status: 'unverified',
      checkedAt: '2026-08-01',
      fallbackLabel: 'Public source repository; current browser play is unverified.',
    },
  ],
  media: [],
  fallback: 'Repository context only; no current browser play is claimed.',
};

test('renders project context and keeps an unverified repository out of browser play', () => {
  render(<ProjectCard project={unverifiedRepository} />);

  expect(screen.getByRole('heading', { name: 'Archive project' })).toBeInTheDocument();
  expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  expect(screen.getByText('Historical profile record dated 2015.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Public repository' })).toHaveAttribute(
    'href',
    'https://github.com/example/archive-project',
  );
  expect(screen.queryByRole('link', { name: 'Play in browser' })).not.toBeInTheDocument();
  expect(
    screen.getByText('Public source repository; current browser play is unverified.'),
  ).toBeInTheDocument();
});

test('only renders Play in browser for an explicitly verified demo', () => {
  render(
    <ProjectCard
      project={{
        ...unverifiedRepository,
        id: 'verified-project',
        title: 'Verified project',
        status: 'browser-verified',
        links: [
          {
            id: 'verified-demo',
            url: 'https://example.com/verified-project',
            type: 'demo',
            label: 'Project demo',
            source: 'Current browser verification record',
            status: 'verified',
            checkedAt: '2026-08-01',
          },
        ],
      }}
    />,
  );

  expect(screen.getByRole('link', { name: 'Play in browser' })).toHaveAttribute(
    'href',
    'https://example.com/verified-project',
  );
});

test('falls back when a supplied media asset fails to load and malformed input does not throw', () => {
  render(
    <ProjectCard
      project={{
        ...unverifiedRepository,
        media: [
          {
            id: 'missing-screenshot',
            src: '/projects/missing-screenshot.png',
            alt: 'Project screenshot',
            fallback: 'The approved screenshot is unavailable.',
          },
        ],
      }}
    />,
  );

  fireEvent.error(screen.getByRole('img', { name: 'Project screenshot' }));
  expect(screen.getByText('The approved screenshot is unavailable.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Archive project' })).toBeInTheDocument();

  render(<ProjectCard project={null} />);
  expect(screen.getByRole('heading', { name: 'Project context unavailable' })).toBeInTheDocument();
});
