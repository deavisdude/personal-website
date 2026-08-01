// @vitest-environment jsdom

import React from 'react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import MobileNavigation from './MobileNavigation';

afterEach(() => {
  cleanup();
});

const navigation = [
  { id: 'about-link', label: 'About', targetId: 'about' },
  { id: 'work-link', label: 'Work', targetId: 'work' },
];

test('opens with an accessible label and returns focus after Escape', async () => {
  const user = userEvent.setup();
  render(<MobileNavigation navigation={navigation} />);

  const menuButton = screen.getByRole('button', { name: 'Open menu' });
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await user.click(menuButton);

  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  expect(
    screen.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toBeVisible();

  await user.keyboard('{Escape}');

  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('delegates section navigation and closes after a primary link activation', async () => {
  const user = userEvent.setup();
  const onNavigate = vi.fn();
  render(<MobileNavigation navigation={navigation} onNavigate={onNavigate} />);

  await user.click(screen.getByRole('button', { name: 'Open menu' }));
  const mobileNavigation = screen.getByRole('navigation', {
    name: 'Mobile navigation',
  });
  await user.click(
    within(mobileNavigation).getByRole('link', { name: 'Work' }),
  );

  expect(onNavigate).toHaveBeenCalledTimes(1);
  expect(onNavigate.mock.calls[0][1]).toBe('work');
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});
