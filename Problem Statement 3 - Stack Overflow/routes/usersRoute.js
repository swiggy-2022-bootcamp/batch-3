var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = require("../models/userModel");
var Question = require("../models/questionModel");

var router = express.Router();

// ---------------------------------ROUTES-------------------------------------------

// req.body has parameters {name,username,password}
router.post("/register", async function (req, res, next) {
  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  let user = new User({
    ...req.body,
    password: hashedPassword,
  });

  try {
    var userExist = await User.findOne({ username: req.body.username });
    if (userExist) {
      return res
        .status(400)
        .json({ msg: "User already exists", user: userExist });
    }

    var savedUser = await user.save();
    res.status(201).json({
      message: "User Registered Successfully",
      "registration-name": req.body.name,
    });
  } catch (error) {
    res.status(400).json({ msg: "Some error occured", error });
  }
});

// req.body has parameters {username, password}
router.post("/login", userValidator, function (req, res, next) {
  const token = jwt.sign({ username: req.body.username }, "123");
  res
    .header("auth-token", token)
    .status(200)
    .send({ msg: "User Logged in Successfully", token });
});

// req.body has parameters {username, password, question }
router.post("/question", userValidator, async function (req, res) {
  const { question } = req.body;
  const user = await User.findOne({ username: req.body.userdetails.username });
  const newquestion = new Question({ ...question, userID: user._id });

  console.log(question);
  try {
    await newquestion.save();
    res.status(201).json({
      message: "Question posted successfully",
      questionID: newquestion._id,
    });
  } catch (error) {
    res.status(400).json({ message: "There was a problem!", error });
  }
});

// --------------------------------MIDDLEWARE------------------------------------------

// this middleware validates username and password
async function userValidator(req, res, next) {
  var { userdetails, username, password } = req.body;

  // if userdetails is present in body, then the request is coming
  // from question route else it is coming from login route.
  if (userdetails) {
    ({ username, password } = userdetails);
  }

  // check if the user exists
  var userExist = await User.findOne({ username });
  if (!userExist) {
    return res.status(401).json({ message: "User does not exist" });
  } else {
    // if user exists then check if password is correct
    const validpass = await bcrypt.compare(password, userExist.password);
    if (!validpass) {
      return res.status(401).send({ message: "Password is invalid" });
    }

    // if password is correct then proceed to next()
    next();
  }
}

module.exports = router;
