import React from 'react';
import moment from 'moment';

class Hours extends React.Component {
  state = {
    start: moment()
      .startOf('day')
      .hours()
  };

  render() {
    const blocks = ['12 AM'];
    let st = '';
    for (let i = 1; i < 12; i++) {
      if (i < 10) {
        st += '0';
      }
      st = st + i + ' AM';
      blocks.push(st);
      st = '';
    }
    blocks.push('12 PM');
    for (let i = 1; i < 12; i++) {
      if (i < 10) {
        st += '0';
      }
      st = st + i + ' PM';
      blocks.push(st);
      st = '';
    }
    return (
      <div class="hours">
        <div>
          {blocks.map(block => (
            <div class="hour-time">
              <span>{block}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Hours;
