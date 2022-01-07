var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', checkUserInfo, (req, res, next) =>{
  res.send('Hello user!');
});
  
router.post('/register', (req, res)=>{  
  res.send('response from register route');
});

function checkUserInfo(req, res, next){

  console.log(req.body);

  var person = {
    username : 'naman',
    password : 'hoho' 
  };

  if(person.username == req.body.name && person.password == req.body.password)
    next();
  else
    res.send({msg: "Invalid username or password"});

  console.log("Hello from check user info");
}

module.exports = router;
