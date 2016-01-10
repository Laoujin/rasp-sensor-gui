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

  // global.socket.on('chat message', function(msg){
  //   console.log('message received');
  //   $('#messages').append($('<li>').text(msg));
  // });

export default {
  add: function(rawInput) {
    state.temp = {
      time: new Date(),
      temp: parseFloat(rawInput.temp, 10)
    };
    eventEmitter.emit('temp', state);
    global.io.emit('temp', state.temp);
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