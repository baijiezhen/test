import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home/index";
import CityList from "./pages/CityList/index";
import Map from "./pages/Map/index";
import HouseDetail from "./pages/HouseDetail/index";
import Login from "./pages/Login/index";
import Profile from "./pages/Profile/index";
import Test from "./pages/Test/index";
import Todo from "./pages/Todo/index";
import Hooks from "./pages/Hooks/index";
import "react-virtualized/styles.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/home" />}></Route>

        {/* <Link to="/citylist">城市列表</Link> */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <AuthRoute path="/map" component={Map}></AuthRoute>
        <Route path="/detail/:id" component={HouseDetail}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/Profile" component={Profile}></Route>
        <Route path="/test" component={Test}></Route>
        <Route path="/Todo" component={Todo}></Route>
        <Route path="/Hooks" component={Hooks}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
