import React from 'react';
import { TimelineItem } from '../../types/timeline';
import { formatDateRange } from '../../utils/dateUtils';

interface TimelineItemProps {
  item: TimelineItem;
  style?: React.CSSProperties;
  className?: string;
  itemIndex?: number;
}

const ITEM_COLORS = [
  'bg-blue-500 hover:bg-blue-600',
  'bg-green-500 hover:bg-green-600',
  'bg-purple-500 hover:bg-purple-600',
  'bg-orange-500 hover:bg-orange-600',
  'bg-pink-500 hover:bg-pink-600',
  'bg-indigo-500 hover:bg-indigo-600',
  'bg-teal-500 hover:bg-teal-600',
  'bg-red-500 hover:bg-red-600',
  'bg-yellow-500 hover:bg-yellow-600',
  'bg-emerald-500 hover:bg-emerald-600',
];

const TimelineItemComponent: React.FC<TimelineItemProps> = ({
  item,
  style = {},
  className = '',
  itemIndex = 0,
}) => {
  const dateRange = formatDateRange(item.start, item.end);
  const itemColor = ITEM_COLORS[itemIndex % ITEM_COLORS.length];

  return (
    <div
      className={`absolute top-2 h-12 ${itemColor} rounded-md px-3 py-2 text-white text-sm font-medium cursor-pointer transition-all duration-300 hover-translate-y-neg-0-5 hover-shadow-xl hover-z-10 flex items-center overflow-hidden min-w-120 ${className}`}
      style={style}
      title={`${item.name} (${dateRange})`}
    >
      <div className="flex-col w-full overflow-hidden">
        <div className="font-semibold text-sm leading-tight mb-0-5 text-ellipsis whitespace-nowrap">
          {item.name}
        </div>
        <div className="text-xs opacity-90 leading-none">{dateRange}</div>
      </div>
    </div>
  );
};

export default TimelineItemComponent;
