const Router=require("express").Router;
const jwt=require("jsonwebtoken");
const app=Router();

// Routing all the requests
app.use("/api",require("./api.js"))

app.use("/",(req,res)=>{
    return res.send({"message":"Page Not Found"},404)
})

module.exports=app;

