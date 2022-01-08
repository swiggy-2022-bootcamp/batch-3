const User = require('../models/User');
const mongoose = require('mongoose');

class UsersMongoWrapper {
    constructor() {
    }

    async addUser(registrationName, username, password) {
        const newUser = await new User({id: mongoose.Types.ObjectId(), registrationName, username, password}).save();
        return newUser;
    }

    async findUserByUsername(username) {
        const user = await User.findOne({username}).exec();
        return user;
    }

    async verifyUniqueUser(username) {
        const users = await User.find({username}).exec();
        return users.length === 1;
    }
}

module.exports = UsersMongoWrapper;