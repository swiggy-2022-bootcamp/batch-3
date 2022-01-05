const express = require("express");

const app = express();
const port = 8080;

var users = ["Virang", "Mansih", "Maonj", "Anil", "Sumil"];

app.get("/", (req, res) => {
  res.send("Hello World, This is the default Route");
  res.json({ users });
});

app.listen(port, () => {
  console.log(`hello, the server is up and running at ${port}`);
});
