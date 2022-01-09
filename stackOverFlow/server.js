const express = require("express");
const dotenv = require("dotenv");

const router = require("./routes/index.route");

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
