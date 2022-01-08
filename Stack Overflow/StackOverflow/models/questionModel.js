var mongoose = require("mongoose");
//var UserModel = require("./userModel");

var QuestionScheme = mongoose.Schema({
  userDetails: {
    type: mongoose.Schema.Type.ObjectID,
    ref: "UserModel",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "QuestionModel",
  QuestionScheme,
  "QuestionModel"
);
