var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users route to register user*/
router.post('/', (req, res, next) => {

  var {userid,password} = req.body
  var registrationName = req.body["registration-name"]

  console.log(registrationName, userid, password)
  
  res.status(201).send({
    'message' : 'User Registered Successfully',
    'registration-name' : `${registrationName}`
  })
});

module.exports = router;
