// server.js set up which incldues the required files

var express 		= require('express'),
	app				= express(),
	port 			= process.env.PORT || 8080,
	mongoose		= require('mongoose'),
	passport		= require('passport'),
	morgan			= require('morgan'),
	cookieParser	= require('cookie-parser'),
	session			= require('express-session'),
	configDB 		= require('./config/database.js'),
	bodyParser 		= require('body-parser');

//	CONFIG
//	======

mongoose.connect(configDB.url); // connects to the database

require('./config/passport')(passport); //passes in passport for configuration

// set up express application
app.use(morgan('dev')); 
app.use(cookieParser()); //reads cookies which are needed for authentication
app.use(bodyParser.urlencoded({ extended: true})); // gets info from the html form 
app.use(bodyParser.json()); 

app.set('view engine', 'ejs'); //sets up ejs for templating

// passport requirements
app.use(session({ secret: 'supersupersecret' }));
app.use(passport.initialize());
app.use(passport.session()); //persistent login session

// 	ROUTES
//	======
require('./app/routes.js')(app, passport); //loads the routes and passes  in passport

//	LAUNCH
//	======
app.listen(port)
console.log("The magic is happening on port " + port);