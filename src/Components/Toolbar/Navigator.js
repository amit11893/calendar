import React from 'react';
import './navigator.css';
import moment from 'moment';
import { connect } from 'react-redux';

class Navigator extends React.Component {
  //console.log('curr : ', props.current);
  render() {
    return (
      <div className="navigator">
        <span className="text">Today</span>
        <span className="arrow">
          <button onClick={() => this.props.moveLast()}>&lt;</button> {'  '}
          <button onClick={() => this.props.moveNext()}>&gt;</button>
        </span>
        <span className="title">
          &nbsp;&nbsp;&nbsp;
          {' ' +
            moment(this.props.current).format('MMMM') +
            '  ' +
            moment(this.props.current).format('YYYY')}
        </span>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    moveNext: () =>
      dispatch({
        type: 'NEXT'
      }),
    moveLast: () =>
      dispatch({
        type: 'LAST'
      })
  };
};
const mapSTP = state => {
  return {
    current: state.current
  };
};
export default connect(mapSTP, mapDispatchToProps)(Navigator);
