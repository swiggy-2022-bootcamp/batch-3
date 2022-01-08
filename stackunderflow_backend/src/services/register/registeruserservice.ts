import { findUserByUsername, createUser } from "../../repositories/user";

const bcrypt = require("bcryptjs");

interface RegisterUserParameters {
    registrationName :string;
    username :string;
    password :string;
}

export const RegisterUserService = async ({registrationName, username, password} :RegisterUserParameters) => {
    if (!(registrationName && username && password)) {
        throw new Error("All parameters needed!");
    }

    // Check if user already exists in the database
    const user = await findUserByUsername(username);
    if (user !== undefined) {
        // TODO: set the error code to 409
        throw new Error("User Already Exist. Please Login");
    }

    // Encrypt user password
    const encryptPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    createUser(registrationName, username, encryptPassword);
} 
