import React from 'react';
import { format, eachDayOfInterval } from 'date-fns';

interface TimelineHeaderProps {
  dateRange: { start: Date; end: Date };
  totalLanes: number;
}

const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  dateRange,
  totalLanes,
}) => {
  const days = eachDayOfInterval({
    start: dateRange.start,
    end: dateRange.end,
  });

  const step = Math.max(1, Math.floor(days.length / 10));
  const displayDays = days.filter((_, index) => index % step === 0);

  return (
    <div className="mb-6">
      <div className="flex-items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
        <div className="text-xl font-semibold text-gray-800">
          Timeline ({totalLanes} lanes)
        </div>
      </div>
      <div className="flex relative border-b border-gray-300 pb-2">
        {displayDays.map((day, index) => (
          <div
            key={index}
            className="flex-1 text-center text-sm text-gray-500 relative"
          >
            {format(day, 'MMM dd')}
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1-2 w-px h-2 bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineHeader;
