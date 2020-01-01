import React from "react";
import ReactDOM from "react-dom";
import Track from "./components/Track/Track";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

ReactDOM.render(
  <DndProvider backend={Backend}>
    <Track />
  </DndProvider>,
  document.querySelector("#root")
);
