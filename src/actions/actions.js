import * as ActionTypes from './ActionTypes';

export function tempUpdate(data) {
  return {
    type: ActionTypes.TEMP_UPDATE,
    payload: data.temp
  };
}