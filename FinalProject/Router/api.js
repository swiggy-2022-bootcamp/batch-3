const Router=require("express").Router;
const bcrypt=require('bcryptjs');
const User=require("./../Model/userSchema");
const Food=require("./../Model/itemSchema");
const Restaurant=require("./../Model/restaurants.js");
const jwt=require("jsonwebtoken");
const app=Router();
const authenticate=require("./../middlewares/authenticateMiddleware").authenticate
const secret=require("./../config/secret.js")

// Routing the requests to Controllers

app.use("/restaurant",authenticate,require("./restaurantRouter.js"));

app.use("/food",authenticate,require("./foodRouter.js"));

app.use("/user",authenticate,require("./userRouter.js"));

// function to encrypt and salt the password
async function hashPassword(password)
{
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword;
}

// Function to register new user
app.post("/register",async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(user)
        return  res.send({"message":"Email already used"},400);
        req.body.password=await hashPassword(req.body.password);
        const newuser=await User.create(req.body);
        return res.send(newuser);
    }
    catch(err){
        return res.send({"message":"Problem in Registering","error":err.message});
    }

})

// Function to authenticate the user
app.post("/authenticate",async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(user==null)
            return res.send({"message":"Invalid Username"});
        const validUser=await bcrypt.compare(req.body.password,user.password);
        if(!validUser)
            return res.send({"message":"Incorrect Password"})
        const token= jwt.sign(req.body,secret.secretKey);
        return res.send({"Authorization Token":token},200);
    }
    catch(err){
        return res.send({"message":"Problem in Authenticating User","error":err.message});
    } 
})
 
app.use("/",(req,res)=>{
    return res.send({"message":"Page Not Found"},404)
})

module.exports=app;

