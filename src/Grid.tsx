import React, { useState } from "react";
import Box from "./Box";

export interface BoxDefinition {
  left: number;
  width: number;
}

const style: React.CSSProperties = {
  height: 50,
  background: "grey"
};

type GridState = { [key: string]: BoxDefinition };

const Grid: React.FC = () => {
  const [boxes, setBoxes] = useState<GridState>({
    a: { left: 20, width: 40 },
    b: { left: 100, width: 45 }
  });

  const handleDragOver = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    console.log(e.clientX, e.clientY);
    const id = e.dataTransfer.getData("text");
    const target = document.querySelector(`#${id}`);
    if (target) {
      console.log(target.getBoundingClientRect());
    }
  };

  return (
    <div style={style} onDrop={handleDrop} onDragOver={handleDragOver}>
      {Object.keys(boxes).map(key => (
        <Box key={key} {...{ ...boxes[key], id: key }} />
      ))}
    </div>
  );
};

export default Grid;
