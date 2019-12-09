import React from "react";
import styles from "./Tile.module.scss";
import GridLayout from "react-grid-layout";

type TileProps = {
  data: GridLayout.Layout;
};

const Tile = ({ data }: TileProps) => {
  console.log(data);

  return (
    <div key={data.i} data-grid={data.i} style={{ backgroundColor: "wheat" }}>
      {data.i}
    </div>
  );
};

export default Tile;
