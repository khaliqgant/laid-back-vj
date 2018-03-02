import { Request, Response } from 'express';

require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const lastfm = require('./routes/lastfm');
const api = require('./routes/api');

const app = express();

const rollbar = require('rollbar');

rollbar.init(process.env.ROLLBAR_KEY);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
const hbs = require('express-handlebars');

app.engine(
  'hbs',
  hbs({
    defaultLayout: 'layout.hbs',
    extname: '.hbs',
    helpers: {
      json(obj: any) {

        return obj ? JSON.stringify(obj) : '{}';

      },
    },
    layoutsDir: 'views',
  }),
);

app.set('view engine', 'hbs');

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

  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);

});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use((err: any, req: Request, res: Response, next: Function) => {

    res.status(err.status || 500);
    res.render('error', {
      error: err,
      message: err.message,
    });

  });

}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: Function) => {

  res.status(err.status || 500);
  res.render('error', {
    error: {},
    message: err.message,
  });

});

// handle any uncaught
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', (error: Error, promise: any) => {

  // eslint-disable-next-line no-console
  console.error('error', 'Unhandled Rejection from a promise', error);
  // eslint-disable-next-line no-console
  console.error(promise);

});

app.listen(process.env.PORT || '3000');

module.exports = app;
