import { model, Schema } from 'mongoose';

/* Create database schema for users */
const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        description: "What is the username? - must be string and is required"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        description: "What is the email? - must be unique and is required"
    },
    password: {
        type: String,
        required: true,
        minimum: 8,
        description: "What is the password? - minimum 8 characters long and is required"
    },
    address: {
        houseno: Number,
        street: String,
        city: String,
        state: String,
        zip: Number
    }
});

export default model('User', UserSchema);