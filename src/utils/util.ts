import { GridState } from "../Grid";

type Range = {
  start: number;
  end: number;
};

const range = ({ start, end }: Range) => {
  if (start > end) throw new Error(`start: ${start} > end: ${end}`);
  return { start, end };
};

const inRange = (x: number, range: Range) => x > range.start && x < range.end;

const isColliding = (firstRange: Range, secondRange: Range) => {
  if (
    inRange(firstRange.start, secondRange) ||
    inRange(firstRange.end, secondRange)
  ) {
    return true;
  }

  if (
    (firstRange.start > secondRange.start &&
      firstRange.end < secondRange.end) ||
    (firstRange.start < secondRange.start && firstRange.end > secondRange.end)
  ) {
    return true;
  }
  return false;
};

const isCollisionIn = (layouts: GridState): boolean => {
  const ranges = Object.entries(layouts).map(([key, { left, width }]) =>
    range({
      start: left,
      end: left + width
    })
  );

  for (let index = 0; index < ranges.length; index++) {
    for (let i = index + 1; i < ranges.length; i++) {
      if (isColliding(ranges[index], ranges[i])) return true;
    }
  }
  return false;
};

export const validateLayout = (layouts: GridState): boolean => {
  const areCollisions = isCollisionIn(layouts);
  return !areCollisions;
};
