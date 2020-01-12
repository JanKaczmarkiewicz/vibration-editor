import React from "react";
import styles from "./Tile.module.scss";

import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";
import { BoxDefinition, ResizeHandler, RelocateHandler } from "../../types";

type Props = {
  tile: BoxDefinition;
  onResize: ResizeHandler;
  onRelocate: RelocateHandler;
};

const Tile = ({
  tile: { id, left, width, height },
  onRelocate,
  onResize
}: Props) => {
  const onResizeStop: RndResizeCallback = (e, dir, ref, delta, position) => {
    onResize(id, parseInt(ref.style.width), parseInt(ref.style.height));
  };
  const onDragStop: RndDragCallback = (event, data) => {
    onRelocate(id, data.x);
  };

  return (
    <Rnd
      size={{ width, height }}
      position={{ x: left, y: 0 }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      dragAxis="x"
    >
      <div className={styles.tile}>001</div>
    </Rnd>
  );
};
export default Tile;
