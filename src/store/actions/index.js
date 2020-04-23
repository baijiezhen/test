// import {
//   ADD_TODO,
//   TOGGLE_COMPLETE,
//   CHANGE_DISPLAY,
//   DELETE_LIST,
//   INCREASE,
//   DECREASE
// } from "../actions/action-types/action-types";
import * as types from "../actions/action-types/action-types";
// 如果每次派发动作时都写上长长的action对象不是很方便，而actionCreator就是创建action对象的一个方法，调用这个方法就能返回一个action对象，用于简化代码。
// Action 就是 View 发出的通知，表示 State 应该要发生变化了。
// action描述了一个更新state的动作，它是一个对象，其中type属性是必须有的，它指定了某动作和要修改的值：

// const ADD_TODO = '添加 TODO';

// function addTodo(text) {
//   return {
//     type: ADD_TODO,
//     text
//   }
// }

// const action = addTodo('Learn Redux');
let actions = {
  addTodo: function (payload) {
    console.log(payload, "步骤一"); //
    return { type: types.ADD_TODO, payload };
  },
  //更改完成状态，此处payload传id
  toggleComplete: function (payload) {
    return { type: types.TOGGLE_COMPLETE, payload };
  },
  //更改显示待办项的状态，
  //payload为以下3个值（all,uncompleted,completed）
  changeDisplay: function (payload) {
    return { type: types.CHANGE_DISPLAY, payload };
  },
  // 此时是一个id
  delectList: function (payload) {
    return { type: types.DELETE_LIST, payload };
  },
  addnum: function (payload) {
    console.log(payload, "步骤一"); //
    return { type: types.INCREASE, payload };
  },
  delnum: function (payload) {
    console.log(payload, "步骤一11111111111111111111111"); //
    console.log({ type: types.DECREASE, payload });
    return { type: types.DECREASE, payload };
  },
  addCount: function (payload) {
    console.log(payload, "步骤一11111111111111111111111"); //
    console.log({ type: types.ADDCOUNT, payload });
    return { type: types.ADDCOUNT, payload };
  },
};

export default actions; //导出ActionCreators
