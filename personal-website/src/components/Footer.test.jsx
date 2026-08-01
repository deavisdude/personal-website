// @vitest-environment jsdom

import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import Footer from './Footer';

afterEach(() => {
  cleanup();
});

test('renders safe profile context and omits an unavailable resume', () => {
  render(
    React.createElement(Footer, {
      profile: {
        personalNote: 'Georgia, UGA, and baseball keep me curious outside work.',
        interests: [
          'Georgia',
          { label: 'University', text: 'University of Georgia' },
          'Georgia',
        ],
        socialLinks: [
          {
            type: 'social',
            label: 'GitHub profile',
            url: 'https://github.com/deavisdude',
          },
          {
            type: 'social',
            label: 'Unsafe link',
            url: 'javascript:alert(1)',
          },
        ],
        resumeLink: null,
      },
    }),
  );

  expect(
    screen.getByRole('heading', { name: 'Personal context', level: 2 }),
  ).toBeInTheDocument();
  expect(
    screen.getByText('Georgia, UGA, and baseball keep me curious outside work.'),
  ).toBeInTheDocument();
  expect(screen.getByText('University of Georgia')).toBeInTheDocument();
  expect(screen.getAllByText('Georgia')).toHaveLength(1);

  const socialNavigation = screen.getByRole('navigation', {
    name: 'Social links',
  });
  expect(
    within(socialNavigation).getByRole('link', {
      name: 'GitHub profile in footer',
    }),
  ).toHaveAttribute('href', 'https://github.com/deavisdude');
  expect(screen.queryByText('Unsafe link')).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument();
});

test('keeps malformed optional profile fields text-first and link-free', () => {
  render(
    React.createElement(Footer, {
      profile: {
        personalNote: { text: 'not approved as a string' },
        interests: { label: 'not an interests list' },
        socialLinks: 'not an array',
        resumeLink: {
          label: 'Resume',
          url: 'not-a-public-url',
          status: 'verified',
        },
      },
    }),
  );

  expect(
    screen.getByText(
      'I enjoy building useful tools and playful creative experiments.',
    ),
  ).toBeInTheDocument();
  expect(screen.queryByRole('navigation', { name: 'Social links' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});
