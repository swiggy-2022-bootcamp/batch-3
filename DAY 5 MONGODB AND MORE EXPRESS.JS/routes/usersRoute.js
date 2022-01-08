var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var User = require("../models/user");
const jwt = require("jsonwebtoken");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async function (req, res, next) {
  // Steps to implement Login API:-
  //   1. Get User ID and password from request
  let { email, password } = req.body;
  //   2. Check Existance in DB
  var emailExist = await User.findOne({ email });
  if (!emailExist) {
    res.json({ msg: "User Does not Exist..Please Register" });
  } else {
    const validPass = await bcrypt.compare(
      req.body.password,
      emailExist.password
    );
    if (!validPass) res.status(400).send("Invalid password");
    const token = jwt.sign({ email }, "some secret");
    res.header("auth-token", token).send({ token });
  }
  //   3. Send the success message along with JWT token
});

router.post("/register", async function (req, res, next) {
  console.log(req.body);
  let { fname, lname, email, password } = req.body; // destructuring
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = new User({
    fname,
    lname,
    email,
    password: hashedPassword,
  });

  try {
    var emailExist = await User.findOne({ email });
    console.log("emailExist", emailExist);
    if (emailExist) {
      return res.json({ msg: "User Already Exists" });
    }
    var savedUser = await user.save();
    res.json({ msg: "User added Successfully!", user: savedUser });
  } catch (error) {
    res.json({ msg: "Something went wrong!", error });
  }

  console.log(hashedPassword);
  res.send("respond with a register resource");
});

router.get("/getAllUsers", validateUser, async (req, res) => {
  try {
    var userinfo = await User.find({});
    res.json({ msg: "allUsers success", userinfo });
  } catch (error) {
    console.log(error);
    res.json({ msg: "allUsers failure" });
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
