"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const hbs = require('express-handlebars');
app.engine('hbs', hbs({
    defaultLayout: 'layout.hbs',
    extname: '.hbs',
    helpers: {
        json(obj) {
            return obj ? JSON.stringify(obj) : '{}';
        },
    },
    layoutsDir: 'views',
}));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/lastfm', lastfm);
app.use('/api', api);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            error: err,
            message: err.message,
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        error: {},
        message: err.message,
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map