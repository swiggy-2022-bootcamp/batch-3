var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = require("../models/userModel");

var router = express.Router();

// ---------------------------------ROUTES-------------------------------------------

// register new user
router.post("/register", userExists, async (req, res, next) => {
  const input = req.body;
  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(input.password, salt);
  // create new user
  var user = new User({ ...input, password: hashedPassword });

  // save new user
  try {
    await user.save();
    res.status(201).json({
      message: "User Registered Successfully",
      username: input.username,
    });
  } catch (error) {
    res.status(500).json({ msg: "Some error occured", error });
  }
});

//
//
// login existing user
router.post("/login", userValidator, async (req, res) => {
  // create new jwt token
  const token = jwt.sign({ email: req.body.email }, "mySecretKey", {
    expiresIn: "10h",
  });

  res
    .header("auth-token", token)
    .status(200)
    .send({ msg: "User Logged in Successfully" });
});

//
//
// --------------------------------MIDDLEWARE------------------------------------------

// this middleware checks if username or email already exists
async function userExists(req, res, next) {
  const input = req.body;
  // check if email already exists
  try {
    var user = await User.findOne({ email: input.email });
    if (user) {
      return res.status(400).json({
        message: "ERROR: Email already being used by another user!",
        email: input.email,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Some error occured!", error });
  }

  // check if username already exists
  try {
    var user = await User.findOne({ username: input.username });
    console.log(user);
    if (user) {
      return res.status(400).json({
        message: "ERROR: Username already being used by another user!",
        email: input.username,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Some error occured!", error });
  }

  // if everything is fine proceed to next
  next();
}

//
//
// this middleware validates user credentials
async function userValidator(req, res, next) {
  var { email, password } = req.body;

  var user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "User does not exist. Please register.", email });
  } else {
    // if user exists then check if password is correct
    const validpass = await bcrypt.compare(password, user.password);
    if (!validpass) {
      return res.status(401).send({ message: "Password is invalid" });
    }
  }

  // credentials are correct proceed to next
  next();
}

module.exports = router;
