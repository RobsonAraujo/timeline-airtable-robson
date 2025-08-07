import React, { useState } from 'react';
import { TimelineItem } from '../../types/timeline';
import { useTimeline } from '../../hooks/useTimeline';
import TimelineLane from './TimelineLane';
import TimelineHeader from './TimelineHeader';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  const { lanes, dateRange, totalLanes } = useTimeline(items);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev / 1.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

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
      <div className="min-w-1200 p-5 relative">
        <div className="flex  mb-4 space-x-2">
          <button
            onClick={handleZoomOut}
            className="cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="flex items-center px-3 py-1 bg-gray-100 rounded text-sm font-medium">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 cursor-pointer rounded hover:bg-gray-100 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 cursor-pointer rounded hover:bg-gray-100 transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw size={20} />
          </button>
        </div>
        <TimelineHeader dateRange={dateRange} totalLanes={totalLanes} />
        <div
          className="relative space-y-2"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
          }}
        >
          {lanes.map((lane, laneIndex) => (
            <TimelineLane key={laneIndex} items={lane} dateRange={dateRange} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
