import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./itemTypes";

const style: React.CSSProperties = {
  position: "absolute",
  backgroundColor: "white",
  height: 40,
  cursor: "move"
};

export interface BoxProps {
  id: any;
  left: number;
  width: number;
}

const Box: React.FC<BoxProps> = ({ id, left, children, width }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top: 0, type: ItemTypes.BOX },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...style, left, width }}>
      {children}
    </div>
  );
};

export default Box;
