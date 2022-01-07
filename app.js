var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { errorHandler } = require('./middlewares/errorHandler');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/question');
var app = express();

require('dotenv').config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./config/database')
require('./models/index');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/question', questionRouter);
app.use(errorHandler);
module.exports = app;
