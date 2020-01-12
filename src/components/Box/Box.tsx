import React from "react";
import { BoxDefinition, onResize } from "../Grid/Grid";
import { Resizable } from "re-resizable";

const style: React.CSSProperties = {
  background: "brown"
};

type props = BoxDefinition & {
  id: string;
  onResize: onResize;
};

const Box: React.FC<props> = ({ width, height, left, id, onResize }) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id + "," + e.clientX);
  };

  const handleResize = (height: number, width: number) => {
    onResize(id, width, height);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      style={{ position: "absolute", left }}
    >
      <Resizable style={{ ...style, width, height }}>001</Resizable>
    </div>
  );
};

export default Box;
