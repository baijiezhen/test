import React from "react";
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: "",
      y: "",
    };
  }

  render() {
    // return this.props.render(this.state);
    return this.props.children(this.state);
  }
  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };
  componentDidMount() {
    console.log("组件被创建了，此时可以获取到dom元素");
    // let test = document.getElementById("test");
    console.log(test);
    // 移动端没有鼠标移动事件
    window.addEventListener("mousemove", this.handleMouseMove);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  }
}
export default Mouse;
