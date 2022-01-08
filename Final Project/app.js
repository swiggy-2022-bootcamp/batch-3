const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
// import routes
const userRoute = require('./routes/userRoutes');
const questionRoute = require('./routes/questionRoutes');
const errorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

//app
const app = express();
// Global Middleware------------------------------------------------

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/', limiter);

// cors enable
app.use(cors());
app.options('*', cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body-parser, cookieparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Routes
app.use('/', userRoute);
app.use('/question', questionRoute);

//Handling remaining routes that doesn't exsists --- 404 Not Found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//global error handler
app.use(errorHandler);

module.exports = app;
