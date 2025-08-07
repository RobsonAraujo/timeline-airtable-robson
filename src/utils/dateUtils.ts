import { parseISO, format, differenceInDays, addDays, subDays } from 'date-fns';

export const parseDate = (dateString: string): Date => {
  return parseISO(dateString);
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd');
};

export const formatDateRange = (start: string, end: string): string => {
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  if (startDate.getTime() === endDate.getTime()) {
    return formatDate(startDate);
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const getDateRange = (items: Array<{ start: string; end: string }>) => {
  if (items.length === 0) return { start: new Date(), end: new Date() };

  const dates = items.flatMap((item) => [
    parseDate(item.start),
    parseDate(item.end),
  ]);

  const start = new Date(Math.min(...dates.map((d) => d.getTime())));
  const end = new Date(Math.max(...dates.map((d) => d.getTime())));

  return { start, end };
};

export const getDaysBetween = (start: Date, end: Date): number => {
  return differenceInDays(end, start) + 1;
};

export const addDaysToDate = (date: Date, days: number): Date => {
  return addDays(date, days);
};

export const subDaysFromDate = (date: Date, days: number): Date => {
  return subDays(date, days);
};
