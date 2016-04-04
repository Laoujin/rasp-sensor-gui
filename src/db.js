import _ from 'lodash';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: 33061,
  user: 'raspberry',
  password: 'test123',
  database: 'data_collector'
});

const queries = {
  tempByHour:
    `SELECT date_format(time, '%Y%m%d%H') as measuredon, AVG(temp) AS temperature
     FROM temperatures
     GROUP BY date_format(time, '%Y%m%d%H')`
};

export default {
  insert: function(temp) {
    connection.query('INSERT INTO temperatures SET ?', temp, function(err) {
      if (err) {
        console.error('error inserting: ', err.stack, temp); // eslint-disable-line
        return;
      }
    });
  },
  get: function(callback) {
    connection.query(queries.tempByHour, function(err, rows) {
      if (err) {
        console.error('error getting: ', err.stack); // eslint-disable-line
        return;
      }
      callback(rows);
      // callback({
      //   count: rows.length,
      //   rows: _.slice(rows, 0, 50)
      // });
    });
  }
};