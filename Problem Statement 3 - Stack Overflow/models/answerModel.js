var mongoose = require("mongoose");

var answerSchema = mongoose.Schema(
  {
    answerID: { type: mongoose.Schema.Types.ObjectId, required: true },
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
  },
  { _id: false }
);

module.exports = mongoose.model("Answers", answerSchema);
