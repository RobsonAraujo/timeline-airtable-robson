import React from 'react';
import { TimelineItem } from '../../types/timeline';
import TimelineItemComponent from './TimelineItem';
import { calculateItemPosition } from '../../utils/timelineUtils';

interface TimelineLaneProps {
  items: TimelineItem[];
  dateRange: { start: Date; end: Date };
}

const LANE_PADDING = 24;
const CONTAINER_WIDTH = 800;

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

        const minWidth = Math.max(60, item.name.length * 8); // 8px por caractere
        width = Math.max(width, minWidth);

        if (left + width > CONTAINER_WIDTH - LANE_PADDING) {
          width = CONTAINER_WIDTH - LANE_PADDING - left;
        }

        return (
          <TimelineItemComponent
            key={item.id}
            item={item}
            itemIndex={itemIndex}
            style={{
              left: `${left}px`,
              width: `${width}px`,
              minWidth: minWidth,
              maxWidth: CONTAINER_WIDTH - 2 * LANE_PADDING,
            }}
          />
        );
      })}
    </div>
  );
};

export default TimelineLane;
