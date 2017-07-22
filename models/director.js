var Sequelize = require('sequelize');
var connection = new Sequelize('movies','root', 'bella1995', {
	dialect: 'mysql'
});


var Directors = connection.define('directors', {
	did: Sequelize.DOUBLE,
	dname: Sequelize.STRING,
	ddate: Sequelize.TEXT,
	dcover: Sequelize.TEXT,
	drating: Sequelize.DOUBLE

});

exports.models = {
	directors: Directors
}