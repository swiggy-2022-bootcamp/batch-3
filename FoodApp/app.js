require("dotenv").config();
require("./config/database").connect();

const express = require("express");

const authRouter = require("./route/auth.route");
const userRouter = require("./route/users.route");
const foodRouter = require("./route/food.route");

const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/food", foodRouter);

const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;
