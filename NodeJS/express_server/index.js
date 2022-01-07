const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.get("/get", (req, res) => {
  res.send("Hello from default route!");
});

app.post("/addUser", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log("Hello... Express server is running.");
});
