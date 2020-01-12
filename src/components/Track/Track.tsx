import React, { useState } from "react";
import Tile from "../Tile/Tile";
import { BoxDefinition, RelocateHandler, ResizeHandler } from "../../types";
import { validateLayout } from "../../utils/utils";

const Track = () => {
  const initialState = [
    { id: "1", left: 0, width: 20, height: 20 },
    { id: "2", left: 30, width: 20, height: 20 },
    { id: "3", left: 55, width: 20, height: 20 },
    { id: "4", left: 100, width: 20, height: 20 }
  ];

  const [boxes, setBoxes] = useState<BoxDefinition[]>(initialState);
  // TODO: implement use validator Hook

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

  const handleResize: ResizeHandler = (id, width, height) => {
    updateBox(id, { width, height });
  };

  const handleRelocation: RelocateHandler = (id, left) => {
    updateBox(id, { left });
  };

  return (
    <div>
      {boxes.map(box => (
        <Tile
          key={box.id}
          tile={box}
          onResize={handleResize}
          onRelocate={handleRelocation}
        />
      ))}
    </div>
  );
};

export default Track;
