const jwt = require("jsonwebtoken");
module.exports.authenticate=function (req,res,next)
{
    const authHeader=req.headers['authorization'];
    
    jwt.verify(authHeader,"secret",(err,user)=>{
        console.log(err,user)
        if(err)return res.send(403);
        req.user=user;
        next();
    })
}