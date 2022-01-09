var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Users", userSchema);
