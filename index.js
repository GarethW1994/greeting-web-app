'use strict';
//external modules
var express = require('express');
var exphbs = require('express-handlebars');
var assert = require('assert');
var homeData = require('./home.json');
var greeting = "";

//javascript modules
var greet = require('./views/public/javascript/greet');
var language = require('./views/public/javascript/language');
var model = require('./models');

var port = process.env.PORT || 4000;

//express
var app = express();
//var flash = require('express-flash');

//Stacic Files
app.use(express.static('views'));


//init Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//init body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//linking to mongo
var mongoose = require('mongoose');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greeting_users";

var Models = model(mongoURL);

var numberUsers = 0;

app.get('/', function(req, res) {
	Models.users.find({}, function(err, data) {
		if (err) return err;

		numberUsers = data.length;

		res.render('index', {counter : numberUsers});
	});

});


var thisLanguage = "";

app.get('/greetings/:name', function(req, res, next) {
    var thisName = "";

	var id = req.params.name;

	Models.users.find({name: id}, function(err, data) {
		if (err) throw err;

		thisName = data[0].name;

		res.render('greeting', {language: thisLanguage, userName: thisName, counter: numberUsers});
	});
});


app.get('/greeted', function(req, res, next) {
	var names = [];

	Models.users.find({}, function(err, data) {
		assert.equal(null, err);

		for (var i = 0; i < data.length; i++) {
			names.push(data[i].name);
		}

		//var counter  = findUsers();


		//res.render('./greetedList', homeData.content);
		res.render('./greetedList', {output: names, counter: numberUsers});
	});
});


app.post('/submit', function(req, res, next) {
	var userName = req.body.name;
	var radio = req.body.language;
	var lang = language(radio);
	var languages = [];

	thisLanguage = lang;

			var user = Models.users({
				name: userName,
				language: radio,
				timesGreeted: 1
			}).save( function(err) {

				if (err) {
					Models.users.find({name: userName}, function(err, data) {
						if (err) {return err};


			Models.users.update({name: data[0].name}, {timesGreeted: data[0].timesGreeted + 1}, function(err, result) {
					if (err) return err;

					console.log(result);
					});
				});

			next(err);
		}
	});

	res.redirect('/greetings/' + userName);
});




app.get('/counter/:name', function(req, res, next){
  var thisName = req.params.name;

	Models.users.find({name: thisName}, function(err, data) {
   		if (err) {return err};
		res.render('counter', {userName: data[0].name, counter: data[0].timesGreeted})
	});
});


app.get('/deleteUsers', function(req, res, next) {
	Models.users.remove({}, function(err, result) {
		if (err) return err;
	});

	res.redirect('/');
});

app.listen(port, function() {
   console.log('frontend server running at http://greeting-web-app:'+ port + '/');
});
