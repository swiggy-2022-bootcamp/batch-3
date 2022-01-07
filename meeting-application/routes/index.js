var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const response = await axios.get('https://catfact.ninja/fact');
  res.render('index', { 
    title: 'Meeting Application Project', 
    cat_fact: `${response.data.fact}`
  });
});

var userids = ['ram@success.com'] //THIS IS TEMPORARY, THIS WILL COME FROM DB
router.post('/login', (req, res, next) => {
  const {userid, password} = req.body
  console.log(userid, password)

  if(userids.findIndex(element => element == userid) >= 0){ //THIS IS TEMPORARY, MAKE DB CALL TO CHECK
    res.status(201).send({"message" : "Logged In Successfully"})
  } else {
    res.status(401).send({"message" : "Invalid Userid or Password"})
  }
});

module.exports = router;
