import React from "react";
function withMouse(WrappedComponent) {
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
      return (
        <WrappedComponent {...this.state} {...this.props}></WrappedComponent>
      );
    }
    handleMouseMove = (e) => {
      this.setState({
        x: e.clientX,
        y: e.clientY,
      });
    };
    componentDidMount() {
      // 移动端没有鼠标移动事件
      window.addEventListener("mousemove", this.handleMouseMove);
    }
    componentWillUnmount() {
      window.removeEventListener("mousemove", this.handleMouseMove);
    }
  }
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`;

  return Mouse;
}
// 通过displayName 设置组件不同名字
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
export default withMouse;
