import { createStore } from 'redux';
import countReducer from './reducer';

let store = createStore(countReducer);

export default store;
