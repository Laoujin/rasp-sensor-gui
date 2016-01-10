import resource from 'resource-router-middleware';
import model from './tempModel';
import db from '../db';

export default resource({
  id : 'temp',

  create({ body }, res) {
    body = model.add(body);
    db.insert(body);
    console.log('posted', body);
    res.json(body);
  },

  list: function(req, res) {
    db.get(function(result) {
      res.json(result);
    });
  },
});