const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("./middleware/auth");
const { groupArray } = require("./utils/helper");

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
      { userId: user.insertId, email },
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const findUserQuery = `
    SELECT userId, name, email, password
    FROM users
    WHERE email = ?
    `;

    const findUserQueryParams = [email];

    const user = await query(findUserQuery, findUserQueryParams);

    const userId = user[0].userId;

    if (user && (await bcrypt.compare(password, user[0].password))) {
      const token = jwt.sign({ userId: userId, email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      res.status(200).json({ userId, email, password, token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/question", verifyToken, async (req, res) => {
  try {
    const { question } = req.body;
    const { title, body } = question;

    const insertQuestionQuery = `
    INSERT INTO questions (title, body, userId)
    VALUES (?,?,?)
    `;

    const insertQuestionQueryParams = [title, body, req.user.userId];

    const response = await query(
      insertQuestionQuery,
      insertQuestionQueryParams
    );

    const questionId = response.insertId;

    res
      .status(200)
      .json({ questionId, message: "Question posted successfully!" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/answer", verifyToken, async (req, res) => {
  try {
    const { question } = req.body;
    const { questionId, answer } = question;

    const insertAnswerQuery = `
    INSERT INTO answers (questionId, answer, userId)
    VALUES (?,?,?)
    ON DUPLICATE KEY UPDATE answer = VALUES(answer)
    `;

    const insertAnswerQueryParams = [questionId, answer, req.user.userId];

    const response = await query(insertAnswerQuery, insertAnswerQueryParams);

    res
      .status(200)
      .json({ questionId, message: "Answer posted successfully!" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/question/:questionId", verifyToken, async (req, res) => {
  try {
    const questionId = req.params.questionId;

    const fetchAnswerQuery = `
    SELECT sq.questionId, sq.title, sq.body, sa.answer
    FROM stackOverFlow.answers sa
    JOIN stackOverFlow.questions sq on sa.questionId = sq.questionId 
    `;

    const fetchAnswerQueryParams = [];

    const response = await query(fetchAnswerQuery, fetchAnswerQueryParams);

    const questionAnswerArray = groupArray(response);

    res.status(200).json({
      response: [...questionAnswerArray],
      message: "Answer fetched successfully!",
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
