const jwt = require("jsonwebtoken");
const User=require("./../Model/userSchema.js");
module.exports.authenticate=function (req,res,next)
{
     
    const authHeader=req.headers['authorization'];
    
    jwt.verify(authHeader,"secret",(err,user)=>{        
        if(err)return res.send(403);
        User.findOne({"user":user.username,"password":user.password},(err,user)=>
        {
            if(user==null)
            {
                return res.send({"message":"User not found"});
                next();
            }
            req.user=user;
            next();
        })
    })
}