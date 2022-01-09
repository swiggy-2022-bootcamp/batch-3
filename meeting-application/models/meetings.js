var mongoose = require('mongoose');

var MeetingScheme = mongoose.Schema({
    meetingid:{
        type:String,
        required:true
    },
    dateofmeeting:{
        type:String,
        required:true
    },
    starttime:{
        type:String,
        required:true
    },
    endtime:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    emailidsofattendees:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('AuthMeeting',MeetingScheme)