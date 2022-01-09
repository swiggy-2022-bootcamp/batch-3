var express = require('express');
var router = express.Router();
var bcrypt = require("bcryptjs");
var User = require("../models/user");
var Meeting = require("../models/meetings");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST route to register user and save data to DB*/
router.post('/', async (req, res, next) => {
  try {
    const {userid,password} = req.body
    const registrationName = req.body["registration-name"]

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(registrationName, userid, hashedPassword)

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

/* GET route,
   If meeting id is given, return meeting details
   If meeting id is not given, return all meetings for user
*/
router.get('/meetings', async (req, res, next) => {
  try{
    const {userid} = req.body
    const meetingId = req.body["meeting-id"]

    if (meetingId != undefined){ 
      var meeting = await Meeting.findOne({ meetingId });
      if(meeting != undefined){
        res.status(200).send(meeting)
      } else {
        res.status(400).send({"message" : "Meeting id doesn’t exist"});
      }
    } else { 
      var meetings = await Meeting.find({ emailidsofattendees: {$regex : userid}})
      res.status(200).send(meetings)
    }
  }catch (err) {
    res.status(400).send({message: "Something went wrong"})
    console.log(err)
  }
});


/* DELETE route to remove user from meeting */
router.delete("/:userId/meetings/:meetingId", async (req, res, next) => {
  try{
    const {userId, meetingId} = req.params
    console.log(userId, meetingId)

    var meeting = await Meeting.findOne({ meetingId });

    if(meeting == undefined){
      res.status(400).send({"message" : "Meeting id doesn’t exist"})
      return;
    }

    var old_emailidsofattendees = meeting.emailidsofattendees.split(",");
    var new_emailidsofattendees = old_emailidsofattendees.filter(email => email != userId).toString()

    await Meeting.updateOne(
      {meetingid: meeting.meetingid}, 
      {$set: {emailidsofattendees: new_emailidsofattendees}}
    )

    res.status(200).send({"message" : "You are dropped off from the meeting"})
  } catch(err) {
    res.status(400).send({"message" : "Something went wrong"})
  }
});

module.exports = router;