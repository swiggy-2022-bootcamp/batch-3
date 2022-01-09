const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello swiggy-ipp");
});

module.exports = router;
