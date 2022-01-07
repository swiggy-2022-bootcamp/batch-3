var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async function (req, res, next) {
  let { email, password } = req.body;
  var emailExist = await User.findOne({ email });
  // check if the user exists
  if (!emailExist) return res.json({ msg: "User does not exist" });
  else {
    // if user exists then check if password is correct
    const validpass = await bcrypt.compare(password, emailExist.password);
    if (!validpass) res.status(400).send({ msg: "Password is invalid" });

    // if password is correct then send jwt token
    const token = jwt.sign({ email }, "some secret");
    res.header("auth-token", token).send({ msg: "Welcome", token });
  }
});

router.post("/register", async function (req, res, next) {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let user = new User({ ...req.body, password: hashedPassword });

  try {
    var emailExist = await User.findOne({ email });
    console.log(emailExist);
    if (emailExist) {
      return res.json({ msg: "User already exists" });
    }

    var savedUser = await user.save();
    res.json({ msg: "User added successfully", user: savedUser });
  } catch (error) {
    res.json({ msg: "Some error occured", error });
  }
});

module.exports = router;
