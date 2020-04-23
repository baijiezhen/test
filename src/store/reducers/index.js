import { combineReducers } from "redux";
import todos from "./reducer/todo-reducer";
import count from "./reducer/count-reducer";
console.log(todos, count);
const allReducers = {
  todos,
  count,
};

export default combineReducers(allReducers);
