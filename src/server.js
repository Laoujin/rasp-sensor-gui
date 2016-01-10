import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import { registerEvents } from './core/eventEmitter';

registerEvents();

const server = global.server = express();

server.use(bodyParser.json({
  limit: '100kb'
}));

server.set('port', (process.env.PORT || 8181));
server.use(express.static(path.join(__dirname, 'public')));

server.use('/api', api());

server.listen(server.get('port'), () => {
  /* eslint-disable no-console */
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});
