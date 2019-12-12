import React from "react";
import styles from "./Tile.module.scss";

import { Rnd, DraggableData, Position } from "react-rnd";
import { TileDefinition, Id } from "../Track/Track";

type Props = {
  tile: TileDefinition;
  onResize(tileUpdate: TileDefinition): void;
  onRelocate(tileUpdate: Id & Position): void;
};

const Tile = ({
  tile: { id, x, y, width, height },
  onRelocate,
  onResize
}: Props) => {
  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={(e, d: DraggableData) => {
        console.log({ id, x: d.x, y: d.y });

        onRelocate({ id, x: d.x, y: 0 });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onResize({
          id,
          width: parseInt(ref.style.width || "0"),
          height: parseInt(ref.style.height || "0"),
          ...position
        });
      }}
    >
      <div className={styles.tile}>001</div>
    </Rnd>
  );
};

export default Tile;
