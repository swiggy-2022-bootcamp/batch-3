var express = require('express');
var router = express.Router();
var bcrypt = require("bcryptjs");
var User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users route to register user*/
router.post('/', async (req, res, next) => {
  try {
    const {userid,password} = req.body
    const registrationName = req.body["registration-name"]
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(registrationName, userid, password, hashedPassword)

    var user = new User({ registrationName, userid, password: hashedPassword});
  
    var userExist = await User.findOne({ userid });
    if (userExist) {
      return res.json({ msg: "User is Already Exist" });
    }
    var saveduser = await user.save();
    res.status(201).send({
      'message' : 'User Registered Successfully',
      'registration-name' : registrationName
    })

  } catch (error) {
      res.json({ msg: "Some thing is wrong " });
      console.log(error);
  }
});

var meetings = [
  {
    "meeting-id" : "abc-devg-hij",
    "date-of-meeting" : "2020-01-20",
    "start-time" : "14:00",
    "end-time" : "14:30",
    "description" : "Sprint Retrospective",
    "email-ids-of-attendees" : "irov@swiggy.com,jolly@swiggy.com,kalashnikov@swiggy.com,lango@swiggy.com"
  },{
    "meeting-id" : "bca-dnsg-shg",
    "date-of-meeting" : "2020-01-07",
    "start-time" : "11:00",
    "end-time" : "12:00",
    "description" : "Daily Scrum Meeting",
    "email-ids-of-attendees" : "eric@swiggy.com,faizal@swiggy.com,greta@swiggy.com,henry@swiggy.com"
  },{
    "meeting-id" : "gem-asdg-asl",
    "date-of-meeting" : "2020-01-20",
    "start-time" : "14:00",
    "end-time" : "14:30",
    "description" : "Sprint Retrospective",
    "email-ids-of-attendees" : "irov@swiggy.com,jolly@swiggy.com,kalashnikov@swiggy.com,lagno@swiggy.com"
  }
]

/* GET all meetings for a user, validate user*/
router.get('/meetings', (req, res, next) => {
  const {userid, password} = req.body
  const meetingId = req.body["meeting-id"]

  if (meetingId != undefined){
    var result = meetings.filter(meeting => meeting['meeting-id'] == meetingId)
    if(result.length != 0){
      res.send(result[0])
    } else {
      res.status(400).send({"message" : "Meeting id doesn’t exist"});
    }
  } else { 
    res.send(meetings)
  }
});


router.delete("/:userId/meetings/:meetingId", (req, res, next) => {
  const {userId, meetingId} = req.params
  console.log(userId, meetingId)

  var result = meetings.filter(meeting => meeting['meeting-id'] == meetingId)
  var person = (result.length == 0) ? null : result[0]['email-ids-of-attendees'].match(userId)
  if(result.length != 0 && person != null){
    res.send({"message" : "You are dropped off from the meeting"})
  } else {
    res.send({"message" : "Meeting id doesn’t exist"})
  }
});

module.exports = router;