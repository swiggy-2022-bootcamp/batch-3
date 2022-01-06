const mongoose = require('mongoose');

const User = mongoose.Schema({
    id: mongoose.ObjectId,
    username: String,
    password: String,
    registrationName: String
});

module.exports = mongoose.model('user', User);