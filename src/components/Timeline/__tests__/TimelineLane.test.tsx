import React from 'react';
import { render, screen } from '@testing-library/react';
import TimelineLane from '../TimelineLane';
import { TimelineItem } from '../../../types/timeline';

describe('TimelineLane', () => {
  const mockItems: TimelineItem[] = [
    {
      id: 1,
      name: 'Item 1',
      start: '2024-01-01',
      end: '2024-01-10',
    },
    {
      id: 2,
      name: 'Item 2',
      start: '2024-01-15',
      end: '2024-01-20',
    },
  ];

  const mockDateRange = {
    start: new Date('2024-01-01'),
    end: new Date('2024-01-31'),
  };

  it('renders all items in the lane', () => {
    render(<TimelineLane items={mockItems} dateRange={mockDateRange} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders empty lane when no items provided', () => {
    const { container } = render(
      <TimelineLane items={[]} dateRange={mockDateRange} />
    );

    expect(container.firstChild).toHaveClass('relative', 'h-16');
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('positions items correctly based on date range', () => {
    const { container } = render(
      <TimelineLane items={mockItems} dateRange={mockDateRange} />
    );

    const items = container.querySelectorAll('[title]');
    expect(items).toHaveLength(2);

    // First item should be positioned at the start
    const firstItem = items[0] as HTMLElement;
    expect(firstItem.style.left).toBeDefined();

    // Second item should be positioned after the first
    const secondItem = items[1] as HTMLElement;
    expect(secondItem.style.left).toBeDefined();

    // Second item should be positioned further right than first item
    const firstLeft = parseInt(firstItem.style.left);
    const secondLeft = parseInt(secondItem.style.left);
    expect(secondLeft).toBeGreaterThan(firstLeft);
  });

  it('applies correct styling to lane container', () => {
    const { container } = render(
      <TimelineLane items={mockItems} dateRange={mockDateRange} />
    );

    expect(container.firstChild).toHaveClass(
      'relative',
      'h-16',
      'border-b',
      'border-gray-100',
      'last-border-b-0',
      'bg-gray-50-30',
      'px-6'
    );
  });
});
