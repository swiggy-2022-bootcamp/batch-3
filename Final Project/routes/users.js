var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require("../models/user");
const Mongoose = require('mongoose');
var jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

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

router.post("/authenticate", async function (req, res, next) {
  //1. Get the User ID And password from request
  let { username, password } = req.body;
  //2. Check existance in DB. If User is not Exist , send a message to register
  var usernameExist = await User.find({ username });
  if (!usernameExist) {
    res.json({ msg: "Username not found!" });
  } else {
    //console.log(password);
    //console.log(usernameExist[0].password)
    const validpass = await bcrypt.compare(password, usernameExist[0].password);
    if (!validpass) res.status(403).send("Invalid password");
    const token = jwt.sign({ username }, "somesecret");
    //res.header("auth-token", token).send({ token });
    res.cookie("auth-token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ message: "User logged in Successfully" });
  }
});



module.exports = router;
