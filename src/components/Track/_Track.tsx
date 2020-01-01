import React, { useState, useEffect } from "react";
import styles from "./Track.module.scss";
import GridLayout from "react-grid-layout";
import Tile from "../Tile/Tile";

type DndItem = GridLayout.Layout;
type Range = {
  start: number;
  end: number;
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
    return true;
  }

  return false;
};

const isItemUnderItem = (layouts: DndItem[]): boolean => {
  const sizes = layouts.map(({ w, x }) => ({ start: x, end: w + x } as Range));

  for (let index = 0; index < layouts.length; index++) {
    for (let i = index + 1; i < layouts.length; i++) {
      if (isCollision(sizes[index], sizes[i])) return true;
    }
  }
  return false;
};

const validateLayout = (_layouts: DndItem[]): boolean => {
  const layouts = [..._layouts];
  const isNotOnTop = layouts.some(({ y }) => y !== 0);
  const _ = isItemUnderItem(layouts);
  //console.log(isNotOnTop, _);

  return isNotOnTop && _;
};

const fixLayout = (layouts: DndItem[]): DndItem[] => {
  return [];
};
let oldLayout: DndItem[] | null = null;
const Track: React.FC = () => {
  const [layout, setLayout] = useState([
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 1, y: 0, w: 1, h: 1 },
    { i: "2", x: 2, y: 0, w: 1, h: 1 }
  ] as DndItem[]);

  useEffect(() => {
    // console.log(layout);

    console.log("validating", layout);
    if (validateLayout(layout)) {
      console.log(true);

      // setLayout(layout.map(tile => ({ ...tile, y: 0 })));
    } else {
      console.log("-----------------------------------");
    }
  }, [layout]);

  const childs = layout.map(tile => (
    <div key={tile.i} data-grid={tile.i} style={{ backgroundColor: "wheat" }}>
      {tile.i}
    </div>
  ));

  const gridProps = {
    className: `layout ${styles.track}`,
    items: 10,
    rowHeight: 10,
    compactType: null,
    layout: layout,
    onDragStop: setLayout, //I am thinking of implement layout validation in onLayoutChange handler
    cols: 20,
    preventCollision: true,
    maxRows: 2,
    width: 1200,
    axis: "x"
  };

  // console.log(oldLayout, layout);
  // // oldLayout = JSON.parse(JSON.stringify(layout));
  return (
    <>
      <GridLayout {...gridProps}>{childs}</GridLayout>

      <button
        onClick={() => {
          if (validateLayout(layout)) {
            setLayout(layout.map(tile => ({ ...tile, y: 0 })));
          }
        }}
      >
        Xd
      </button>
      {/* <button
        onClick={() => {
          setLayout([
            { i: "0", x: 0, y: 0, w: 1, h: 1 },
            { i: "1", x: 1, y: 0, w: 1, h: 1 },
            { i: "2", x: 2, y: 0, w: 1, h: 1 }
          ]);
        }}
      >
        Xd2
      </button> */}
    </>
  );
};

export default Track;
