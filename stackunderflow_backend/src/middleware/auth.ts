import { findUserByPk } from "../repositories/user";

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req :any, res :any, next :any) => {
    let token;
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    console.log(req.headers);

    // Checking if the JWT token starts with "Bearer" for security purposes
    if (authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
        console.log(token);
    } else {
        // Error handling when the token doesn't start with "Bearer"
        return res.status(401).json({
            error: new Error("Invalid Token")
        });
    }

    if (!token) {
        console.log(token);
        return res.status(403).send("A token is required for authentication");
    }

    // TODO: Check for the JWT token expiration response body
    try {
        const decoded = jwt.verify(token, config.TOKEN_SECRET);
        const userId = decoded.id;

        const user = await findUserByPk(userId);
        console.log(user);
        if (req.body.username && req.body.username !== user.username) {
            throw new Error("Invalid user name");
        } else {
            next();
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            error: new Error("Invalid Request!")
        });
    }
};

module.exports = verifyToken;
