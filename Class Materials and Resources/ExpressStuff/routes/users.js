var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", checkUser, (req, res, next) => {
  res.send(`Hello ${req.body.userName} ... Hope you have a great day`);
});

router.post("/register", (req, res) => {
  res.send("Hello from register");
});

function checkUser(req, res, next) {
  console.log(req.body);
  var person = {
    userName: "Virang",
    password: "Virang",
  };
  if (
    person.userName == req.body.userName &&
    person.password == req.body.password
  ) {
    next();
  } else {
    res.send({ msg: "User is Invalid ... Check Credentials" });
  }
  console.log("Hello from checkUser");
}

module.exports = router;
