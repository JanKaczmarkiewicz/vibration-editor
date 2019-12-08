import React from "react";
import styles from "./Tile.module.scss";

type TileProps = {
  text: string;
};

const Tile = ({ text }: TileProps) => {
  return <div>{text}</div>;
};

export default Tile;
