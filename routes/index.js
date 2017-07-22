var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var mysql = require('mysql');
var Sequelize = require('sequelize');
var Movies = require('../models/movie');
var Directors = require('../models/director')
var connection = new Sequelize('movies','root', 'bella1995', {
	dialect: 'mysql'
});
var connectionpull = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'bella1995',
	database: 'movies'
});

var csrfProtection = csrf();
router.use(csrfProtection);


/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {title: "Title", message: "Hello World"});

});

router.get('/add', function (req, res, next) {
	res.render('main/add', {csrfToken: req.csrfToken()});
});

router.post('/add', function (req, res, next) {
	var Movies = connection.define('movies', {
	mid:   Sequelize.DOUBLE,
	mname: Sequelize.STRING,
	mdate: Sequelize.TEXT,
	mdirector: Sequelize.TEXT,
	mgenre: Sequelize.STRING,
	mcover: Sequelize.TEXT,
	mrating: Sequelize.DOUBLE

	});

	connection.sync().then(function() {
		Movies.create({
			mid:    req.body.mid,
			mname: req.body.mname,
			mdate: req.body.mdate,
			mdirector: req.body.mdirector,
			mgenre: req.body.mgenre,
			mcover: req.body.mcover,
			mrating: req.body.mrating
		});
	});

	res.redirect('back');

});

router.get('/movies', function(req, res, next) {
	var mid = '0';
	connectionpull.query('select * from movies where mid >' + mid, function(err, result) {
	var allmovies = result;
	console.log(allmovies);

	res.render('main/movies',{allmovies:allmovies});
	});
});

router.get('/movie/:mid', function(req, res, next) {
	var mid = req.params.mid;
	connectionpull.query('select * from movies where mid =' + mid, function(err, result) {
	var allmovies = result;
	console.log(allmovies);

	res.render('main/movie',{allmovies:allmovies});
	});
});

// DIRECTORS CREATE AND FILL DECLERATIONS


router.get('/add2', function (req, res, next) {
	res.render('main/add2', {csrfToken: req.csrfToken()});
});

router.post('/add2', function (req, res, next) {
	var Directors = connection.define('directors', {
	did: Sequelize.DOUBLE,
	dname: Sequelize.STRING,
	ddate: Sequelize.TEXT,
	dcover: Sequelize.TEXT,
	drating: Sequelize.DOUBLE 

	});

	connection.sync().then(function() {
		Directors.create({
			did:   req.body.did,
			dname: req.body.dname,
			ddate: req.body.ddate,
			dcover: req.body.dcover,
			drating: req.body.drating
		});
	});

	res.redirect('back');

});


router.get('/directors', function(req, res, next) {
	var did = '0';
	connectionpull.query('select * from directors where did >' + did, function(err, dirresult) {
	var alldirectors = dirresult;
	console.log(alldirectors);

	res.render('main/directors',{alldirectors:alldirectors});
	});
});

router.get('/director/:did', function(req, res, next) {
	var did = req.params.did;
	connectionpull.query('select * from directors where did =' + did, function(err, dirresult) {
	var alldirectors = dirresult;
	console.log(alldirectors);

	var x = 'mdirector'=='dname';

	connectionpull.query('select * from movies where mdirector= ' + x, function(err,result)
	{
			var directormovies= result;
			console.log(directormovies);

	});
	res.render('main/director',{alldirectors:alldirectors});
	});
});

// END OF DIRECTORS SECTION


//START OF BLACKLIST TABLE DECLERATION

router.get('/add3', function (req, res, next) {
	res.render('main/add3', {csrfToken: req.csrfToken()});
});

router.post('/add3', function (req, res, next) {
	var Blacklists = connection.define('blacklists', {
	bid: Sequelize.DOUBLE,
	bname: Sequelize.STRING,
	bdirector: Sequelize.STRING,
	bgenre: Sequelize.STRING,
	bcover: Sequelize.TEXT,

	});

	connection.sync().then(function() {
		Blacklists.create({
			bid:   req.body.bid,
			bname: req.body.bname,
			bdirector: req.body.bdirector,
			bgenre: req.body.bgenre,
			bcover: req.body.bcover,
		});
	});

	res.redirect('back');

});


router.get('/blacklists', function(req, res, next) {
	var bid = '0';
	connectionpull.query('select * from blacklists where bid >' + bid, function(err, result) {
	var allblacklist = result;
	console.log(allblacklist);

	res.render('main/blacklists',{allblacklist:allblacklist});
	});
});

router.get('/blacklist/:bid', function(req, res, next) {
	var bid = req.params.bid;
	connectionpull.query('select * from blacklists where bid =' + bid, function(err, result) {
	var allblacklist = result;
	console.log(allblacklist);

	res.render('main/blacklist',{allblacklist:allblacklist});
	});
});



router.get('/genres', function(req, res, next) {
  res.render('main/genres', { title: 'Express' });
});


router.get('/signup', function(req, res, next) {
  res.render('main/signup', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
  res.render('main/signin', { title: 'Express' });
});

router.get('/genre/:mgenre', function(req, res, next) { 
	var genre=req.params.mgenre;
	var mgenre= "'%" + genre + "%'";
	connectionpull.query('select * from movies where mgenre LIKE' + mgenre, function(err, results) {
	var allgenre = results;
	console.log(allgenre);

	res.render('main/genre',{allgenre:allgenre});
	});
});



module.exports = router;
