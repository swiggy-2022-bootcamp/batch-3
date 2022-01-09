import { findUserByPk } from "../repositories/user";

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req :any, res :any, next :any) => {
    let token;
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({
            error: "user not logged in"
        });
    }

    console.log(authHeader);
    console.log(req.headers);

    // Checking if the JWT token starts with "Bearer" for security purposes
    if (authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
        console.log(token);
    } else {
        // Error handling when the token doesn't start with "Bearer"
        return res.status(403).json({
            error: "invalid token"
        });
    }

    if (!token) {
        console.log(token);
        return res.status(403).json({
            error: "user is not logged in"
        });
    }

    // TODO: Check for the JWT token expiration response body
    try {
        const decoded = jwt.verify(token, config.TOKEN_SECRET);
        const userId = decoded.id;

        const user = await findUserByPk(userId);
        console.log(user);
        if (req.body.username && req.body.username !== user.username) {
            return res.status(403).json({
                error: `user with username ${req.body.username} does not exist`
            })
        } else {
            next();
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "an error occurred"
        });
    }
};

module.exports = verifyToken;
