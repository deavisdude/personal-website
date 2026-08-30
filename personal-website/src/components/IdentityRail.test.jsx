// @vitest-environment jsdom

import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import IdentityRail from './IdentityRail';

afterEach(() => {
  cleanup();
});

test('keeps the identity rail useful when the profile image fails', () => {
  render(
    React.createElement(IdentityRail, {
      profile: {
        name: 'Davis Odom',
        profileImage: {
          src: '/assets/missing-profile.jpg',
          alt: 'Davis Odom profile photo',
          fallback: 'Profile photo unavailable.',
        },
      },
    }),
  );

  fireEvent.error(screen.getByRole('img', { name: 'Davis Odom profile photo' }));

  expect(
    screen.getByRole('img', { name: 'Profile photo unavailable.' }),
  ).toBeInTheDocument();
});
