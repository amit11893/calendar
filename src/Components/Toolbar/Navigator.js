import React from 'react';
import './navigator.css';
// import moment from 'moment';
import { connect } from 'react-redux';

function Navigator(props) {
  return (
    <div className="navigator">
      <span className="text">Today</span>
      <span className="arrow">
        <span onClick={() => props.moveLast()}>&lt;</span> &nbsp;{' '}
        <span onClick={() => props.moveNext()}>&gt;</span>
      </span>
      <span className="title">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {' ' +
          props.current.format('MMMM') +
          '  ' +
          props.current.format('YYYY')}
      </span>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    moveNext: () =>
      dispatch({
        type: 'NEXT_WEEK'
      }),
    moveLast: () =>
      dispatch({
        type: 'NEXT_WEEK'
      })
  };
};
const mapSTP = state => {
  return {
    current: state.current
  };
};
export default connect(mapSTP, mapDispatchToProps)(Navigator);
