const express = require("express");
const app = express();
const port = 3000;

let users = ["Prateek", "Joshi", "Takur", "Ravi Kiran"];
app.get("/", (req, res) => {
    // res.json({msg:'Hello From Default Route'})
    // res.send("Hello from Express")
    res.json({ users });
    // res.write();
    // res.send("Hello from Write...")
});

app.listen(port, () => {
    console.log("Hello.. Our Express Server is Up And Running");
});