var express = require('express');
var router = express.Router();
var axios = require('axios')
var User = require("../models/user");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', async (req, res, next) => {
  const response = await axios.get('https://catfact.ninja/fact');
  res.render('index', { 
    title: 'Meeting Application Project', 
    cat_fact: response.data.fact
  });
});

/* GET route to login */
router.post('/login', async (req, res, next) => {
  const {userid, password} = req.body
  console.log(userid, password)
  var userExist = await User.findOne({ userid });
  
  if (!userExist) {
    res.status(401).send({ "message" : "User is Not Registered" });
    return;
  }

  var validpass = await bcrypt.compare(req.body.password, userExist.password);

  if(validpass){ 
    const token = jwt.sign({ userid }, "somesecret");
    res.status(201).send({
      "message" : "Logged In Successfully",
      "token" : token
    })
  } else {
    res.status(401).send({"message" : "Invalid Userid or Password"})
  }
});

module.exports = router;