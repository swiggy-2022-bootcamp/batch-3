const Router=require("express").Router;
const jwt=require("jsonwebtoken");
const app=Router();


app.use("/api",require("./api.js"))
app.get("/",function(req,res)
{
    return res.send(404);
})

module.exports=app;

