import { createStore } from "redux";
import rootReducer from "./reducers/index";
console.log(rootReducer);
let store = createStore(rootReducer); //传入reducer
console.log(store);

// createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。
// const state = store.getState();
store.subscribe(() => {
  let newState = store.getState();
  console.log("监听函数发出:", newState);
  //   component.setState(newState);
});
export default store;
