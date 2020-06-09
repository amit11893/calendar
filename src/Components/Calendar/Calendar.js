import React from 'react';
import moment from 'moment';
import './calendar.css';
import { connect } from 'react-redux';
class Calendar extends React.Component {
  state = {
    weekdayshort: moment.weekdaysShort(),
    dateObject: this.props.current
  };
  daysInMonth = () => {
    return moment(this.props.current).daysInMonth();
  };
  firstDayOfMonth = () => {
    let dateObject = this.props.current;
    let firstDay = moment(dateObject)
      .startOf('month')
      .format('d');
    return firstDay;
  };
  currentDay = () => {
    return moment(this.props.current).format('DD');
  };
  currentMonth = () => {
    return moment(this.props.current).format('MMMM');
  };
  render() {
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{''}</td>);
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? 'today' : '';
      let diff = d - this.currentDay();
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <button onClick={d => this.props.moveToDate(diff)}>{d}</button>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });
    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });
    return (
      <div className="calendar">
        <div className="cals">
          {this.currentMonth()}{' '}
          <span className="arrow">
            <button onClick={() => this.props.moveLast()}>&lt;</button>
            &nbsp;&nbsp;
            <button onClick={() => this.props.moveNext()}>&gt;</button>
          </span>
        </div>
        <table>
          <thead>
            {this.state.weekdayshort.map(day => {
              return <th key={day}>{day}</th>;
            })}
          </thead>
          <tbody>{daysinmonth}</tbody>
        </table>
      </div>
    );
  }
}

const mapSTP = state => ({
  current: state.current
});

const mapDispatchToProps = dispatch => {
  return {
    moveNext: () =>
      dispatch({
        type: 'CAL_NEXT'
      }),
    moveLast: () =>
      dispatch({
        type: 'CAL_LAST'
      }),
    moveToDate: x =>
      dispatch({
        type: 'MOVE_DATE',
        diff: x
      })
  };
};

export default connect(mapSTP, mapDispatchToProps)(Calendar);
