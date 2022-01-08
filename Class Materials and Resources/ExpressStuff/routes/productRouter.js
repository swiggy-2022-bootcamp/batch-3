var express = require("express");
var handleRequest = require("./handleRequest");

var router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    let products = await handleRequest();
    res.send({ products: JSON.parse(products) });
  } catch (error) {
    res.send({ msg: "Something went wrong, Please try again", products: [] });
  }
});

module.exports = router;
