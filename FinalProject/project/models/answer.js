var mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


var AnswerSchema = new mongoose.Schema({
    question_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question',
        required: true
    },
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    upvotes:{
        type: Number,
        default: 0
    },
});


AnswerSchema.plugin(AutoIncrement, {inc_field: 'answer_id'});

module.exports = mongoose.model("Answers", AnswerSchema);