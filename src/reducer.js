import moment from 'moment';

let current;
const countReducer = function(state, action) {
  switch (action.type) {
    case 'SWITCH':
      return { ...state, page: action.page };
    case 'NEXT':
      if (state.page === 'Month') {
        current = moment(state.current)
          .clone()
          .add(1, 'months');
      } else {
        current = moment(state.current)
          .clone()
          .add(7, 'd');
      }
      return { ...state, current };
    case 'LAST':
      if (state.page === 'Month') {
        current = moment(state.current)
          .clone()
          .subtract(1, 'months');
      } else {
        current = moment(state.current)
          .clone()
          .subtract(7, 'd');
      }
      return { ...state, current };
    case 'CAL_NEXT':
      current = moment(state.current)
        .clone()
        .add(1, 'months');
      return { ...state, current };
    case 'CAL_LAST':
      current = moment(state.current)
        .clone()
        .subtract(1, 'months');
      return { ...state, current };
    case 'MOVE_DATE':
      current = moment(state.current)
        .clone()
        .add(action.diff, 'd');
      return { ...state, current };
    case 'CREATE_EVENT':
      let events = [...state.events, action.event];
      return { ...state, events };
    case 'DELETE_EVENT':
      let evs = state.events.filter(event => {
        return event.name !== action.name;
      });
      return { ...state, events: evs };
    case 'CHANGE_EVENTS':
      let showEvents = !state.showEvents;
      return { ...state, showEvents };
    case 'CHANGE_HOLIDAY':
      let showHoliday = !state.showHoliday;
      return { ...state, showHoliday };
    default:
      return state;
  }
};

export default countReducer;
