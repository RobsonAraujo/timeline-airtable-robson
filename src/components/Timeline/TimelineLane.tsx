import React from 'react';
import { TimelineItem } from '../../types/timeline';
import TimelineItemComponent from './TimelineItem';
import { calculateItemPosition } from '../../utils/timelineUtils';

interface TimelineLaneProps {
  items: TimelineItem[];
  dateRange: { start: Date; end: Date };
}

const LANE_PADDING = 24;
const CONTAINER_WIDTH = 1200;

const TimelineLane: React.FC<TimelineLaneProps> = ({ items, dateRange }) => {
  return (
    <div className="relative h-16 border-b border-gray-100 last-border-b-0 bg-gray-50-30 px-6">
      {items.map((item, itemIndex) => {
        let { left, width } = calculateItemPosition(
          item,
          dateRange.start,
          dateRange.end,
          CONTAINER_WIDTH - 2 * LANE_PADDING
        );
        left += LANE_PADDING;

        const minWidth = Math.max(120, item.name.length * 10);
        width = Math.max(width, minWidth);

        const maxWidth = Math.max(width, minWidth);

        return (
          <TimelineItemComponent
            key={item.id}
            item={item}
            itemIndex={itemIndex}
            style={{
              left: `${left}px`,
              width: `${maxWidth}px`,
              minWidth: minWidth,
            }}
          />
        );
      })}
    </div>
  );
};

export default TimelineLane;
