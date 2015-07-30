'use strict';
/////////////////////
// Package imports //
/////////////////////

var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var MongoStore = require('connect-mongo')(session);

// Configuration
var configDB = require('./config/database');
var configServer = require('./config/server');

///////////
// Setup //
///////////

// Initialise server and set port.
var app = express();

// Compress all requests.
app.use(compression());

// Connect to MongoDB.
mongoose.connect(configDB.url);

// Set up the express application.
app.use(morgan('dev')); // Console logging
app.use(cookieParser());
app.use(bodyParser.urlencoded({ // Parse application/x-www-form-urlencoded
	extended: false
}));
app.use(bodyParser.json()); // Parse application/json

// Login/session setup.
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: configServer.sessionSecret,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}));
require('./app/passport')(app, passport);

// Routes.
app.use(express.static(__dirname + '/public'));
require('./app/routes')(app, passport, configServer);

// Set up sockets and events.
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('./app/sockets')(io);

////////////
// Launch //
////////////
var port = configServer.listenPort;
server.listen(port); // Must use server.listen instead of app.listen for socket.IO to work.
console.log(configServer.title + ' is listening on port ' + port + '.');
