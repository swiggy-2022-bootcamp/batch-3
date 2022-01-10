var mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: [String],
  },
  email: {
    type: String,
  },
  upvotes: {
    type: Number,
  },
});

module.exports = mongoose.model("Questions", QuestionSchema);
