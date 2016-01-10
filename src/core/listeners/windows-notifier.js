import eventEmitter from '../eventEmitter';
import notifier from 'node-notifier';

export default function() {
  // notifier.notify({
  //   title: 'Opportunities ahead',
  //   message: 'This one appears together with the second notifier?'
  // });

  // eventEmitter.on('temp', function(data) {
  //  console.log('emitted' + data.temp);
  // });

  eventEmitter.on('heater', function(data) {
    notifier.notify({
      title: 'Temp = ' + data.temp.temp,
      message: 'Send heater ' + (data.heater ? 'ON' : 'OFF') + ' signal'
    });
  });
}