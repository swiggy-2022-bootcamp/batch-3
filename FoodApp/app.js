require("dotenv").config();
require("./config/database").connect();

const express = require("express");

const authRouter = require("./route/auth.route");
const userRouter = require("./route/users.route");
const foodRouter = require("./route/food.route");
const cartRouter = require("./route/cart.route");
const orderRouter = require("./route/order.route");
const reviewRouter = require("./route/review.route");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/users", auth, userRouter);
app.use("/api/food", auth, foodRouter);
app.use("/api/cart", auth, cartRouter);
app.use("/api/orders", auth, orderRouter);
app.use("/api/reviews", auth, reviewRouter);

module.exports = app;
