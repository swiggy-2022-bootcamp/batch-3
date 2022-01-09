var mongoose = require("mongoose");

var questionSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  title: { type: String, required: true },
  body: { type: String },
});

module.exports = mongoose.model("Questions", questionSchema);
