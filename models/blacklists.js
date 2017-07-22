var Sequelize = require('sequelize');
var connection = new Sequelize('movies','root', 'bella1995', {
	dialect: 'mysql'
});


var Blacklists= connection.define('blacklists', {
	bid:   Sequelize.DOUBLE,
	bname: Sequelize.STRING,
	bdirector: Sequelize.STRING,
	bgenre: Sequelize.STRING,
	bcover: Sequelize.TEXT,


});

exports.models = {
	blacklists: Blacklists
}