var mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


var QuestionSchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
     },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    upvotes:{
        type: Number,
        default: 0
    },
});


QuestionSchema.plugin(AutoIncrement, {inc_field: 'question_id'});

module.exports = mongoose.model("Questions", QuestionSchema);