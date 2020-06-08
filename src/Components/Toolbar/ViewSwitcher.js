import React from 'react';
import './navigator.css';
import { connect } from 'react-redux';

class ViewSwitcher extends React.Component {
  handleChange = event => {
    this.props.switchPage(event.target.value);
  };
  render() {
    return (
      <div className="switcher">
        <select value={this.props.page} onChange={this.handleChange}>
          <option value="Month">Month</option>
          <option value="Week">Week</option>
        </select>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    switchPage: value =>
      dispatch({
        page: value,
        type: 'SWITCH'
      })
  };
};
const mapSTP = state => {
  return {
    options: state.options,
    selectedValues: state.selectedValues,
    page: state.page
  };
};
export default connect(mapSTP, mapDispatchToProps)(ViewSwitcher);
