var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", (req, res) => {
  res.send("Message from Login Route");
});

router.post("/register", (req, res) => {
  res.send("Message from Register Route");
});

module.exports = router;
