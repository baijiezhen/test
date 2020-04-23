import {
  ADD_TODO,
  TOGGLE_COMPLETE,
  CHANGE_DISPLAY,
  DELETE_LIST,
  INCREASE,
  DECREASE,
} from "../../actions/action-types/action-types";

// import * as types from "../actions/action-types/action-types";
// 定义项目的默认状态，传入reducer
const initState2 = {
  //display用于控制待办项列表的显示
  display: "all",
  num: 0,
  todos: [
    {
      id: parseInt(Math.random() * 10000000),
      isComplete: false,
      title: "学习redux",
    },
    {
      id: parseInt(Math.random() * 10000000),
      isComplete: true,
      title: "学习react",
    },
    {
      id: parseInt(Math.random() * 10000000),
      isComplete: false,
      title: "学习node",
    },
  ],
};
// reducer是更新state的核心，它里面封装了更新state的逻辑，reducer由外界提供（封装业务逻辑，在createStore时传入），并传入旧state对象和action，将新值更新到旧的state对象上返回。
function todoReducer(state = initState2, action) {
  let newState;
  console.log(action, "步骤二");
  switch (action.type) {
    case ADD_TODO:
      newState = {
        todos: [...state.todos, action.payload],
      };
      break;
    case TOGGLE_COMPLETE:
      newState = {
        //循环每一条待办，把要修改的记录更新
        todos: state.todos.map((item) => {
          if (item.id == action.payload) {
            item.isComplete = !item.isComplete;
          }
          return item;
        }),
      };
      break;
    case CHANGE_DISPLAY:
      newState = {
        display: action.payload,
        todos: [...state.todos],
      };
      break;
    case DELETE_LIST:
      newState = {
        todos: (function () {
          let arr = [].concat(state.todos);
          arr.forEach((item, index) => {
            if (item.id == action.payload) {
              console.log(index);
              arr.splice(index, 1);
            }
          });
          return arr;
        })(),
      };
      break;
    case INCREASE:
      newState = {
        ...state,
        num: state.num + 1,
      };
      break;
    case DECREASE:
      console.log(22222222222);
      newState = {
        ...state,
        num: state.num - 1,
      };
      break;
    default:
      newState = state;
      break;
  }
  console.log(newState);
  return newState;
}
export default todoReducer;
