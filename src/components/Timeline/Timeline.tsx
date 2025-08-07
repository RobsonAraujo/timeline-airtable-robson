import React from 'react';
import { TimelineItem } from '../../types/timeline';
import { useTimeline } from '../../hooks/useTimeline';
import TimelineLane from './TimelineLane';
import TimelineHeader from './TimelineHeader';

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  const { lanes, dateRange, totalLanes } = useTimeline(items);

  if (items.length === 0) {
    return (
      <div
        className={`w-full overflow-x-auto bg-white rounded-lg shadow-md ${className}`}
      >
        <div className="min-w-800 p-5">
          <p className="text-gray-500 text-center">
            No timeline items to display
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-x-auto bg-white rounded-lg shadow-md ${className}`}
    >
      <div className="min-w-800 p-5 relative">
        <TimelineHeader dateRange={dateRange} totalLanes={totalLanes} />
        <div className="relative space-y-2">
          {lanes.map((lane, laneIndex) => (
            <TimelineLane key={laneIndex} items={lane} dateRange={dateRange} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
