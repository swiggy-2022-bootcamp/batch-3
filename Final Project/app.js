const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// import routes
const userRoute = require('./routes/userRoutes');
const questionRoute = require('./routes/questionRoutes');
const errorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

//app
const app = express();

// cors enable
app.use(cors());
app.options('*', cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/', userRoute);
app.use('/', questionRoute);

//Handling remaining routes that doesn't exsists --- 404 Not Found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//global error handler
app.use(errorHandler);

module.exports = app;
