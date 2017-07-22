var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var expressHbs = require('express-handlebars');
var mysql = require('mysql');
var Sequelize = require('sequelize');
var flash = require('connect-flash');
var connectionpull = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'bella1995',
	database: 'movies'
});


var app = express();

var index = require('./routes/index');


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
app.use(session({
	//forces session to be saved back to session source
	resave: true,
	//forces session thats unititialized or new to be saved to source
	saveUnititialized: true,
	secret: 'secret session'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
