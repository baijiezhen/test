import React from "react";
import store from "../../store/index";
import actions from "../../store/actions/index";

class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState().count.count,
    };
  }
  addCount = () => {
    store.dispatch(actions.addCount());
  };
  componentDidMount() {
    store.subscribe(() => {
      let newState = store.getState().count.count;
      this.setState({
        count: newState,
      });
      console.log("监听函数发出:", newState);
      //   component.setState(newState);
    });
  }
  render() {
    return (
      <div>
        <br />
        ----------------------
        <button onClick={this.addCount}>+1</button> {this.state.count}
        <button>-1</button>
      </div>
    );
  }
}

export default Count;
