var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", checkUserInfo, (req, res) => {
  res.send("Hello user .. WELCOME");
});

router.post("/register", (req, res) => {
  res.send("Message from Register Route");
});

function checkUserInfo(req, res) {
  console.log(req.body)
  var person = {
    userName: "Prateek",
    password: "Prateek",
  };
  if (person.userName == req.body.userName && person.password == req.body.password) {
    next()
  } else {
    res.send({ msg: "User is Invalid .. Please check the Credentials" })
  }
  console.log("Hello from Check User Info");
}

module.exports = router;
