const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
dotenv.config();

const port = process.env.PORT;
const { query } = require("./models/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    const checkIfUserExistQuery = `
    SELECT userId 
    FROM users
    WHERE email = ?
    `;

    const checkIfUserExistParams = [email];

    const oldUser = await query(checkIfUserExistQuery, checkIfUserExistParams);

    if (oldUser.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const createUserQuery = `
    INSERT INTO users (name, password, email)
    VALUES (?,?,?)
    `;

    const createUserQueryParams = [name, encryptedPassword, email];

    const user = await query(createUserQuery, createUserQueryParams);

    const token = jwt.sign(
      { user_id: user.insertId, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json({ user, success: true });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
