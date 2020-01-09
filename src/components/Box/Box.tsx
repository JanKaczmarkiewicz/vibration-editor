import React from "react";
import { BoxDefinition } from "../Grid/Grid";

const style: React.CSSProperties = {
  position: "absolute",
  height: 20,
  background: "brown"
};

const Box: React.FC<BoxDefinition & { id: string }> = ({ width, left, id }) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.clientX, e.clientY);

    e.dataTransfer.setData("text/plain", id + "," + e.clientX);
  };
  return (
    <div
      id={id}
      style={{ ...style, width, left }}
      onDragStart={onDragStart}
      draggable
    ></div>
  );
};

export default Box;
