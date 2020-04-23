// 高阶组件和prop 练习
import React from "react";
// import Mouse from "./Mouse";
import withMouse from "./withMouse";
import img from "../../assets/img/cat.png";
const Cat = (props) => (
  <img
    src={img}
    alt=""
    style={{
      position: "absolute",
      top: props.y - 64,
      left: props.x - 64,
    }}
  />
);
// 用来测试高阶组件
const Position = (props) => {
  console.log("Position:", props);
  return (
    <p>
      鼠标当前位置：(x: {props.x}, y: {props.y})
    </p>
  );
};
const MouseCat = withMouse(Cat);
const MousePosition = withMouse(Position);
// console.log(MouseCat);
class Text extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="test">
        {/* 高阶组件 */}
        <MouseCat></MouseCat>
        {/* 此处定义的name 需要再高阶函数中添加prop属性传递，Position 该组件才能接受到props属性 */}
        <MousePosition name="abc"></MousePosition>
        {/* props 模式 */}
        {/* <Mouse
          render={(props) => {
            return (
              <div>
                <div>{props.x}</div>
                <div>{props.y}</div>
              </div>
            );
          }}
        ></Mouse> */}
        {/* children模式 */}
        {/* <Mouse>
          {(props) => {
            return (
              <div>
                <div>{props.x}</div>
                <div>{props.y}</div>
              </div>
            );
          }}
        </Mouse> */}
        {/* <Mouse>
          {(props) => {
            return (
              <div>
                <img
                  src={require("../../../src/assets/img/cat.png")}
                  style={{
                    position: "relative",
                    top: props.x - 64,
                    left: props.y - 64,
                  }}
                />
              </div>
            );
          }}
        </Mouse> */}
        {/* 高阶组件模式 */}
      </div>
    );
  }
}
export default Text;
