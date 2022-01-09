var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var dbConnect = require("./database/connect");
require("dotenv").config();

// importing custom routes
var homeRoutes = require("./routes/homeRoutes");
var userRoutes = require("./routes/userRoutes");
var foodRoutes = require("./routes/foodRoutes");

const app = express();

// setup mongoose connection
dbConnect();

// app configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// custom routes
app.use("/", homeRoutes);
app.use("/api/", userRoutes);
app.use("/api/", foodRoutes);

// last route used if invalid route is reached
app.use((req, res, next) => {
  const error = new Error("Route not found!");
  error.status = 404;
  // forward to error handling route
  next(error);
});

// route for handling all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
