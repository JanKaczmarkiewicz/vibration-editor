import React, { useRef, useState, useEffect } from "react";
import { BoxDefinition, onResize } from "../Grid/Grid";

const style: React.CSSProperties = {
  position: "absolute",
  height: 20,
  background: "brown",
  resize: "both",
  overflow: "auto"
};

type props = BoxDefinition & {
  id: string;
  onResize: onResize;
};

const Box: React.FC<props> = ({ width, height, left, id, onResize }) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id + "," + e.clientX);
  };

  const resizeObserver = useRef(new ResizeObserver(([{ contentRect }]) => {}));

  const initialSetup = (node: HTMLDivElement) => {
    if (node) {
      resizeObserver.current.observe(node);
    }
  };

  return (
    <div
      ref={initialSetup}
      id={id}
      style={{ ...style, width, left, height }}
      onDragStart={onDragStart}
      draggable
    ></div>
  );
};

export default Box;
