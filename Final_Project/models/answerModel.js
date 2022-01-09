const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./userModel').UserSchema;

AnswerSchema = new Schema({
    answeredby: { type: Schema.Types.ObjectId, ref: 'User' },
    answer: {type: String, required:true},
    upvotes: { type: Number, default: 0},
    downvotes: { type: Number, default: 0},
    upvotes_references: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes_references: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

exports.AnswerModel = mongoose.model('Answer', AnswerSchema );