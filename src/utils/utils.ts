import { BoxDefinition } from "../types";

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
    (firstRange.start >= secondRange.start &&
      firstRange.end <= secondRange.end) ||
    (firstRange.start <= secondRange.start && firstRange.end >= secondRange.end)
  ) {
    return true;
  }
  return false;
};

const isCollisionIn = (layouts: BoxDefinition[]): boolean => {
  const ranges = layouts.map(({ left, width }) =>
    range({
      start: left,
      end: left + width
    })
  );

  for (let currentIndex = 0; currentIndex < ranges.length; currentIndex++) {
    for (
      let restIndex = currentIndex + 1;
      restIndex < ranges.length;
      restIndex++
    ) {
      if (isColliding(ranges[currentIndex], ranges[restIndex])) return true;
    }
  }
  return false;
};

export const validateLayout = (layouts: BoxDefinition[]): boolean => {
  const areCollisions = isCollisionIn(layouts);
  return !areCollisions;
};
