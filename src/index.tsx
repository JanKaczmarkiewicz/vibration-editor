import React from "react";
import ReactDOM from "react-dom";
import Track from "./components/Track/Track";

import "./scss/global.scss";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";

ReactDOM.render(<Track />, document.querySelector("#root"));
