var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res, next) {
  res.send("StackOverFlow page");
});

router.post("/login", async function (req, res) {
  let { email, password } = req.body;
  console.log("Email", email);

  var emailExists = await User.findOne({ email });
  if (!emailExists) {
    res.json({ msg: "User is Not Registered ..Please Register" });
    //redirect to register
  } else {
    const validpass = await bcrypt.compare(
      req.body.password,
      emailExists.password
    );
    if (!validpass) res.status(400).send("Invalid Password");
    const token = jwt.sign({ email }, "somesecret");
    res.header("auth-token", token).send({ token });
    //redirect to questions dashboard
  }
});

router.post("/register", async function (req, res) {
  let { fname, lname, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let user = new User({ fname, lname, email, password: hashedPassword });

  try {
    var emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({ msg: "User is already here" });
    }
    var savedUser = await user.save();
    console.log(savedUser);
    res.json({ msg: "User added successfully", user: savedUser });
  } catch (err) {
    res.json({ msg: "Something is wrong ", err });
  }
  console.log(hashedPassword);
});

module.exports = router;
