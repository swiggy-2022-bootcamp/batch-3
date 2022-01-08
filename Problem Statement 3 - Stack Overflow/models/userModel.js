var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { _id: false }
);

module.exports = mongoose.model("Users", userSchema);
