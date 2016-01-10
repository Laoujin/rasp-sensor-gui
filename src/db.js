import _ from 'lodash';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: 33061,
  user: 'raspberry',
  password: 'test123',
  database: 'data_collector'
});

export default {
  insert: function(temp) {
    connection.query('INSERT INTO temperatures SET ?', temp, function(err) {
      if (err) {
        console.error('error inserting: ', err.stack, temp);
        return;
      }
    });
  },
  get: function(callback) {
    connection.query('SELECT time, temp FROM temperatures ORDER BY id DESC', function(err, rows) {
      if (err) {
        console.error('error getting: ', err.stack);
        return;
      }
      callback({
        count: rows.length,
        rows: _.slice(rows, 0, 50)
      });
    });
  }
}