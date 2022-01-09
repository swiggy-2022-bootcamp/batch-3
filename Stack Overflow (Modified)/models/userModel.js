var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Users", userSchema);
