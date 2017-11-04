import { Request, Response } from 'express';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const lastfm = require('./routes/lastfm');
const api = require('./routes/api');
const app = express();

const config = require('./config.json');
const rollbar = require('rollbar');

rollbar.init(config.rollbar);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
let hbs = require('express-handlebars');

app.engine(
  'hbs',
  hbs({
    extname: '.hbs',
    defaultLayout: 'layout.hbs',
    layoutsDir: 'views',
    helpers: {
      json: function(obj: any) {
        return obj ? JSON.stringify(obj) : '{}';
      }
    }
  })
);

app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/lastfm', lastfm);
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: Function) => {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err: any, req: Request, res: Response, next: Function) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: Request, res: Response, next: Function) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
