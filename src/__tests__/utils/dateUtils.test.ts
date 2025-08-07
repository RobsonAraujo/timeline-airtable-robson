import {
  formatDateRange,
  parseDate,
  getDaysBetween,
} from '../../utils/dateUtils';

describe('dateUtils', () => {
  describe('formatDateRange', () => {
    it('formats date range correctly', () => {
      const result = formatDateRange('2024-01-01', '2024-01-10');
      expect(result).toBe('Jan 01 - Jan 10');
    });

    it('formats dates in same month', () => {
      const result = formatDateRange('2024-01-01', '2024-01-05');
      expect(result).toBe('Jan 01 - Jan 05');
    });

    it('formats dates across months', () => {
      const result = formatDateRange('2024-01-25', '2024-02-05');
      expect(result).toBe('Jan 25 - Feb 05');
    });

    it('formats dates across years', () => {
      const result = formatDateRange('2023-12-25', '2024-01-05');
      expect(result).toBe('Dec 25 - Jan 05');
    });
  });

  describe('parseDate', () => {
    it('parses date string correctly', () => {
      const result = parseDate('2024-01-01');
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January is 0
      expect(result.getDate()).toBe(1);
    });

    it('handles different date formats', () => {
      const result = parseDate('2024-01-01');
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2024);
    });
  });

  describe('getDaysBetween', () => {
    it('calculates days between dates correctly', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-10');
      const result = getDaysBetween(start, end);
      expect(result).toBe(10);
    });

    it('returns 0 for same day', () => {
      const date = new Date('2024-01-01');
      const result = getDaysBetween(date, date);
      expect(result).toBe(1);
    });

    it('handles dates across months', () => {
      const start = new Date('2024-01-25');
      const end = new Date('2024-02-05');
      const result = getDaysBetween(start, end);
      expect(result).toBe(12);
    });

    it('handles dates across years', () => {
      const start = new Date('2023-12-25');
      const end = new Date('2024-01-05');
      const result = getDaysBetween(start, end);
      expect(result).toBe(12);
    });
  });
});
