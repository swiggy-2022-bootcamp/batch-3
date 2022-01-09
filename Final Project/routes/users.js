var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require("../models/user");
const Mongoose = require('mongoose');
var jwt = require("jsonwebtoken");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", async function (req, res, next) {
  let { _id, username, email, password, address } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = new User({ _id, username, email, password: hashedPassword, address });
  try {
    var idExist = await User.findOne({ _id });
    if (idExist) {
      return res.json({ msg: "ID is already used." });
    }
    var emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({ msg: "Email-ID already used." });
    }
    var usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.json({ msg: "Username already used." });
    }
    var saveduser = await user.save();
    res.status(201).json(saveduser);
  } catch (error) {
    res.json({ msg: "Failed to register!", error });
  }
});


module.exports = router;
