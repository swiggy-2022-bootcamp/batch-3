const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./userModel').UserSchema;
const AnswerSchema = require('./answerModel').AnswerSchema;

QuestionSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    questionTitle: {type: String, required: true},
    questionBody: {type: String, required: true},
    upvotes: { type: Number, default: 0},
    downvotes: { type: Number, default: 0},
    answer_references: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    upvotes_references: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes_references: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

exports.QuestionModel = mongoose.model('Question', QuestionSchema );