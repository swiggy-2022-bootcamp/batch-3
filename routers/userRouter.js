const express = require('express');
const router = express.Router();

const {userHandler} = require('../handlers');

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: User login
 *     description: Verifies if a user can login using username and password
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: User logged in successfully
 *       "401":
 *         description: Unauthorized
 *     parameters:
 *       - in: body
 *         name: "body"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *           required:
 *             - username
 *             - password
 */
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    userHandler.login(username, password)
        .then(data => {
            const {success, status, ...otherData} = data;
            res.status(status).json(otherData);
        })
        .catch(err => {
            const {success, status, ...otherData} = err;
            res.status(status).json(otherData);
        })
});


/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: 
 *       - users
 *     summary: Register user
 *     description: Register user using username, password, registrationName
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         Description: User registered successfully
 *       409:
 *         Description: User with username already exists
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             username: 
 *               type: string
 *             password:
 *               type: string
 *             registrationName:
 *               type: string
 *           required:
 *             - username
 *             - password
 *             - registrationName
 */
router.post('/register', (req, res) => {
    const {username, password, registrationName} = req.body;
    userHandler.register(registrationName, username, password)
        .then(data => {
            const {success, status, ...otherData} = data;
            res.status(status).json(otherData);
        })
        .catch(err => {
            const {success, status, ...otherData} = err;
            res.status(status).json(otherData);
        })
});

module.exports = router;