var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users route to register user*/
router.post('/', (req, res, next) => {

  const {userid,password} = req.body
  const registrationName = req.body["registration-name"]

  console.log(registrationName, userid, password)

  res.status(201).send({
    'message' : 'User Registered Successfully',
    'registration-name' : `${registrationName}`
  })
});

/* GET all meetings for a user, validate user*/
router.get('/meetings', (req, res, next) => {
  const {userid, password} = req.body

  var meetings = [
    {
      "date-of-meeting" : "2020-01-20",
      "start-time" : "14:00",
      "end-time" : "14:30",
      "description" : "Sprint Retrospective",
      "email-ids-of-attendees" : "irov@swiggy.com,jolly@swiggy.com,kalashnikov@swiggy.com,lango@swiggy.com"
    },{
      "date-of-meeting" : "2020-01-07",
      "start-time" : "11:00",
      "end-time" : "12:00",
      "description" : "Daily Scrum Meeting",
      "email-ids-of-attendees" : "eric@swiggy.com,faizal@swiggy.com,greta@swiggy.com,henry@swiggy.com"
    },{
      "date-of-meeting" : "2020-01-20",
      "start-time" : "14:00",
      "end-time" : "14:30",
      "description" : "Sprint Retrospective",
      "email-ids-of-attendees" : "irov@swiggy.com,jolly@swiggy.com,kalashnikov@swiggy.com,lagno@swiggy.com"
    }
  ]

  res.send({meetings})
})

module.exports = router;
