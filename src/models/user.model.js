const mongoose = require('mongoose');
const Question = require('./question.model').schema;
const Answer = require('./answer.model').schema;

const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment')

const userSchema = new Schema({
    id: { type: Number, unique: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    questions: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: 'Question'
    },
    answers: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: 'Answer'
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

userSchema.pre('save', function (next) {
    if (!this.createdBy) {
        this.createdBy = this.get('_id');
        this.updatedBy = this.get('_id');
    }    
    next();
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('User', userSchema);