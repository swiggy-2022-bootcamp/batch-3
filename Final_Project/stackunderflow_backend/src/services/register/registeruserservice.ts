import { findUserByUsername, createUser } from "../../repositories/user";
import { CustomError } from "../../utils/common/CustomError";

const bcrypt = require("bcryptjs");

interface RegisterUserParameters {
    registrationName :string;
    username :string;
    password :string;
}

export const RegisterUserService = async ({registrationName, username, password} :RegisterUserParameters) => {
    if (!(registrationName && username && password)) {
        throw new CustomError("all parameters needed", 401);
    }

    // Check if user already exists in the database
    const user = await findUserByUsername(username);
    if (user !== undefined) {
        throw new CustomError("user already exists", 409);
    }

    try {
        // Encrypt user password
        const encryptPassword = await bcrypt.hash(password, 10);
        // Create new user in the database
        createUser(registrationName, username, encryptPassword);
    } catch(e) {
        throw new CustomError("an error occured", 500)
    }
} 
