import { List, Map } from 'immutable';
import * as ActionTypes from '../actions/ActionTypes.js';

export function temp(state = 0, action = null) {
  const { type, payload } = action;
  switch (type) {
  case ActionTypes.TEMP_UPDATE:
    return payload;
  default:
    return state;
  }
}

export function heater(state = false, action = null) {
  const { type, payload } = action;
  switch (type) {
  case ActionTypes.SET_FILTER:
    return payload;
  default:
    return state;
  }
}