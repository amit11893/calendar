import React from 'react';
import './toggle.css';
import { connect } from 'react-redux';

class Toggle extends React.Component {
  state = { eventChecked: true, holidayChecked: true };
  handleEventCheckboxChange = () => {
    this.setState(
      { eventChecked: !this.state.eventChecked },
      this.props.changeEvents
    );
  };
  handleHolidayCheckboxChange = () => {
    this.setState(
      { holidayChecked: !this.state.holidayChecked },
      this.props.changeHoilday
    );
  };
  render() {
    return (
      <div className="toggle">
        <label>
          <Checkbox
            checked={this.state.eventChecked}
            onChange={this.handleEventCheckboxChange}
          />
          <span>Events</span>
        </label>
        <label>
          <Checkbox
            checked={this.state.holidayChecked}
            onChange={this.handleHolidayCheckboxChange}
          />
          <span>Holidays</span>
        </label>
      </div>
    );
  }
}

function Checkbox(props) {
  return <input type="checkbox" {...props} />;
}

const mapDTP = dispatch => ({
  changeEvents: () =>
    dispatch({
      type: 'CHANGE_EVENTS'
    }),
  changeHoilday: () =>
    dispatch({
      type: 'CHANGE_HOLIDAY'
    })
});

export default connect(null, mapDTP)(Toggle);
