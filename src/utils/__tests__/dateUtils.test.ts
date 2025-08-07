import {
  parseDate,
  formatDate,
  formatDateRange,
  getDateRange,
  getDaysBetween,
  addDaysToDate,
  subDaysFromDate,
} from '../dateUtils';

describe('date util functions', () => {
  describe('parseDate', () => {
    it('parses ISO string to Date', () => {
      const dateStr = '2024-06-12';
      const date = parseDate(dateStr);
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(5); // mês 6 = index 5
      expect(date.getDate()).toBe(12);
    });
  });

  describe('formatDate', () => {
    it('formats a Date obj as "MMM dd"', () => {
      const date = new Date(2024, 5, 10);
      expect(formatDate(date)).toBe('Jun 10');
    });
  });

  describe('formatDateRange', () => {
    it('returns single date if range is for same day', () => {
      const dateStr = '2024-06-15';
      expect(formatDateRange(dateStr, dateStr)).toBe('Jun 15');
    });

    it('returns a formatted range if dates differ', () => {
      expect(formatDateRange('2024-06-10', '2024-06-14')).toBe(
        'Jun 10 - Jun 14'
      );
    });
  });

  describe('getDateRange', () => {
    it('returns now if array is empty', () => {
      const result = getDateRange([]);
      expect(result.start).toBeInstanceOf(Date);
      expect(result.end).toBeInstanceOf(Date);
    });
  });

  describe('getDaysBetween', () => {
    it('counts all days in the range including both ends', () => {
      const start = new Date('2024-06-10');
      const end = new Date('2024-06-13');

      expect(getDaysBetween(start, end)).toBe(4);
    });

    it('returns 1 if start and end are same day', () => {
      const date = new Date('2024-06-10');
      expect(getDaysBetween(date, date)).toBe(1);
    });
  });

  describe('addDaysToDate', () => {
    it('adds N days to the date', () => {
      const date = new Date(2024, 5, 10); // June 10, 2024
      const result = addDaysToDate(date, 5);
      expect(formatDate(result)).toBe('Jun 15');
    });
  });

  describe('subDaysFromDate', () => {
    it('subtracts N days from the date', () => {
      const date = new Date(2024, 5, 10); // June 10, 2024
      const result = subDaysFromDate(date, 3);
      expect(formatDate(result)).toBe('Jun 07');
    });
  });
});
