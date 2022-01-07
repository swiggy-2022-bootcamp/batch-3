const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

let users = ["tim", "joe", "ben"];

app.get("/", (req, res) => {
  //res.send("Hello World! Ben");
  res.json({ users });
});

app.use(bodyParser.json());

app.post("/addUser", (req, res) => {
  console.log(req.body);
  users.push(req.body.name);
  res.send({ users });
});

app.post("/checkUser", (req, res) => {
  userName = req.body.name;
  let checkUser = users.find((u) => userName == u);
  if (checkUser) {
    res.json({ msg: "USer is present" });
  } else {
    res.json({ msg: "USer is not present" });
  }
});

app.post("/deleteUser", (req, res) => {
  let delUser = req.body.name;
  let checkUser = users.find((u) => delUser == u);
  if (checkUser) {
    users = users.filter((u) => u != checkUser);
    res.json({ users });
  } else {
    res.json({ msg: "User is not present in the list" });
  }
});

app.listen(port, () => {
  console.log(`Server is up running: ${port}`);
});
