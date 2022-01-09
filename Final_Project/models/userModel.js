const mongoose = require('mongoose');
const Schema = mongoose.Schema;

UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

TokenSchema = new Schema({
    email: { type: String, unique: true },
    token: String,
});

exports.UserModel = mongoose.model('User', UserSchema);
exports.TokenModel = mongoose.model('Token', TokenSchema);