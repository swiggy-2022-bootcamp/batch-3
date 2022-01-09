const {userHandler} = require('../handlers');

const iJwtWrapper = require('../wrappers/jwtWrapper');
const jwtWrapper = new iJwtWrapper();

module.exports = async (req, res, next) => {
    try {
        let header = req.headers.authorization;
        if(!header) {
            return res.status(401).json({message: "Invalid JWT"});
        }
        let token = header;
        let user = await jwtWrapper.verifyToken(token);
        req.user = user;
        next();
    } catch(err) {
        return res.status(401).json({message: "Invalid JWT"});
    }
}