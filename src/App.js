import React from "react";
import "./App.css";
import { Button } from "antd-mobile";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home/index";
import CityList from "./pages/CityList/index";
import Map from "./pages/Map/index";
import "react-virtualized/styles.css";
function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/home" />}></Route>

        {/* <Link to="/citylist">城市列表</Link> */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
      </div>
    </Router>
  );
}

export default App;
