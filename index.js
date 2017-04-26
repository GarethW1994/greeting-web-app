'use strict';
//external modules
var express = require('express');
var exphbs = require('express-handlebars');
var assert = require('assert');
var homeData = require('./home.json');

//javascript modules
var greet = require('./views/public/javascript/greet');
var language = require('./views/public/javascript/language');

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
const mongoURL = process.env.MONGO_DB_URL || "'mongodb://localhost/test'";
//

var users = [];
var greeting = "";


app.get('/', function(req, res) {
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

app.listen(port, function() {
   console.log('frontend server running at http://greeting-web-app:'+ port + '/'); 
});