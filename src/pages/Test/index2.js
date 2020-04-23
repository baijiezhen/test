import React from "react";
class Test extends React.Component {
  state = {
    num: 0,
  };
  clickMe = (e) => {
    //   this.setState 方法是异步的
    // 写法一
    // this.setState({
    //   num: this.state.num + 1,
    // });
    this.setState(
      (state, props) => {
        return {
          num: state.num + 1,
        };
      },
      () => {
        console.log("我是数据更新的num: " + this.state.num);
      }
    );
    console.log(this.state.num);
  };
  render() {
    return (
      <div>
        {this.state.num}
        <button
          onClick={() => {
            this.clickMe();
          }}
        >
          +1
        </button>
      </div>
    );
  }
}
export default Test;
