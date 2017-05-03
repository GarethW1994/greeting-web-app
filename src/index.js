'use strict';
//external modules
var express = require('express');
var exphbs = require('express-handlebars');
var assert = require('assert');
var homeData = require('../home.json');
var greeting = "";

//javascript modules
var greet = require('../views/public/javascript/greet');
var language = require('../views/public/javascript/language');

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

const mongoURL = process.env.MONGO_DB_URL || "mongodb://GarethW:ninja12345@ds129281.mlab.com:29281/greeting_users";

mongoose.connect(mongoURL);

//Create mongoose Schema
var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	language: {
		type: Object
	},
	timesGreeted: {
	type: Number
	}
});

userSchema.index({name: 1}, {unique: true});


//Creae mongoose model
var users= mongoose.model('users', userSchema);













app.get('/', function(req, res) {
  res.render('index', homeData.content);
});



var thisLanguage = "";

app.get('/greetings/:name', function(req, res, next) {
    var thisName = "";
	
	var id = req.params.name;
	
	users.find({name: id}, function(err, data) {
		if (err) throw err;		
	
		thisName = data[0].name;

		res.render('greeting', {language: thisLanguage, userName: thisName})	
	}); 
});




app.get('/greeted', function(req, res, next) {
	var names = [];
	
	users.find({}, function(err, data) {
		assert.equal(null, err);
	
		for (var i = 0; i < data.length; i++) {
			names.push(data[i].name);	
		}
		
		res.render('./greetedList', {output: names}); 
	});
});




app.post('/submit', function(req, res, next) {
	var userName = req.body.name;
	var radio = req.body.language;
	var lang = language(radio);
	var languages = [];
	
	thisLanguage = lang;

	languages.push(radio);
	

	users.update({name: userName}, {
				name: userName,
				language: languages,
				timesGreeted: 2
		
		}, function(err, updates) {
			console.log(updates);
		});
	
			var user = users({
				name: userName,
				language: JSON.stringify(languages),
				timesGreeted: 1
			}).save( function(err) {
								
			if (err === null) {
			console.log('user saved successfully');		
			} else {
				if (err) return err;
				
				console.log('user already exist in databse!');
			}
		});
		
			res.redirect('/greetings/' + userName);

	});   




app.get('/counter/:name', function(req, res, next){
	
	////needs to be fixed
	
    var thisName = req.params.name;
    
	var userList = greet.greetUser(thisName);
	
    var greetNum = greet.nameList(userList);
    
    res.render('counter', {userName: thisName, counter: greetNum})
});




app.listen(port, function() {
   console.log('frontend server running at http://greeting-web-app:'+ port + '/'); 
});