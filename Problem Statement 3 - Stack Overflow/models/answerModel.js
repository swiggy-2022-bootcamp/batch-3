var mongoose = require("mongoose");

var answerSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },

  body: { type: String, required: true },
});

module.exports = mongoose.model("Answers", answerSchema);
