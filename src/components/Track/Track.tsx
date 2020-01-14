import React, { useState } from "react";
import { BoxDefinition, RelocateHandler, ResizeHandler } from "../../types";

import style from "./Track.module.scss";

import Tile from "../Tile/Tile";
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

    if (validateLayout(newLayout)) {
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
    <div className={style.track}>
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
