import { renderHook, act } from '@testing-library/react';
import { useTimeline } from '../useTimeline';
import { TimelineItem } from '../../types/timeline';

jest.mock('../utils/assignLanes', () => ({
  __esModule: true,
  default: jest.fn((items) => items.map((item) => [item])), // ex: 1 item por lane
}));
jest.mock('../utils/dateUtils', () => ({
  getDateRange: jest.fn(() => ({
    start: new Date('2024-01-01'),
    end: new Date('2024-01-31'),
  })),
}));

const items: TimelineItem[] = [
  { start: '2024-01-05', end: '2024-01-10' },
  { start: '2024-01-15', end: '2024-01-16' },
];

describe('useTimeline', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns correct lanes, dateRange, and totalLanes', () => {
    const { result } = renderHook(() => useTimeline(items));

    expect(result.current.lanes).toEqual([[items[0]], [items[1]]]);
    expect(result.current.dateRange).toEqual({
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31'),
    });
    expect(result.current.totalLanes).toBe(2);
  });

  it('selectedItem and hoveredItem are null initially', () => {
    const { result } = renderHook(() => useTimeline(items));
    expect(result.current.selectedItem).toBeNull();
    expect(result.current.hoveredItem).toBeNull();
  });

  it('setSelectedItem updates selectedItem', () => {
    const { result } = renderHook(() => useTimeline(items));
    act(() => {
      result.current.setSelectedItem(items[0]);
    });
    expect(result.current.selectedItem).toBe(items[0]);

    act(() => {
      result.current.setSelectedItem(null);
    });
    expect(result.current.selectedItem).toBeNull();
  });

  it('setHoveredItem updates hoveredItem', () => {
    const { result } = renderHook(() => useTimeline(items));
    act(() => {
      result.current.setHoveredItem(items[1]);
    });
    expect(result.current.hoveredItem).toBe(items[1]);

    act(() => {
      result.current.setHoveredItem(null);
    });
    expect(result.current.hoveredItem).toBeNull();
  });

  it('lanes and dateRange change when items change', () => {
    const newItems = [{ start: '2024-01-20', end: '2024-01-25' }];
    const { result, rerender } = renderHook(({ arr }) => useTimeline(arr), {
      initialProps: { arr: items },
    });

    expect(result.current.lanes.length).toBe(2);

    rerender({ arr: newItems });
    expect(result.current.lanes.length).toBe(1);
  });
});
