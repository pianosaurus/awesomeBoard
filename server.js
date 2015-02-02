/////////////////////
// Package imports //
/////////////////////

var express      = require('express');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');

// Configuration
var configDB     = require('./config/database.js');
var configServer = require('./config/server.js');

///////////
// Setup //
///////////

// Initialise server and set port.
var app = express();

// Connect to MongoDB.
mongoose.connect(configDB.url);

// Set up the express application.
app.use(morgan('dev'));     // Console logging.
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');

// Login/session setup.
app.use(session({
    secret: configServer.sessionSecret
}));
require('./app/passport')(app, passport);
app.use(flash());

// Routes.
require('./app/routes.js')(app, passport, configServer);

////////////
// Launch //
////////////
var port = configServer.listenPort;
app.listen(port);
console.log(configServer.title + ' is listening on port ' + port + '.');
