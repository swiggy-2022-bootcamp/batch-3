import { findUserByUsername } from "../../repositories/user";
import { CustomError } from "../../utils/common/CustomError";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

// get config vars
dotenv.config();

interface UserLoginParameters {
    username :string;
    password :string;
}

// Login -> username and password
export const UserLoginService = async ({username, password} :UserLoginParameters): Promise<string> => {
    if (!(username && password)) {
        throw new CustomError("all parameters needed", 401);
    }

    // Check if user exists in the database
    const user = await findUserByUsername(username);
    if (user === undefined) {
        throw new CustomError("user does not exist", 404);
    }
    
    // Check if the password is correct
    if (await bcrypt.compare(password, user.password) === false) {
        throw new CustomError("invalid credentials", 401);
    }

    // Create jwt token
    const token: string = jwt.sign(
        {id: user.pk},
        process.env.TOKEN_SECRET,
        {
            expiresIn: '2h',
        }
    );
    
    return token;
}