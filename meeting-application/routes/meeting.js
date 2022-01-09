var express = require('express');
var router = express.Router();
var Meeting = require("../models/meetings");
var uuid = require('uuid');


//user creates meeting, ensure user is valid
router.post('/', async (req, res, next) => {
    var userDetails = req.body["user-details"]
    var meeting = req.body.meeting
    var meetingmodel = new Meeting({ 
        meetingid: uuid.v4(),
        dateofmeeting:meeting["date-of-meeting"],
        starttime:meeting["start-time"],
        endtime:meeting["end-time"],
        description:meeting.description,
        emailidsofattendees:meeting["email-ids-of-attendees"]
    });

    console.log(userDetails);
    console.log(meeting);
    

    var savedmeeting = await meetingmodel.save();

    res.status(201).send({
        'message' : 'Meeting Created Successfully',
        'meeting-id' : meetingmodel.meetingid
    });
});

module.exports = router;