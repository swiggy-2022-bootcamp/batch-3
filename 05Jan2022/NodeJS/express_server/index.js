const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // res.json({msg:'Hello From Default Route'})
    // res.send("Hello from Express")
    // res.write();
    res.send("Hello from Write...")
});

app.listen(port, () => {
    console.log("Hello.. Our Express Server is Up And Running");
});