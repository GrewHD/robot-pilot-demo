import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByAltText(/Bellroy Logo/i);
  expect(linkElement).toBeInTheDocument();
});

test('robot rotates on arrow clicks', async () => {
  render(<App />);

  const rotateLeftButton = screen.getByRole('button', { name: /Rotate Left/i });
  const rotateRightButton = screen.getByRole('button', { name: /Rotate Right/i });

  rotateLeftButton.click();
  await delay(100);

  const robotEmoji = screen.getByText('🤖');

  expect(robotEmoji).toHaveStyle('transform: rotate(-90deg)');

  rotateRightButton.click();
  await delay(100);

  expect(robotEmoji).toHaveStyle('transform: rotate(0deg)');
});

test('robot moves forward', async () => {
  render(<App />);

  const initialRobot = screen.getByText('🤖');
  const initialCell = initialRobot.parentElement;

  const moveForwardButton = screen.getByRole('button', { name: /Move Forward/i });
  moveForwardButton.click();

  await delay(100);

  const newRobot = screen.getByText('🤖');
  const newCell = newRobot.parentElement;

  expect(newCell).toBeInTheDocument();

  expect(initialCell).not.toContainHTML('🤖');
});
