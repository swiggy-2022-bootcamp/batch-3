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

    // Checking if the JWT token starts with "Bearer" for security purposes
    if (authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
    } else {
        // Error handling when the token doesn't start with "Bearer"
        return res.status(403).json({
            error: "invalid token"
        });
    }

    if (!token) {
        return res.status(403).json({
            error: "user is not logged in"
        });
    }

    // TODO: Check for the JWT token expiration response body
    try {
        const decoded = jwt.verify(token, config.TOKEN_SECRET);
        const userId = decoded.id;

        const user = await findUserByPk(userId);

        if (!user) {
            return res.status(403).json({
                error: "user does not exist"
            })
        } else {
            next();
        }
    } catch (e) {
        return res.status(500).json({
            error: "an error occurred"
        });
    }
};

module.exports = verifyToken;
