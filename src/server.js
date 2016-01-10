import 'babel-core/polyfill';
import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import { registerEvents } from './core/eventEmitter';

registerEvents();

const app = global.app = express();
app.server = http.createServer(app);

app.use(bodyParser.json({
  limit: '100kb'
}));

app.set('port', (process.env.PORT || 8181));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api());

global.io = require('socket.io')(app.server);
// io.on('connection', function(socket) {
//   console.log('user connected');
//   socket.on('temp', function(msg) {
//     console.log('got', msg);
//     //io.emit('chat message', msg);
//   });
// });

app.server.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('The server is running at http://localhost:' + app.get('port'));
  if (process.send) {
    process.send('online');
  }
});
