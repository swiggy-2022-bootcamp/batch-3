const {userHandler} = require('../handlers');

module.exports = async (req, res, next) => {
    try {
        let {username, password} = req.body.userDetails;
        let result = await userHandler.login(username, password);
        if(!result.success) {
            const {success, status, ...otherInfo} = result;
            return res.status(status).json(otherInfo);
        }
        next();
    } catch(err) {
        const {success, status, ...otherInfo} = err;
        return res.status(status).json(otherInfo);
    }
}