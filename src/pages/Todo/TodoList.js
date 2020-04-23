import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions/index";
class TodoList extends React.Component {
  state = {
    val: "222",
  };
  changeVal = (e) => {
    this.setState({
      val: e.target.value,
    });
  };
  changeStatus = (type) => {
    console.log(type);
    this.props.changeDisplay(type);
  };
  addTodo = () => {
    let { val } = this.state;
    let obj = {
      id: parseInt(Math.random() * 10000000),
      isComplete: false,
      title: val,
    };
    this.props.addTodo(obj);
    this.setState({ val: "" });
  };
  todoChange = (event) => {
    //当onChange事件发生时，调用toggleComplete动作
    this.props.toggleComplete(event.target.value);
  };
  deleTodo = (id) => {
    this.props.delectList(id);
  };
  //按display条件过滤数据
  filterDisplay() {
    console.log(this.props.todos + "----------------");
    return this.props.todos.filter((item) => {
      switch (this.props.display) {
        case "completed":
          return item.isComplete;
        case "uncompleted":
          return !item.isComplete;
        case "all":
        default:
          return true;
      }
    });
  }
  getTodos() {
    let todos = this.filterDisplay();
    // console.log(todos);
    return todos.map((todo, index) => {
      return (
        <li key={index}>
          <input
            type="checkbox"
            value={todo.id}
            checked={todo.isComplete}
            onChange={this.todoChange}
          />{" "}
          {todo.isComplete ? (
            <del>{todo.title}</del>
          ) : (
            <span>{todo.title}</span>
          )}
          <button
            type="button"
            data-id={todo.id}
            onClick={() => {
              this.deleTodo(todo.id);
            }}
          >
            删除
          </button>
        </li>
      );
    });
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        代办项：
        <input value={this.state.val} onChange={this.changeVal} />
        <button type="button" onClick={this.addTodo}>
          添加
        </button>
        <ul>{this.getTodos()}</ul>
        <button
          type="button"
          onClick={() => {
            this.changeStatus("all");
          }}
        >
          全部
        </button>
        <button
          type="button"
          onClick={() => {
            this.changeStatus("uncompleted");
          }}
        >
          未完成
        </button>
        <button
          type="button"
          onClick={() => {
            this.changeStatus("completed");
          }}
        >
          已完成
        </button>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    ...state.todos,
  }),
  actions
)(TodoList); //第二个参数传入actionCreators
