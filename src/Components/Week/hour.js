import React from 'react';
import Modal from '../Modal/Modal';
import moment from 'moment';
import { connect } from 'react-redux';

class Hour extends React.Component {
  state = { value: '' };
  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const time = moment(this.props.current)
      .clone()
      .add(this.props.day, 'd')
      .startOf('day')
      .add(this.props.hour, 'hours')
      .format('DDMMYYHH');
    // console.log('time: ', time);
    this.props.createEvent(this.state.value, time);
    this.setState({ value: '' });
    this.hideModal();
  };
  render() {
    return (
      <td>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h1>Create Event</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
        <button className="hour" onClick={() => this.showModal()}>
          {this.props.showEvents &&
            this.props.events.map((event, i) => (
              <span className="event-name" key={i}>
                <button onClick={e => this.props.deleteEvent(e, event.name)}>
                  {event.name}
                </button>
              </span>
            ))}
        </button>
      </td>
    );
  }
}

const mapSTP = state => ({
  showEvents: state.showEvents
});

const mapDTP = dispatch => ({
  createEvent: (val, time) =>
    dispatch({
      type: 'CREATE_EVENT',
      event: { time, name: val }
    }),
  deleteEvent: (event, name) => {
    event.stopPropagation();
    dispatch({ type: 'DELETE_EVENT', name });
  }
});

export default connect(mapSTP, mapDTP)(Hour);
