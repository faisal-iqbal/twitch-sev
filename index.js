var express  = require('express');
var session  = require('express-session');
var passport = require('./libs/twitchpassport');
var env      = require('dotenv').config();
var routes   = require('./routes');

// Initialize Express and middlewares
var app = express();
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.set('view engine', 'ejs');

const server = require('http').createServer(app);
server.listen(process.env.PORT, function () {
  console.log('Twitch SEV listening on port ' + process.env.PORT)
});