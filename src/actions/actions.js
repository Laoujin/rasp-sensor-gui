import * as ActionTypes from './ActionTypes.js';

export function tempUpdate(data) {
  return {
    type: ActionTypes.TEMP_UPDATE,
    payload: data.temp
  };
}