import { createStore } from 'redux';
import countReducer from './reducer';
import { loadState, saveState } from './localStorage';
import moment from 'moment';
const holidays = [
  { name: 'Independence Day', Date: '150820' },
  { name: 'HOLI', Date: '090620' },
  { name: 'Republic Day', Date: '120620' },
  { name: 'Deepawali', Date: '040620' },
  { name: 'Buddha Purnima', Date: '160620' }
];

const initial = {
  page: 'Month',
  current: moment(),
  events: [],
  holidays,
  showHoliday: true,
  showEvents: true
};

const persistedState = { ...loadState(), ...initial };
let store = createStore(countReducer, persistedState);

console.log(store.getState());
store.subscribe(() => {
  saveState({
    events: store.getState().events
  });
});

export default store;
