import React from 'react';
import moment from 'moment';
import './week.css';
import { connect } from 'react-redux';
import Hours from './Hours';
import Hour from './Hour';

class Week extends React.Component {
  state = {
    weekdayshort: moment.weekdaysShort()
  };
  renderHourRow(hour) {
    let rows = [];
    for (let day = 0; day < 7; day++) {
      let events = this.props.events.filter(event => {
        let x = parseInt(moment(this.props.current).format('DD')) + day;
        let h = hour;
        if (x < 10) x = '0' + x;
        if (h < 10) h = '0' + h;
        let y = x + moment(this.props.current).format('MMYY') + h;
        console.log('y : ', y, ' ,', event.time);
        return event.time == y;
      });

      rows.push(
        <Hour
          current={this.props.current}
          hour={hour}
          day={day}
          events={events}
        />
      );
    }
    return <tr>{rows}</tr>;
  }
  renderHourTable() {
    let tbl = [];
    for (let hour = 0; hour < 24; hour++) {
      tbl.push(this.renderHourRow(hour));
    }
    return <tbody>{tbl}</tbody>;
  }
  render() {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const m = moment(this.props.current)
        .clone()
        .add(i, 'd');
      days.push(m);
    }
    return (
      <div className="week">
        <Hours />
        <table className="table-week">
          <thead>
            {days.map((dt, i) => {
              let hldys = this.props.holidays.filter(hdys => {
                return hdys.Date === dt.format('DDMMYY');
              });
              return (
                <th key={moment().format('ddmm') + i} className="week-day">
                  <div>{this.state.weekdayshort[moment(dt).day()]}</div>
                  <div>{dt.format('DD')}</div>
                  <div>
                    {this.props.showHoliday &&
                      hldys.map(hdy => (
                        <span className="holiday">{hdy.name}</span>
                      ))}
                  </div>
                </th>
              );
            })}
          </thead>
          {this.renderHourTable()}
        </table>
      </div>
    );
  }
}

const mapDTP = dispatch => ({
  createEvent: (val, time) =>
    dispatch({
      type: 'CREATE_EVENT',
      time,
      event: val
    })
});

const mapSTP = state => {
  return {
    current: state.current,
    events: state.events,
    holidays: state.holidays,
    showHoliday: state.showHoliday
  };
};

export default connect(mapSTP, mapDTP)(Week);
