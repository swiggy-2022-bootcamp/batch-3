import user from '../models/userModel.js';

/*
To register the user with basic details
{
    id: Number,
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
exports.createUser = (req, res) => {
    const newUser = new user(req.body);

    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        }

        res.status(201).json(user);
    });
};

// TODO
exports.authenticateUser = (req, res) => {

};

// To get all the users who are registered to the system, the end point should return an array,
exports.getAllUsers = (req, res) => {
    user.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }

        res.status(200).json(users);
    });
};

// To return user by specifying :userID
exports.getUser = (req, res) => {
    user.findById(req.params.userID, (err, user) => {
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
exports.updateUser = (req, res) => {
    user.findOneAndUpdate({
        _id: req.params.userID
    }, req.body,
        (err, user) => {
            if (err) {
                res.status(500).json({
                    message: `Sorry user With ${req.params.userID} not found`
                });
            } else if (!user) {
                res.status(404).json({
                    message: `Sorry user With ${req.params.userID} not found`
                });
            } else {
                // TODO
                // Should return new value = req.body or original value user?
                res.status(200).json(user);
            }
        });
};

// TODO
// When Id not found: {
//     Message:”Sorry user With <ID> not found”
// }
exports.deleteUser = (req, res) => {
    user.findOneAndDelete({
        _id: req.params.userID,
        _id: { $ne: null }
    }, (err) => {
        if (err) {
            res.status(200).json({
                message: `Sorry user With ${req.params.userID} not found`
            });
        } else {

            res.status(200).json({
                message: `User Deleted Successfully`
            });
        }
    });
};