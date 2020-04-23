import React from "react";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";
import Counter from "./Counter";
import Count from "./Count";
import store from "../../store";
console.log(store.getState());

class Todo extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <>
        <TodoHeader />
        <TodoList />
        <Counter />
        <Count />
      </>
    );
  }
}
export default Todo;
