var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');




var routes = require('./routes/index');
var users = require('./routes/users');
var adam = require('./routes/adam');
var rayan = require('./routes/rayan');
var karim = require('./routes/karim');
var marouan = require('./routes/marouan');
var amine = require('./routes/amine');
var api = require('./routes/api');
var addparents = require('./routes/addparents');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/adam', adam);
app.use('/rayan', rayan);
app.use('/karim', karim);
app.use('/marouan', marouan);
app.use('/amine', amine);
app.use('/api', api);
app.use('/addparents', addparents);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  var info = req.body.name;
  err.status = 404;
  res.render('error', { error: err, info: info });
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
