var express = require("express");
const handleRequest = require("./handleRequest");

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    let products = await handleRequest();
    res.send({ products: JSON.parse(products) });
  } catch (error) {
    res.send({ msg: "Some thing Went Wrong", products: [] });
  }
});

module.exports = router;
