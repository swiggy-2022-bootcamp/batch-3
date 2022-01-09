const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var corsOptions = {
    origin: "http://localhost:8081"
};
const db = require('./server/models');
const Role = db.role;

db.sequelize.sync();
// db.sequelize.sync({
//     force: false, // To create table if exists , so make it false
//     alter: true // To update the table if exists , so make it true
// })

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

app.use(cors(corsOptions));
// Require our routes into the application.
require('../backend/server/routes/index')(app);
require('../backend/server/routes/auth')(app);
require('../backend/server/routes/user')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;