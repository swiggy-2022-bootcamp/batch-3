var mongoose = require("mongoose");

var UpvoteSchema = mongoose.Schema({
    question_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question',
    },
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }
});

module.exports = mongoose.model("Upvotes", UpvoteSchema);