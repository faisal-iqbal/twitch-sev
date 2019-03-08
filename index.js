var express  = require('express');
var session  = require('express-session');
var passport = require('./libs/twitchpassport');
var env      = require('dotenv').config();
var routes   = require('./routes');

// Initialize Express and middlewares
var app = express();
app.use(function (req, res, next) {
  var data = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    req.body = data;
    next();
  });
});
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

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', client => {
  console.log('socket client connected')
  client.on('webhook', data => {
    console.log('got event from webhook:', data);
    io.emit('webhook', data);
  });
  client.on('disconnect', () => {
    console.error('socket client disconnected')
  });
});

server.listen(process.env.PORT, function () {
  console.log('Twitch SEV listening on port ' + process.env.PORT)
});