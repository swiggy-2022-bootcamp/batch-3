class UserHandler {
    constructor(userDbWrapper, cryptoWrapper, jwtWrapper) {
        this.userDbWrapper = userDbWrapper;
        this.cryptoWrapper = cryptoWrapper;
        this.jwtWrapper = jwtWrapper;
    }

    async login(username, password) {
        try {
            const user = await this.userDbWrapper.findUserByUsername(username);
            if(!user) {
                throw {success: false, status: 401, message: "Sorry invalid credentials"};
            }
            const match = await this.cryptoWrapper.comparePasswords(password, user.password);
            if(!match) {
                throw {success: false, status: 401, message: "Sorry invalid credentials"};
            }
            const token = await this.jwtWrapper.generateToken({username});
            return {success: true, status: 200, message: "User logged in successfully", token};
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