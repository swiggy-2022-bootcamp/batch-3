const UsersDao = require('../dao/users-dao');
const User = require('../models/user');

exports.login = (req, res) => {
    const username = req.body['username'];
    const password = req.body['password'];

    const user = UsersDao.getUser(username, password);
    if (!user) {
        res.status(401).send({
            message: 'Sorry invalid credentials'
        });
    } else {
        res.status(200).send({
            message: 'user logged in successfully'
        });
    }   
}

exports.register = (req, res) => {
    const fullName = req.body['registration-name'];
    const username = req.body['username'];
    const password = req.body['password'];
    
    const user = new User(fullName, username, password);
    UsersDao.addUser(user);

    res.status(201).send({
        message: "User Registered Successfully",
        "registration-name": fullName
    });
}