import React from "react";
import style from "./Tile.module.scss";

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
  const onResizeStop: RndResizeCallback = (
    _event,
    _dir,
    ref,
    _delta,
    _position
  ) => {
    onResize(id, parseInt(ref.style.width), parseInt(ref.style.height));
  };
  const onDragStop: RndDragCallback = (_event, data) => {
    onRelocate(id, data.x);
  };

  return (
    <Rnd
      size={{ width, height }}
      position={{ x: left, y: 0 }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      dragAxis="x"
      bounds="parent"
      enableResizing={{
        top: false,
        right: true,
        bottom: true,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
    >
      <div className={style.tile}></div>
    </Rnd>
  );
};
export default Tile;
