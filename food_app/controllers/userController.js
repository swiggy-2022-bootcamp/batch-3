import user from '../models/userModel.js';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

/*
To register the user with basic details
{
    username: String,
    email: String,
    password: String
    address: {
        houseno: Number,
        street: String,
        city: String,
        state: String,
        zip: Number
    }
}
*/
exports.createUser = async (req, res) => {
    var newUser = new user({ ...req.body, password: await hash(req.body.password, 9) });

    await newUser.save((err, user) => {
        if (err.code === 11000) {
            // duplicate username
            res.status(409).json({ status: 'error', error: 'Username already exists' })
        } else if (err) {
            res.status(409).json({ message: err.message });
        }

        res.status(201).json(user);
    });
};

// To validate the user is registered in the system
exports.authenticateUser = async (req, res) => {
    const { username, password } = req.body
    const foundUser = await user.findOne({ username }).lean()

    if (!foundUser) {
        res.status(403).json({ message: 'Invalid username/password' })
    }

    if (await compare(password, foundUser.password)) {
        const token = sign({
            id: foundUser._id,
            username: foundUser.username
        }, process.env.JWT_SECRET)

        return res.json({ message: token })
    }

    res.status(403).json({ message: 'Invalid username/password' })
};

// To get all the users who are registered to the system, the end point should return an array,
exports.getAllUsers = async (req, res) => {
    await user.find({}, (err, users) => {
        if (err) {
            res.status(404).json({ message: err.message });
        }

        res.status(200).json(users);
    });
};

// To return user by specifying :userID
exports.getUser = async (req, res) => {
    await user.findById(req.params.userID, (err, user) => {
        if (err) {
            res.status(500).json({
                message: `Sorry user With ${req.params.userID} not found`
            });
        } else if (!user) {
            res.status(404).json({
                message: `Sorry user With ${req.params.userID} not found`
            });
        } else {
            res.status(200).json(user);
        }
    });
};

// Should update the user specified in the payload which shall match the ID and updated the existing user with the new details.
exports.updateUser = async (req, res) => {
    await user.findByIdAndUpdate(req.params.userID, req.body, (err, user) => {
        if (err) {
            res.status(500).json({
                message: `Sorry user With ${req.params.userID} not found`
            });
        } else if (!user) {
            res.status(404).json({
                message: `Sorry user With ${req.params.userID} not found`
            });
        } else {
            // Return updated value
            res.status(200).json(req.body);
        }
    });
};

// Should delete the user which is specified in the :userID
exports.deleteUser = async (req, res) => {
    await user.findByIdAndDelete(req.params.userID, (err, user) => {
        if (err) {
            res.status(500).json({
                message: `Sorry user With ${req.params.userID} not found`
            });
        } else if (!user) {
            res.status(404).json({
                message: `Sorry user With ${req.params.userID} not found`
            });
        } else {
            res.status(200).json({
                message: `User Deleted Successfully`
            });
        }
    });
};