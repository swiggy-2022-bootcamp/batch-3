var express = require('express');
var router = express.Router();
var Meeting = require("../models/meetings");
var uuid = require('uuid');


/* POST route to create meeting for a user */
router.post('/', async (req, res, next) => {
    try{
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

    } catch (err) {
        res.status(400).send({
            'message' : 'Something went wrong'
        });
    }
});


module.exports = router;