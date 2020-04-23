import React from "react";
import ReactDOM from "react-dom";
import "antd-mobile/dist/antd-mobile.css";
import "./assets/fonts/iconfont.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
