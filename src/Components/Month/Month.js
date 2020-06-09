import React from 'react';
import moment from 'moment';
import './month.css';
import { connect } from 'react-redux';

class Month extends React.Component {
  state = {
    weekdayshort: moment.weekdaysShort(),
    dateObject: this.props.current
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
      let hldys = this.props.holidays.filter(hdys => {
        let x = d;
        if (x < 10) x = '0' + x;
        return hdys.Date === x + this.props.current.format('MMYY');
      });
      let evts = this.props.events.filter(event => {
        let y = d;
        if (y < 10) y = '0' + y;
        return event.time.slice(0, 6) === y + this.props.current.format('MMYY');
      });
      daysInMonth.push(
        <td key={d} className="month-day">
          {d}
          {this.props.showHoliday &&
            hldys.map(hl => <div className="month-holiday">{hl.name}</div>)}
          {this.props.showEvents &&
            evts.map((event, i) => (
              <span className="event-name" key={i}>
                <button onClick={e => this.props.deleteEvent(e, event.name)}>
                  {event.name}
                </button>
              </span>
            ))}
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
      <div className="month">
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

const mapDispatchToProps = dispatch => {
  return {
    deleteEvent: (event, name) => {
      event.stopPropagation();
      dispatch({ type: 'DELETE_EVENT', name });
    }
  };
};
const mapSTP = state => {
  return {
    current: state.current,
    events: state.events,
    holidays: state.holidays,
    showEvents: state.showEvents,
    showHoliday: state.showHoliday
  };
};
export default connect(mapSTP, mapDispatchToProps)(Month);
