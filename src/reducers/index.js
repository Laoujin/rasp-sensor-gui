import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { temp, heater } from './temp.js';

const rootReducer = combineReducers({
  temp,
  heater,
  router
});

export default rootReducer;