const Router=require("express").Router;
const app=Router();

app.post("/register",(req,res)=>{
    return res.send(req.body);
})

app.post("/authenticate",(req,res)=>{
    return res.send(req.body);
})
 
app.get("/",(req,res)=>{
return res.send(req.user);
})

module.exports=app;

