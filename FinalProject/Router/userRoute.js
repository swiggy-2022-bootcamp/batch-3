const Router=require("express").Router;
const app=Router();

app.get("/signin",(req,res)=>{
    return res.render("signin");
})

app.get("/signup",(req,res)=>{
    return res.render("signup");
})

module.exports=app;