var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var User = require("../models/user");
const e = require("express");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async function (req, res, next) {
  //1. Get the User ID And password from request
  let { email, password } = req.body;
  console.log("Email", email);
  //2. Check existence in DB. If user does not exist , send a message to register
  var emailExist = await User.find({ email });
  if (!emailExist) {
    res.json({ msg: "User is Not Registered ..Please Register" });
  } else {
    const validpass = await bcrypt.compare(
      req.body.password,
      emailExist.password
    );
    if (!validpass) res.status(400).send("Invalid password");
    const token = jwt.sign({ email }, "somesecret");
    res.header("auth-token", token).send({ token });
  }
});

router.post("/register", async function (req, res, next) {
  let { fname, lname, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = new User({ fname, lname, email, password: hashedPassword });
  try {
    var emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({ msg: "User is Already Exist" });
    }
    var saveduser = await user.save();
    res.json({ msg: "User Added Successfully", user: saveduser });
  } catch (error) {
    res.json({ msg: "Some thing is wrong ", error });
  }
});

router.get("/getAllUsers", validateUser, async (req, res) => {
  try {
    var userinfo = await User.find({});
    res.json({ msg: "allUsers success", userinfo })
  } catch (error) {
    console.log(error)
    res.json({ msg: "allUsers failure" })
  }
});

function validateUser(req, res, next) {
  let jwtToken = req.headers.authorization.split(" ")[1];
  jwt.verify(jwtToken, "somesecret", (err, result) => {
    if (result) {
      next();
    } else {
      res.json({ msg: "Login Failed ....." });
    }
  });

}
module.exports = router;