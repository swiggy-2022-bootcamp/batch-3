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

app.listen(port, () => {
    console.log("Hello.. Our Express Server is Up And Running");
});