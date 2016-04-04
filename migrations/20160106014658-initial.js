var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('temperatures', {
		id: { type: 'int', primaryKey: true, autoIncrement: true },
		time: { type: 'datetime', notNull: true },
		temp: { type: 'decimal', notNull: true, length: '6,3' }
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('temperatures', callback);
};