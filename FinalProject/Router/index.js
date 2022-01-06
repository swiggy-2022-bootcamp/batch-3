const Router=require("express").Router;
const jwt=require("jsonwebtoken");
const app=Router();

app.use("/user",require("./userRoute.js"))
app.use("/api",require("./api.js"))


app.post("/register",(req,res)=>{
    console.log(req.body);
    return res.send("<h1>Registered Successful</h1>");
})

app.post("/authenticate",(req,res)=>{
    const token=jwt.sign(req.body,"secret");
    res.cookie("auth",token,{
        maxAge: 50000,
        expires: '1d',
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
   

    console.log("sending",token)
    return res.send("<h1>Sign In Successful</h1>");
})

app.get("/",(req,res)=>{
    if(req.cookies!=null || req.cookies!=undefined)
    {
        console.log(req.cookies.auth,req.user)
    }
    console.log("--------------")
    return res.render("home");
})

module.exports=app;

