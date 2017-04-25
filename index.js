'use strict';
//external modules
var express = require('express');
var exphbs = require('express-handlebars');
var assert = require('assert');
var homeData = require('./home.json');

//javascript modules
var greet = require('./views/public/javascript/greet');
var language = require('./views/public/javascript/language');


//express
var app = express();
//var flash = require('express-flash');

//Stacic Files
app.use(express.static('views'));


//init Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//set port
app.set('port', (process.env.PORT || 3000));

//init body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var users = [];
var greeting = "";


app.get('/main', function(req, res) {
  res.render('index', homeData.content);
});

app.get('/greetings/:id', function(req, res, next) {
    var name = req.params.id;
 
    res.render('greeting', {language: greeting, userName: name})
});

app.get('/greeted', function(req, res, next) {
  
    if (users.length == 0) {
        res.render('./greetedList', {error: 'No users Found'});
    } else {
        res.render('./greetedList', {output: users}); 
    }
});

app.post('/submit', function(req, res, next) {
  
    var name = req.body.name;
    var radio = req.body.language;
    
    
    if (name === "") {
    //console.log('please enter a name');
    } else {
    users = greet.greetUser(name);        
    greeting = language(radio);
    res.redirect('/greetings/' + name);   
    }
});    

app.get('/counter/:name', function(req, res, next){
    var name = req.params.name;
    
    var greetNum = greet.nameList(name);
    
    res.render('counter', {userName: name, counter: greetNum})
});

app.listen(3000, function() {
   console.log('frontend server running at ::3000'); 
});