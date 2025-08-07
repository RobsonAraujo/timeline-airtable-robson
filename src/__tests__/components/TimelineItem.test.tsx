import React from 'react';
import { render, screen } from '@testing-library/react';
import TimelineItem from '../../components/Timeline/TimelineItem';
import { TimelineItem as TimelineItemType } from '../../types/timeline';

describe('TimelineItem', () => {
  const mockItem: TimelineItemType = {
    id: 1,
    name: 'Test Item',
    start: '2024-01-01',
    end: '2024-01-10',
  };

  const defaultProps = {
    item: mockItem,
    style: { left: '100px', width: '200px' },
    itemIndex: 0,
  };

  it('renders item name and date range', () => {
    render(<TimelineItem {...defaultProps} />);
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Jan 01 - Jan 10')).toBeInTheDocument();
  });

  it('applies correct color based on itemIndex', () => {
    const { container } = render(<TimelineItem {...defaultProps} itemIndex={2} />);
    const itemElement = container.firstChild as HTMLElement;
    
    expect(itemElement).toHaveClass('bg-purple-500');
  });

  it('applies custom styles', () => {
    const { container } = render(<TimelineItem {...defaultProps} />);
    const itemElement = container.firstChild as HTMLElement;
    
    expect(itemElement).toHaveStyle({
      left: '100px',
      width: '200px',
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <TimelineItem {...defaultProps} className="custom-class" />
    );
    const itemElement = container.firstChild as HTMLElement;
    
    expect(itemElement).toHaveClass('custom-class');
  });

  it('shows tooltip with item details', () => {
    render(<TimelineItem {...defaultProps} />);
    const itemElement = screen.getByTitle('Test Item (Jan 01 - Jan 10)');
    
    expect(itemElement).toBeInTheDocument();
  });
});
