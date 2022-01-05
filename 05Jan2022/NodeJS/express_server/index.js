const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello From Default Route")
});

app.listen(port, () => {
    console.log("Hello.. Our Express Server is Up And Running");
});