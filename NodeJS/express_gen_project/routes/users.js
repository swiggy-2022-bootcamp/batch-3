var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", checkUserInfo, (req, next, res) => {
  res.send("Hello user .. WELCOME");
});

router.post("/register", (req, res) => {
  res.send("Message from Register Route");
});

function checkUserInfo(req, next, res) {
  console.log(req.body);

  for (const id in usersData) {
    var person = usersData[id];
    if (
      person.userName == req.body.userName &&
      person.password == req.body.password
    ) {
      next();
    }
  }

  console.log("Hello from Check User Info");
}

module.exports = router;
