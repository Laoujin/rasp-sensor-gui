import eventEmitter from '../core/eventEmitter';

const conf = {
  tempTreshold: {
    min: 20,
    max: 24
  }
};

var state = {
  heater: true
};

export default {
  getState: function() {
    return state;
  },
  add: function(rawInput) {
    state.temp = {
      time: new Date(),
      temp: parseFloat(rawInput.temp, 10)
    };
    eventEmitter.emit('temp', state);
    if (state.temp.temp < conf.tempTreshold.min && !state.heater) {
      state.heater = true;
      eventEmitter.emit('heater', state);
    }
    if (state.temp.temp > conf.tempTreshold.max && state.heater) {
      state.heater = false;
      eventEmitter.emit('heater', state);
    }
    return state.temp;
  }
};