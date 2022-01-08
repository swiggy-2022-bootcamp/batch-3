class UserHandler {
    constructor(userDbWrapper, cryptoWrapper) {
        this.userDbWrapper = userDbWrapper;
        this.cryptoWrapper = cryptoWrapper;
    }

    async login(username, password) {
        try {
            const passwordHash = await this.cryptoWrapper.hashPassword(password);
            const userExists = await this.userDbWrapper.verifyUserExists(username, passwordHash);
            if(userExists) {
                return {success: true, status: 200, message: "User logged in successfully"};
            } else {
                throw {success: false, status: 401, message: "Sorry invalid credentials"};
            }
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async register(registrationName, username, password) {
        try {
            const userExists = await this.userDbWrapper.verifyUniqueUser(username);
            if(userExists) {
                throw {success: false, status: 409, message: "User already exists"};
            }
            const passwordHash = await this.cryptoWrapper.hashPassword(password);
            const newUser = await this.userDbWrapper.addUser(registrationName, username, passwordHash);
            return {success: true, status: 201, message: "User Registered successfully", registrationName};
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = UserHandler;