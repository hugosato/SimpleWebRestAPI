var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var index = require('./index');
var smallshop = require('./controllers/smallshop');
var fs = require('fs');
var rotatingLogStream = require('file-stream-rotator');

var app = express();

// logging setup
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// create a rotating write stream
var accessLogStream = rotatingLogStream.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: "YYYY-MM-DD"
});

// Request filters
app.use(
    favicon(__dirname + '/public/favicon.ico'),
    logger('combined', {stream: accessLogStream}),    // 'default', 'short', 'tiny', 'dev'
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser());

// Public resources with static content
app.use(express.static(path.join(__dirname, 'public')));

// Custom endpoints controllers.
// These controllers must not forward the request to next filter otherwise it will reach 404.

app.use('/', index);
app.use('/smallshop', smallshop);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
if (app.get('env') === 'prod') {
  // Do not leak private info in response
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
} else {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
