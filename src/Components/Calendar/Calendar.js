import React from 'react';
import moment from 'moment';
import './calendar.css';

class Calendar extends React.Component {
  state = {
    weekdayshort: moment.weekdaysShort(),
    dateObject: moment()
  };
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf('month')
      .format('d');
    return firstDay;
  };
  currentDay = () => {
    return this.state.dateObject.format('D');
  };
  currentMonth = () => {
    return this.state.dateObject.format('MMMM');
  };
  render() {
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{''}</td>);
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? 'today' : '';
      console.log(currentDay);
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          {d}
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
          <span className="arrow">&lt;&nbsp;&nbsp;&gt;</span>
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

export default Calendar;
