import resource from 'resource-router-middleware';
import model from './tempModel.js';
import db from '../db.js';

export default resource({
  id : 'temp',

  create({ body }, res) {
    body = model.add(body);
    db.insert(body);
    console.log('posted', body); // eslint-disable-line
    res.json(body);
  },

  list(req, res) {
    db.get(function(result) {
      res.json(result);
    });
  },
});