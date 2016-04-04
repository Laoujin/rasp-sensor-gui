import { Router } from 'express';
import temp from './temp.js';

export default function() {
  var api = Router();

  // temperature sensor input
  api.use('/temp', temp);

  api.get('/', (req, res) => {
    res.json({
      version : '1.0'
      //require('../../package.json').version
    });
  });

  return api;
}