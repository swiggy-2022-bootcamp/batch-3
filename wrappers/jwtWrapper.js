const jwt = require('jsonwebtoken');

class JWTWrapper {
    async generateToken(data) {
        return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '3600s'});
    }

    async verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
        });
    }
}

module.exports = JWTWrapper;