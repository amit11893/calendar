import React from 'react';
import './modal.css';

export default class Modal extends React.Component {
  render() {
    const showHideClassName = this.props.show
      ? 'modal display-block'
      : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.props.children}
          <button onClick={this.props.handleClose}>close</button>
        </section>
      </div>
    );
  }
}
