const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const router = require("./routes/index.route");

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT;

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
