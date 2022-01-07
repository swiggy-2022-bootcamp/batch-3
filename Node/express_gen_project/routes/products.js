var express = require('express');
var request = require('request');
const handleRequest = require('./handleRequests');

var router = express.Router();

/* GET users listing. */
router.get("/", async function(req, res, next) {

  try{
    let products = await handleRequest();
    res.send({products: JSON.parse(products)});
  }
  catch(error){
    res.send({msg: "Something went wrong", products: [] });
  }

});

module.exports = router;
