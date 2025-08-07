import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Timeline from '../Timeline';
import { TimelineItem } from '../../../types/timeline';

describe('Timeline', () => {
  const mockItems: TimelineItem[] = [
    {
      id: 1,
      name: 'Task 1',
      start: '2024-01-01',
      end: '2024-01-10',
    },
    {
      id: 2,
      name: 'Task 2',
      start: '2024-01-15',
      end: '2024-01-20',
    },
    {
      id: 3,
      name: 'Task 3',
      start: '2024-01-05',
      end: '2024-01-15',
    },
  ];

  it('renders empty state when no items provided', () => {
    render(<Timeline items={[]} />);
    expect(
      screen.getByText('No timeline items to display')
    ).toBeInTheDocument();
  });

  it('renders all timeline items', () => {
    render(<Timeline items={mockItems} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('renders zoom controls', () => {
    render(<Timeline items={mockItems} />);

    expect(screen.getByTitle('Zoom Out')).toBeInTheDocument();
    expect(screen.getByTitle('Zoom In')).toBeInTheDocument();
    expect(screen.getByTitle('Reset Zoom')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('handles zoom controls correctly', () => {
    render(<Timeline items={mockItems} />);

    const zoomIn = screen.getByTitle('Zoom In');
    const zoomOut = screen.getByTitle('Zoom Out');
    const reset = screen.getByTitle('Reset Zoom');

    // Initial zoom level
    expect(screen.getByText('100%')).toBeInTheDocument();

    // Zoom in
    fireEvent.click(zoomIn);
    expect(screen.getByText('120%')).toBeInTheDocument();

    // Zoom out
    fireEvent.click(zoomOut);
    expect(screen.getByText('100%')).toBeInTheDocument();

    // Multiple zoom in
    fireEvent.click(zoomIn);
    fireEvent.click(zoomIn);
    expect(screen.getByText('144%')).toBeInTheDocument();

    // Reset zoom
    fireEvent.click(reset);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Timeline items={mockItems} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('organizes items into lanes correctly', () => {
    const { container } = render(<Timeline items={mockItems} />);

    // Should create lanes based on overlapping dates
    const lanes = container.querySelectorAll('.relative.h-16');
    expect(lanes.length).toBeGreaterThan(0);
  });
});
