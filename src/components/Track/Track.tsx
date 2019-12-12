import React, { useState, useReducer } from "react";
import { Position } from "react-rnd";
import Tile from "../Tile/Tile";

export type Size = {
  width: number | string;
  height: number | string;
};

export type Id = {
  id: string;
};

export type TileDefinition = Position & Size & Id;

type Action = {
  type: string;
  payload: any;
};

const isCaptured = (tiles: TileDefinition[]) => {
  const exes = tiles.map(tile => tile.x);
};

const stateReducer = (
  state: TileDefinition[],
  { type, payload }: Action
): TileDefinition[] => {
  switch (type) {
    case "RESIZE":
      return [...state].map(tile => {
        console.log(tile.id === payload.id ? payload : tile);

        return tile.id === payload.id ? payload : tile;
      });

    case "RELOCATE":
      return [...state].map(tile =>
        tile.id === payload.id ? { ...tile, ...payload.position } : tile
      );

    default:
      throw new Error("Unsupported action type!");
  }
};

export default () => {
  const initialState = [
    { id: "1", x: 1, y: 1, width: 100, height: 100 },
    { id: "2", x: 2, y: 2, width: 100, height: 100 },
    { id: "3", x: 3, y: 3, width: 100, height: 100 },
    { id: "4", x: 4, y: 4, width: 100, height: 100 }
  ] as TileDefinition[];

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const handleResize = (tileProps: TileDefinition) => {
    dispatch({ type: "RESIZE", payload: tileProps });
  };

  const handleRelocation = ({ id, ...position }: Id & Position) => {
    dispatch({ type: "RELOCATE", payload: { id, position } });
  };

  return (
    <div>
      {state.map(tile => (
        <Tile
          key={tile.id}
          tile={tile}
          onResize={handleResize}
          onRelocate={handleRelocation}
        />
      ))}
    </div>
  );
};

// export default Track;

// import React, { useReducer } from "react";
// import GridLayout from "react-grid-layout";
// import styles from "./Track.module.scss";
// import _ from "lodash"

// type Boxes = GridLayout.Layout[];

// type Action = {
//   payload: Boxes;
//   type: String;
// };

// const stateReducer: React.Reducer<Boxes, Action> = (state, action) => {
//   // const tiles = [...action.payload].map(tile => ({ ...tile, y: 0 }));
//   // console.log(tiles.map(({ y }, i) => `${i}: ${y}`));

//   return action.payload;
// };

// const Track: React.FC = () => {
//   const [state, dispatch] = useReducer(stateReducer, [
//     { i: "0", x: 0, y: 0, w: 1, h: 1 },
//     { i: "1", x: 1, y: 0, w: 1, h: Math.floor(Math.random() * 4) },
//     { i: "2", x: 2, y: 0, w: 1, h: 1 }
//   ]);

//   const childs = state.map(tile => (
//     <div key={tile.i} data-grid={tile.i} style={{ backgroundColor: "wheat" }}>
//       {tile.i}
//     </div>
//   ));
//   return (
//     <>
//       <Grid dispatch={dispatch} layout={state} childs={childs} />
//     </>
//   );
// };

// export default Track;

// type GridProps = {
//   dispatch: React.Dispatch<Action>;
//   layout: any;
//   childs: JSX.Element[];
// };

// let oldLayout: Boxes | null = null;

// const Grid = ({ dispatch, layout, childs }: GridProps) => {
//   //layout.push([]);
//   console.log(oldLayout, layout);
//   layout[0].y += 1;
//   const gridProps = {
//     className: `layout ${styles.track}`,
//     rowHeight: 100,
//     compactType: null,
//     layout,
//     useCSSTransforms: true,
//     onLayoutChange: (currLayout: Boxes) => {
//       // console.log("view", currLayout);
//       console.log("XD1");

//       dispatch({ type: "SET_NEW_LAYOUT", payload: currLayout });
//     },
//     cols: 100,
//     preventCollision: true,
//     maxRows: 5,
//     width: 11000
//   };
//   oldLayout = layout;
//   return <GridLayout {...gridProps}>{childs}</GridLayout>;
// };
