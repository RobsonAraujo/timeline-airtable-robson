import { calculateItemPosition } from '../timelineUtils';

describe('calculateItemPosition', () => {
  const containerWidth = 1000;

  it('calculates correct left and width for exact fit', () => {
    const item = { start: '2024-01-01', end: '2024-01-10' };
    const timelineStart = new Date('2024-01-01');
    const timelineEnd = new Date('2024-01-10');

    const { left, width } = calculateItemPosition(
      item,
      timelineStart,
      timelineEnd,
      containerWidth
    );

    expect(left).toBeCloseTo(0);
    expect(width).toBeCloseTo(1000); // ocupa tudo
  });

  it('calculates position of item starting after timelineStart', () => {
    const item = { start: '2024-01-03', end: '2024-01-05' };
    const timelineStart = new Date('2024-01-01');
    const timelineEnd = new Date('2024-01-10');

    const { left, width } = calculateItemPosition(
      item,
      timelineStart,
      timelineEnd,
      containerWidth
    );

    expect(left).toBeCloseTo(200); // (2/10)*1000
    expect(width).toBeCloseTo(300); // (3/10)*1000
  });

  it('calculates position for single-day item at start', () => {
    const item = { start: '2024-01-01', end: '2024-01-01' };
    const timelineStart = new Date('2024-01-01');
    const timelineEnd = new Date('2024-01-10');

    const { left, width } = calculateItemPosition(
      item,
      timelineStart,
      timelineEnd,
      containerWidth
    );

    expect(left).toBeCloseTo(0);
    expect(width).toBeCloseTo(100); // (1/10)*1000
  });

  it('calculates position for item at the end', () => {
    const item = { start: '2024-01-09', end: '2024-01-10' };
    const timelineStart = new Date('2024-01-01');
    const timelineEnd = new Date('2024-01-10');

    const { left, width } = calculateItemPosition(
      item,
      timelineStart,
      timelineEnd,
      containerWidth
    );

    expect(left).toBeCloseTo(800);
    expect(width).toBeCloseTo(200);
  });

  it('handles containerWidth other than 1000', () => {
    const item = { start: '2024-01-02', end: '2024-01-04' };
    const timelineStart = new Date('2024-01-01');
    const timelineEnd = new Date('2024-01-05');
    const containerWidth = 500;

    const { left, width } = calculateItemPosition(
      item,
      timelineStart,
      timelineEnd,
      containerWidth
    );

    expect(left).toBeCloseTo(100);
    expect(width).toBeCloseTo(300);
  });
});
