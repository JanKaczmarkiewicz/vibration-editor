import React, { CSSProperties } from "react";
import style from "./Tile.module.scss";

import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";
import { BindedUpdateBox, CurrentBox } from "../../types";

type Props = {
  width: number;
  height: number;
  left: number;
  updateBox: BindedUpdateBox;
  current: null | CurrentBox;
  onTouchEnd: () => void;
  onTouchStart: () => void;
};
/**
 * Component that is build on top of library react-rnd.
 * It produces a box that can be resizable and movable.
 * @param Props
 */
const Tile = ({
  left,
  width,
  height,
  updateBox,
  current,
  onTouchEnd,
  onTouchStart
}: Props) => {
  const onResize: RndResizeCallback = (_event, _dir, ref, _delta, position) => {
    const width = Number.parseInt(ref.style.width);
    const height = Number.parseInt(ref.style.height);
    const left = Math.round(position.x);
    updateBox({ width, height, left });
  };
  const onDrag: RndDragCallback = (_event, data) => {
    const left = data.x;
    updateBox({ left });
  };

  const styles: CSSProperties = {};
  if (current) {
    styles.backgroundColor = current.isColliding ? "red" : "green";
    styles.opacity = 0.7;
  }

  return (
    <Rnd
      style={current ? { zIndex: 1000 } : {}}
      size={{ width, height }}
      position={{ x: left, y: 0 }}
      onDrag={onDrag}
      onResize={onResize}
      onDragStart={onTouchStart}
      onResizeStart={onTouchStart}
      onDragStop={onTouchEnd}
      onResizeStop={onTouchEnd}
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
      <div className={style.tile} style={styles}></div>
    </Rnd>
  );
};
export default Tile;
