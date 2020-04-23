import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../store/actions/index";
const Counter = ({ value, onIncClick, onDecClick }) => {
  // 无状态组件
  return (
    <div>
      <span>{value}</span>
      <br />
      <button type="button" onClick={onIncClick}>
        Increase
      </button>
      <button type="button" onClick={onDecClick}>
        Decrease
      </button>
    </div>
  );
};
//class风格的组件，不推荐
// class Counter extends React.Component {
//     render() {
//         const {value,onIncClick,onDecClick}=this.props;
//         return (
//             <div>
//                 <span >{value}</span>
//                 <br />
//                 <button type="button" onClick={onIncClick}>Increase</button>
//                 <button type="button" onClick={onDecClick}>Decrease</button>
//             </div>
//         )
//     }
// }
Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncClick: PropTypes.func.isRequired,
  onDecClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: state.todos.num,
});

const mapDispatchToProps = (dispatch) => ({
  onIncClick: () => dispatch(actions.addnum()),
  onDecClick: () => dispatch(actions.delnum()),
});

const MyCounterApp = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default MyCounterApp;
