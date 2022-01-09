var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/usersRoute");
var questionsRouter = require("./routes/questionsRoute");
var answersRouter = require("./routes/answersRoute");
// database dependency
var mongoose = require("mongoose");
let db_url =
  "mongodb+srv://yogirajgutte:yogirajgutte@cluster0.y4mvw.mongodb.net/StackOverflow?retryWrites=true&w=majority";

var app = express();

// database connection
mongoose.connect(db_url, () => {
  console.log("Database connected.");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);
app.use("/question", questionsRouter);
app.use("/answer", answersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
