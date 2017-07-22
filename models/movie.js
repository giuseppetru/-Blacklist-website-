var Sequelize = require('sequelize');
var connection = new Sequelize('movies','root', 'bella1995', {
	dialect: 'mysql'
});


var Movies = connection.define('movies', {
	mid:   Sequelize.DOUBLE,
	mname: Sequelize.STRING,
	mdate: Sequelize.TEXT,
	mdirector: Sequelize.TEXT,
	mgenre: Sequelize.STRING,
	mcover: Sequelize.TEXT,
	mrating: Sequelize.DOUBLE

});

exports.models = {
	movies: Movies
}