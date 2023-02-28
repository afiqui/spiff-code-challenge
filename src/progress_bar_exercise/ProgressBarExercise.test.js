import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Solution from './ProgressBarExercise';

describe('Solution', () => {
  it('should start progress on button click', () => {
    render(<Solution />);
    const startButton = screen.getByText('Start Request');
    fireEvent.click(startButton);
    expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 90%');
  });

  it('should finish progress on button click', () => {
    render(<Solution />);
    const startButton = screen.getByText('Start Request');
    fireEvent.click(startButton);
    const finishButton = screen.getByText('Finish Request');
    fireEvent.click(finishButton);
    expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 100%');
  });

  it('should not start progress when progress is already started', () => {
    render(<Solution />);
    const startButton = screen.getByText('Start Request');
    fireEvent.click(startButton);
    fireEvent.click(startButton);
    expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 90%');
  });

  it('should not finish progress when progress is not started', () => {
    render(<Solution />);
    const startButton = screen.getByText('Start Request');
    fireEvent.click(startButton);
    const finishButton = screen.getByText('Finish Request');
    fireEvent.click(finishButton);
    expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 100%');
    expect(screen.getByTestId('progress-bar')).toHaveStyle('opacity: 0');
  });
});
