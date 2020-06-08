import React from 'react';
import moment from 'moment';
import './week.css';
import { connect } from 'react-redux';

class Week extends React.Component {
  state = {
    weekdayshort: moment.weekdaysShort(),
    dateObject: moment(),
    hours: 24
  };
  renderHour() {
    return <td className="hour"></td>;
  }
  renderHourRow() {
    let rows = [];
    for (let i = 0; i < 7; i++) {
      rows.push(this.renderHour());
    }
    return <tr>{rows}</tr>;
  }
  renderHourTable() {
    let tbl = [];
    for (let i = 0; i < 24; i++) {
      tbl.push(this.renderHourRow());
    }
    return <tbody>{tbl}</tbody>;
  }
  render() {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const m = this.props.current.clone().add(i, 'd');
      days.push(m);
    }
    return (
      <div className="week">
        <table>
          <thead>
            {days.map((dt, i) => {
              console.log('current:', dt);
              return (
                <th key={moment(dt).day} className="week-day">
                  <div>{this.state.weekdayshort[moment(dt).day()]}</div>
                  <div>{dt.format('DD')}</div>
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

const mapSTP = state => ({
  current: state.current
});

export default connect(mapSTP, null)(Week);
