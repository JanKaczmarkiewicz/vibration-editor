import React, { useState } from "react";
import { BoxDefinition, BindedUpdateBox, CurrentBox } from "../../types";

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
  const [current, setCurrent] = useState<CurrentBox>({
    id: null,
    isColliding: false
  });
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
      setCurrent({ ...current, isColliding: false });
      setBoxes(newLayout);
      return;
    }
    setCurrent({ ...current, isColliding: true });
  };

  const handleBoxTouchStart = (id: string) => {
    setCurrent({ ...current, id });
  };

  const handleBoxTouchEnd = () => {
    setCurrent({ ...current, id: null, isColliding: false });
  };

  return (
    <div className={style.track}>
      {boxes.map(({ id, ...restProps }) => (
        <Tile
          {...restProps}
          key={id}
          updateBox={updateBox.bind(null, id) as BindedUpdateBox}
          onTouchStart={handleBoxTouchStart.bind(null, id)}
          onTouchEnd={handleBoxTouchEnd}
          current={id === current.id ? current : null}
        />
      ))}
    </div>
  );
};

export default Track;
