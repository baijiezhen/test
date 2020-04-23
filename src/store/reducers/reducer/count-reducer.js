// import { ADDCOUNT } from "../../actions/action-types/action-types";
import { ADDCOUNT } from "../../actions/action-types/action-types";
console.log(ADDCOUNT);

const initState1 = {
  count: 0,
};

function countReducer(state = initState1, action) {
  let newState;
  console.log(action, "步骤二");
  switch (action.type) {
    case ADDCOUNT:
      console.log(333333333333);
      newState = Object.assign({}, state, { count: state.count + 1 });
      break;
    default:
      newState = state;
      break;
  }
  console.log(newState);
  return newState;
}
export default countReducer;
