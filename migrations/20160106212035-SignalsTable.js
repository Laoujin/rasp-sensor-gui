var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('signals', {
		id: { type: 'int', primaryKey: true, autoIncrement: true },
		time: { type: 'datetime', notNull: true },
		signal: { type: 'string', notNull: true }
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('signals', callback);
};
