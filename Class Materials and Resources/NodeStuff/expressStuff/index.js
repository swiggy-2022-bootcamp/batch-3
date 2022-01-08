const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

var users = ["Virang", "Mansih", "Maonj", "Anil", "Sumil"];

app.use(bodyParser.json());

app.get("/", (req, res) => {
  // res.json({ users });
  res.send("Hello World, This is the default Route");
  // res.json({ users });
});

app.get("/getUsers", (req, res) => {
  res.json({ users });
});

app.post("/addUser", (req, res) => {
  console.log(req.body);
  users.push(req.body.name);
  res.send({ users });
});

app.get("/deleteUser/:user", (req, res) => {
  console.log(req.params.user);
  let delUser = req.params.user;
  let checkUser = users.find((u) => u == delUser);
  if (checkUser) {
    users = users.filter((u) => u != delUser);
    res.json({ users });
  } else {
    res.json({ msg: "User is not defined" });
  }
});

app.listen(port, () => {
  console.log(
    `hello, the server is up and running at http://localhost:${port}`
  );
});
