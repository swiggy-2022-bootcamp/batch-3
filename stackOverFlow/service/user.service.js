const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { query } = require("../models/db");
const {
  BAD_REQUEST_HTTP_STATUS_CODE,
  UNAUTHORIZED_HTTP_STATUS_CODE,
} = require("../utils/constant");

const createUser = async (name, email, password) => {
  if (!(email && password && name)) {
    throw createError(
      BAD_REQUEST_HTTP_STATUS_CODE,
      "Please provide valid input!"
    );
  }

  const checkIfUserExistQuery = `
  SELECT userId 
  FROM users
  WHERE email = ?
  `;

  const checkIfUserExistParams = [email];

  const oldUser = await query(checkIfUserExistQuery, checkIfUserExistParams);

  if (oldUser.length > 0) {
    throw createError(BAD_REQUEST_HTTP_STATUS_CODE, "Email already taken!");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const createUserQuery = `
  INSERT INTO users (name, password, email)
  VALUES (?,?,?)
  `;

  const createUserQueryParams = [name, encryptedPassword, email];

  const user = await query(createUserQuery, createUserQueryParams);

  const token = jwt.sign(
    { userId: user.insertId, email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  user.token = token;

  return user;
};

const logInUser = async (email, password) => {
  if (!(email && password)) {
    throw createError(BAD_REQUEST_HTTP_STATUS_CODE, "All input is required");
  }

  const findUserQuery = `
  SELECT userId, name, email, password
  FROM users
  WHERE email = ?
  `;

  const findUserQueryParams = [email];

  const user = await query(findUserQuery, findUserQueryParams);

  if (user.length === 0) {
    throw createError(UNAUTHORIZED_HTTP_STATUS_CODE, "Invalid Credentials");
  }

  const userId = user[0].userId;

  if (user && (await bcrypt.compare(password, user[0].password))) {
    const token = jwt.sign({ userId: userId, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    return { userId, email, password, token };
  }

  throw createError(UNAUTHORIZED_HTTP_STATUS_CODE, "Invalid Credentials");
};

module.exports = {
  createUser,
  logInUser,
};
