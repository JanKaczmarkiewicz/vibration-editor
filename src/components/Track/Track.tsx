import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import styles from "./Track.module.scss";
//import Tile from "../Tile/Tile";

const Track: React.FC = () => {
  const [tiles, setTiles] = useState(["test1", "test2", "poof"]);

  const layout = [
    { i: "0", x: 0, y: 0, w: 1, h: 4 },
    { i: "1", x: 1, y: 0, w: 1, h: 4 },
    { i: "2", x: 2, y: 0, w: 1, h: 4 }
  ];

  const childs = tiles.map((tile, i) => (
    <div key={i} style={{ backgroundColor: "wheat" }}>
      {tile}{" "}
    </div>
  ));

  return (
    <GridLayout
      {...{
        className: `layout ${styles.track}`,
        items: 10,
        rowHeight: 0,
        compactType: "horizontal",
        onLayoutChange: () => {},
        cols: 10
      }}
      layout={layout}
      width={1200}
    >
      {childs}
    </GridLayout>
  );
};

export default Track;
