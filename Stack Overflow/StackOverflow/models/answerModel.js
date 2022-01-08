var mongoose = require("mongoose");

var AnswerScheme = mongoose.Schema({
  userDetails: {
    type: mongoose.Schema.Type.ObjectID,
    ref: "UserModel",
  },
  questionDetails: {
    type: mongoose.Schema.Type.ObjectID,
    ref: "QuestionModel",
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AnswerModel", AnswerScheme, "AnswerModel");
