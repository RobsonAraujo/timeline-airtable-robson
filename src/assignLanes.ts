import { TimelineItem, TimelineLane } from './types/timeline';

/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
function assignLanes(items: TimelineItem[]): TimelineLane[] {
  const sortedItems = items.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  const lanes: TimelineLane[] = [];

  function assignItemToLane(item: TimelineItem): void {
    for (const lane of lanes) {
      const lastItem = lane.items[lane.items.length - 1];
      if (new Date(lastItem.end).getTime() < new Date(item.start).getTime()) {
        lane.items.push(item);
        return;
      }
    }
    lanes.push({ items: [item] });
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }
  return lanes;
}

export default assignLanes;
