import React, { useState } from "react";
import { useDrop, XYCoord } from "react-dnd";
import ItemTypes from "./itemTypes";
import Box from "./Box";
import update from "immutability-helper";
import { DragItem } from "../interfaces";
import validateLayout from "../util";

const styles: React.CSSProperties = {
  width: 500,
  height: 50,
  border: "1px solid black",
  position: "relative",
  backgroundSize: ".9px .9px",
  backgroundImage:
    "linear-gradient(to right, grey .1px, transparent 1px), linear-gradient(grey .1px, transparent 1px)"
};

export type Box = { left: number; title: string; width: number };

export interface ContainerState {
  [key: string]: Box;
}

const Container: React.FC = () => {
  const [boxes, setBoxes] = useState<ContainerState>({
    a: { left: 0, title: "XD", width: 20 },
    b: { left: 20, title: "XD", width: 50 }
  });

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      console.log(delta.x, item);

      const left = Math.round(item.left + delta.x);
      moveBox(item.id, left);
      return undefined;
    }
  });

  const moveBox = (id: string, left: number) => {
    const newBoxes = update(boxes, {
      [id]: {
        $merge: { left }
      }
    });
    if (validateLayout(newBoxes)) {
      setBoxes(newBoxes);
    }
  };

  return (
    <div ref={drop} style={styles} className="container">
      {Object.keys(boxes).map(key => {
        const { left, width } = boxes[key];
        return <Box key={key} id={key} left={left} width={width} />;
      })}
    </div>
  );
};
export default Container;
