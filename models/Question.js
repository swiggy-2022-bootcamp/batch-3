const mongoose = require('mongoose');

const Question = mongoose.Schema({
    id: {
        type: mongoose.ObjectId,
        index: true
    },
    answers: Array,
    username: String,
    title: String,
    body: String
});

module.exports = mongoose.model('question', Question);