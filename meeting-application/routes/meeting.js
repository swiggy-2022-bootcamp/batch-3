var express = require('express');
var router = express.Router();

//user creates meeting, ensure user is logged in
router.post('/', function(req, res, next) {
    var userDetails = req.body["user-details"]
    var meeting = req.body.meeting

    console.log(userDetails)
    console.log(meeting)
    
    res.status(201).send({
        'message' : 'Meeting Created Successfully',
        'meeting-id' : 'abc-def-ghi'
    });
});

module.exports = router;