import React from "react";
import style from "./Tile.module.scss";

import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";
import { BindedUpdateBox } from "../../types";

type Props = {
  width: number;
  height: number;
  left: number;
  updateBox: BindedUpdateBox;
};

const Tile = ({ left, width, height, updateBox }: Props) => {
  const onResize: RndResizeCallback = (_event, _dir, ref, _delta, position) => {
    const width = parseInt(ref.style.width);
    const height = parseInt(ref.style.height);
    const left = Math.round(position.x);
    updateBox({ width, height, left });
  };
  const onDrag: RndDragCallback = (_event, data) => {
    const left = data.x;
    updateBox({ left });
  };

  return (
    <Rnd
      size={{ width, height }}
      position={{ x: left, y: 0 }}
      onDrag={onDrag}
      onResize={onResize}
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
