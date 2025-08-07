import assignLanes from '../assignLanes';
import { TimelineItem } from '../types/timeline';

describe('assignLanes', () => {
  it('should assign items to lanes correctly', () => {
    const items: TimelineItem[] = [
      {
        id: 1,
        start: '2021-01-01',
        end: '2021-01-05',
        name: 'Item 1',
      },
      {
        id: 2,
        start: '2021-01-03',
        end: '2021-01-07',
        name: 'Item 2',
      },
      {
        id: 3,
        start: '2021-01-08',
        end: '2021-01-10',
        name: 'Item 3',
      },
    ];

    const lanes = assignLanes(items);

    expect(lanes).toHaveLength(2);
    expect(lanes[0].items).toHaveLength(2);
    expect(lanes[1].items).toHaveLength(1);
  });

  it('should handle empty array', () => {
    const lanes = assignLanes([]);
    expect(lanes).toHaveLength(0);
  });
});
