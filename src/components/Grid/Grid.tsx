import React, { useState, useEffect } from "react";
import Box from "../Box/Box";
import { validateLayout } from "../../utils/util";

export interface BoxDefinition {
  id: string;
  left: number;
  width: number;
  height: number;
}

export interface onResize {
  (id: string, width: number, height: number): void;
}

const style: React.CSSProperties = {
  height: 50,
  background: "grey",
  display: "flex"
};

const Grid: React.FC = () => {
  const [boxes, setBoxes] = useState<BoxDefinition[]>([
    { id: "a", left: 20, width: 40, height: 31 },
    { id: "b", left: 100, width: 45, height: 30 },
    { id: "c", left: 200, width: 20, height: 30 }
  ]);

  const handleDragOver = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const updateBox = (
    id: string,
    update: { width?: number; height?: number; left?: number }
  ) => {
    const newLayout = [...boxes].map(box =>
      id === box.id ? { ...box, ...update } : box
    );

    const isValid = validateLayout(newLayout);

    if (isValid) {
      setBoxes(newLayout);
    }
  };

  const handleChildResize: onResize = (id, height, width) => {
    updateBox(id, { height, width });
  };

  const handleDrop = (e: React.DragEvent) => {
    const [id, fromRaw] = e.dataTransfer.getData("text").split(",");
    const to = e.clientX;
    const from = parseInt(fromRaw);
    const shift = to - from;

    const position = ([...boxes].find(box => box.id === id)?.left || 0) + shift;
    updateBox(id, { left: position });
  };

  return (
    <div style={style} onDrop={handleDrop} onDragOver={handleDragOver}>
      {boxes.map(({ id, ...props }) => (
        <Box key={id} {...{ ...props, id, onResize: handleChildResize }} />
      ))}
    </div>
  );
};

export default Grid;
