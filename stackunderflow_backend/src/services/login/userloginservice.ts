import { findUserByUsername } from "../../repositories/user";

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
        throw new Error("All parameters needed!");
    }

    // Check if user exists in the database
    const user = await findUserByUsername(username);
    if (user === undefined) {
        // TODO: set the error code to 409
        throw new Error("User does not exist. Please SignUP!");
    }
    
    // Check if the password is correct
    if (await bcrypt.compare(password, user.password) === false) {
        throw new Error("Password incorrect!");
    }

    // Create jwt token
    const token: string = jwt.sign(
        {id: user.pk},
        process.env.TOKEN_SECRET,
        {
            expiresIn: '2h',
        }
    );
    
    console.log("Token type: ", typeof(token));
    return token;
}