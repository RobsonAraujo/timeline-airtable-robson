import { parseDate, getDaysBetween } from './dateUtils';
import { TimelineItem } from '../types/timeline';

export const calculateItemPosition = (
  item: TimelineItem,
  timelineStart: Date,
  timelineEnd: Date,
  containerWidth: number
) => {
  const itemStart = parseDate(item.start);
  const itemEnd = parseDate(item.end);

  const totalDays = getDaysBetween(timelineStart, timelineEnd);
  const itemStartOffset = getDaysBetween(timelineStart, itemStart) - 1;
  const itemDuration = getDaysBetween(itemStart, itemEnd);

  const left = (itemStartOffset / totalDays) * containerWidth;
  const width = (itemDuration / totalDays) * containerWidth;

  return { left, width };
};
