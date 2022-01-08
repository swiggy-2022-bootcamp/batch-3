const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment')

const answerSchema = new Schema({
    id: { type: Number, index: false },
    answer: { type: String, required: true },    
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true, autoIndex: false })

autoIncrement.initialize(mongoose.connection);

answerSchema.plugin(autoIncrement.plugin, {
    model: 'answer',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Answer', answerSchema);