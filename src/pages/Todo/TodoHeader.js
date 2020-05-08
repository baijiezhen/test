import { connect } from "react-redux";
import React from "react";
class TodoHeader extends React.Component {
  //取得未完成的todo数量
  getUnfinishedCount() {
    //this.props.todos就是从connect传入的state数据
    return this.props.todos.todos.filter((i) => {
      return i.isComplete === false;
    }).length;
  }

  render() {
    return (
      <div>
        <div>您有{this.getUnfinishedCount()}件事未完成</div>
      </div>
    );
  }
}

//导出注入后的组件
// connect 接受一个函数
export default connect((state) => ({
  ...state, //此时的state就是todos:[...]数据
}))(TodoHeader);
