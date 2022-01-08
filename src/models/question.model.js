const mongoose = require('mongoose');
const Answer = require('./answer.model').schema;

const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment')

const questionSchema = new Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    answers: {
        type: [Answer],
        default: []
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

questionSchema.plugin(autoIncrement.plugin, {
    model: 'question',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Question', questionSchema);