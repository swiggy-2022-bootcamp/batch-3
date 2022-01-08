const bcrypt = require('bcrypt');

class BcryptWrapper {

    async hashPassword(password) {
        const hash = await bcrypt.hash(password,parseInt(process.env.BCRYPT_ROUNDS, 10));
        return hash;
    }

    async comparePasswords(password, passwordHash) {
        const match = await bcrypt.compare(password, passwordHash);
        return match;
    }
}

module.exports = BcryptWrapper;