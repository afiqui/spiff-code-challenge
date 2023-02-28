import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProgressBarExercise from './ProgressBarExercise';

describe('ProgressBarExercise', () => {
  it('renders the progress bar, start button and finish button', () => {
    render(<ProgressBarExercise />);
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('start-button')).toBeInTheDocument();
    expect(screen.getByTestId('finish-button')).toBeInTheDocument();
  });

  it('clicking start button initializes progress bar', () => {
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('start-button'));

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.style.opacity).toBe('1');
    expect(progressBar.style.width).toBe('0%');
  });

  it('clicking start button again while progress bar is not complete does not update progress', () => {
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('start-button'));

    fireEvent.click(screen.getByTestId('start-button'));
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.style.width).toBe('0%');
  });

  it('clicking start button while progress bar is complete initializes progress bar', () => {
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('start-button'));

    fireEvent.click(screen.getByTestId('finish-button'));
    jest.advanceTimersByTime(4000);

    fireEvent.click(screen.getByTestId('start-button'));
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.style.opacity).toBe('1');
    expect(progressBar.style.width).toBe('0%');
  });

  it('progress bar transitions from 0% to 90% on start request', () => {
    jest.useFakeTimers();
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('start-button'));
    jest.runAllTimers();

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.style.width).toBe('90%');
  });

  it('clicking finish button updates progress bar and fades it out', () => {
    jest.useFakeTimers();
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('start-button'));
    fireEvent.click(screen.getByTestId('finish-button'));

    jest.advanceTimersByTime(1000);
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.style.width).toBe('100%');

    jest.advanceTimersByTime(3000);
    expect(progressBar.style.opacity).toBe('0');
  });

  it('clicking finish button while progress bar is not complete does not fade it out', () => {
    jest.useFakeTimers();
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('start-button'));
    fireEvent.click(screen.getByTestId('finish-button'));
    fireEvent.click(screen.getByTestId('finish-button'));

    jest.advanceTimersByTime(1000);
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.style.width).toBe('100%');

    jest.advanceTimersByTime(3000);
    expect(progressBar.style.opacity).toBe('1');
  });

  it('loading text shows up while progress bar is not complete', () => {
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('start-button'));

    expect(screen.getByTestId('start-button')).toHaveTextContent('Loading...');
    fireEvent.click(screen.getByTestId('finish-button'));
    expect(screen.getByTestId('start-button')).toHaveTextContent('Loading...');
    jest.advanceTimersByTime(4000);
    expect(screen.getByTestId('start-button')).toHaveTextContent('Start Request');
  });
});
