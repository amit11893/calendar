import moment from 'moment';

let current = moment();
const initial = {
  page: 'Month',
  current
};
const countReducer = function(state = initial, action) {
  switch (action.type) {
    case 'SWITCH':
      return { ...state, page: action.page };
    case 'NEXT_WEEK':
      current = state.current.add(7, 'd');
      return { ...state, current };
    case 'NEXT_MONTH':
      current = state.current.add(1, 'months');
      return { ...state, current };
    case 'LAST_WEEK':
      current = state.current.subtract(7, 'd');
      return { ...state, current };
    case 'LAST_MONTH':
      current = state.current.subtract(1, 'months');
      return { ...state, current };
    default:
      return state;
  }
};

export default countReducer;
