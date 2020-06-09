import React from 'react';
import logo from './gclogo.png';
import Navigator from './Components/Toolbar/Navigator';
import ViewSwitcher from './Components/Toolbar/ViewSwitcher';
import Calendar from './Components/Calendar/Calendar';
import Week from './Components/Week/Week';
import Month from './Components/Month/Month';
import { connect } from 'react-redux';
import './App.css';
import Toggle from './Components/Toggle/Toggle';

function App(props) {
  return (
    <div className="App">
      <header className="toolbar">
        <img src={logo} alt="logo" className="App-logo" />
        <span className="title">Calender</span>
        <Navigator />
        <ViewSwitcher />
      </header>
      <div className="container">
        <div>
          <Calendar />
          <Toggle />
        </div>
        {props.page === 'Month' ? <Month /> : <Week />}
      </div>
    </div>
  );
}

const mapSTP = state => ({
  page: state.page
});
export default connect(mapSTP, null)(App);
