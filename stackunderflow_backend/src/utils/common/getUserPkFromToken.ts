const jwt = require("jsonwebtoken");
const config = process.env;

export const getUserPkFromToken = (token: string): number => {
    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    const userId: number = decoded.id;
    return userId;
}
