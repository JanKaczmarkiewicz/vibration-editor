import { ContainerState } from "./components/Container";

type Range = {
  start: number;
  end: number;
};

const range = ({ start, end }: Range) => {
  if (start > end) throw new Error(`start: ${start} > end: ${end}`);
  return { start, end };
};

const inRange = (x: number, range: Range) => x > range.start && x < range.end;

const isCollision = (firstRange: Range, secondRange: Range) => {
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
    console.log("Second");

    return true;
  }
  return false;
};

const isItemUnderItem = (layouts: ContainerState): boolean => {
  const ranges = Object.entries(layouts).map(([key, { left, width }]) =>
    range({
      start: left,
      end: left + width
    })
  );

  for (let index = 0; index < ranges.length; index++) {
    for (let i = index + 1; i < ranges.length; i++) {
      if (isCollision(ranges[index], ranges[i])) return true;
    }
  }
  return false;
};

const validateLayout = (layouts: ContainerState): boolean => {
  const _ = isItemUnderItem(layouts);
  console.log(layouts, _);

  return !_;
};

export { inRange, isCollision };
export default validateLayout;
