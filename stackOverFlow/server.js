const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

const { verifyToken } = require("./middleware/auth");
const { groupArray } = require("./utils/helper");
const router = require("./routes/index.route");

dotenv.config();

const app = express();

const port = process.env.PORT;
const { query } = require("./models/db");

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
