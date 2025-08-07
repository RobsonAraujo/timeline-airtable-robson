import { useState, useMemo } from 'react';
import { TimelineItem } from '../types/timeline';
import assignLanes from '../utils/assignLanes.js';
import { getDateRange } from '../utils/dateUtils';

export const useTimeline = (items: TimelineItem[]) => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<TimelineItem | null>(null);

  const lanes = useMemo(() => {
    return assignLanes(items);
  }, [items]);

  const dateRange = useMemo(() => {
    return getDateRange(items);
  }, [items]);

  const totalLanes = lanes.length;

  return {
    lanes,
    dateRange,
    totalLanes,
    selectedItem,
    setSelectedItem,
    hoveredItem,
    setHoveredItem,
  };
};
