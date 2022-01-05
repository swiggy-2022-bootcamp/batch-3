const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");

let users = ["Prateek", "Joshi", "Takur", "Ravi Kiran"];
app.use(bodyParser.json());

app.get("/", (req, res) => {
    // res.json({msg:'Hello From Default Route'})
    // res.send("Hello from Express")
    res.json({ users });
    // res.write();
    // res.send("Hello from Write...")
});

app.post("/addUser", (req, res) => {
    console.log(req.body);
    users.push(req.body.name);
    res.send({ users });
});

app.post("/check", (req, res) => {
    var userName = req.body.name;
    let checkUser = users.find((u) => u == userName);
    if (checkUser) {
        res.json({ msg: "User is Avaiable.. Allow Him to Login" });
    } else {
        res.json({ msg: "User Is not available .. ask him to Register" });
    }
});

app.listen(port, () => {
    console.log("Hello.. Our Express Server is Up And Running");
});