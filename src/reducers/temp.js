import { List, Map } from 'immutable';
import * as ActionTypes from '../actions/ActionTypes.js';

//const initialState = List([Map({text: 'my first todo', completed: false}), Map({text: 'my second todo', completed: false})]);
//console.log('initialState', initialState);

export function temp(state = 0, action = null) {
  const { type, payload } = action;
  switch (type) {
  case ActionTypes.TEMP_UPDATE:
    return payload;
  // case ActionTypes.DELETE_TODO:
  //   return state.delete(payload.index);
  // case ActionTypes.CLEAR_TODO:
  //   return state.filter((todo) => !todo.get('completed'));
  // case ActionTypes.TOGGLE_CHECKED:
  //   return state.update(payload.index, todo => todo.set('completed', !todo.get('completed')));
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