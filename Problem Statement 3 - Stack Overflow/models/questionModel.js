var mongoose = require("mongoose");

var questionSchema = mongoose.Schema(
  {
    questionID: { type: mongoose.Schema.Types.ObjectId, required: true },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    title: { type: String, required: true },
    body: { type: String },
  },
  { _id: false }
);

module.exports = mongoose.model("Questions", questionSchema);
