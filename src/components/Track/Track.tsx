import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import styles from "./Track.module.scss";
import Tile from "../Tile/Tile";

//import Tile from "../Tile/Tile";

const Track: React.FC = () => {
  const [tiles, setTiles] = useState(["test1", "test2", "poof"]);
  const [layout, setLayout] = useState([
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 1, y: 0, w: 1, h: 1 },
    { i: "2", x: 2, y: 0, w: 1, h: 1 }
  ] as GridLayout.Layout[]);
  //let newLayout = JSON.parse(JSON.stringify(layout)) as GridLayout.Layout[];

  const childs = layout.map(tile => (
    <div key={tile.i} data-grid={tile.i} style={{ backgroundColor: "wheat" }}>
      {tile.i}
    </div>
  ));

  const gridProps = {
    className: `layout ${styles.track}`,
    items: 10,
    rowHeight: 100,
    compactType: null,
    layout: layout,
    onDragStop: (layout: GridLayout.Layout[]) => {
      let newLayout = JSON.parse(JSON.stringify(layout)) as GridLayout.Layout[];
      setLayout(
        layout => layout.map(tile => ({ ...tile, y: 0 }))
        // { i: `${layout.length}`, x: layout.length, y: 0, w: 1, h: 1 }
      );
    },
    cols: 20,
    preventCollision: true,
    // isRearrangeable: false,
    maxRows: 5,
    width: 1200,
    draggableCancel: "input, textarea"
  };

  return <GridLayout {...gridProps}>{childs}</GridLayout>;
};

export default Track;
