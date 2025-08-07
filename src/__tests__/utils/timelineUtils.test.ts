import { calculateItemPosition } from '../../utils/timelineUtils';
import { TimelineItem } from '../../types/timeline';

describe('timelineUtils', () => {
  describe('calculateItemPosition', () => {
    const mockItem: TimelineItem = {
      id: 1,
      name: 'Test Item',
      start: '2024-01-01',
      end: '2024-01-10',
    };

    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');
    const containerWidth = 1000;

    it('calculates correct position for item at start of range', () => {
      const result = calculateItemPosition(
        mockItem,
        startDate,
        endDate,
        containerWidth
      );

      expect(result.left).toBe(0);
      expect(result.width).toBeGreaterThan(0);
    });

    it('calculates correct position for item in middle of range', () => {
      const middleItem: TimelineItem = {
        ...mockItem,
        start: '2024-01-15',
        end: '2024-01-20',
      };

      const result = calculateItemPosition(
        middleItem,
        startDate,
        endDate,
        containerWidth
      );

      expect(result.left).toBeGreaterThan(0);
      expect(result.left).toBeLessThan(containerWidth);
      expect(result.width).toBeGreaterThan(0);
    });

    it('calculates correct width based on duration', () => {
      const shortItem: TimelineItem = {
        ...mockItem,
        start: '2024-01-01',
        end: '2024-01-02',
      };

      const longItem: TimelineItem = {
        ...mockItem,
        start: '2024-01-01',
        end: '2024-01-20',
      };

      const shortResult = calculateItemPosition(
        shortItem,
        startDate,
        endDate,
        containerWidth
      );
      const longResult = calculateItemPosition(
        longItem,
        startDate,
        endDate,
        containerWidth
      );

      expect(longResult.width).toBeGreaterThan(shortResult.width);
    });

    it('handles items at end of range', () => {
      const endItem: TimelineItem = {
        ...mockItem,
        start: '2024-01-30',
        end: '2024-01-31',
      };

      const result = calculateItemPosition(
        endItem,
        startDate,
        endDate,
        containerWidth
      );

      expect(result.left + result.width).toBeLessThanOrEqual(containerWidth);
    });
  });
});
