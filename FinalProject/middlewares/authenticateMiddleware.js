const jwt = require("jsonwebtoken");

module.exports.authenticate=function (req,res,next)
{
    const authHeader=req.cookies.auth;
 
    if(authHeader==null || authHeader==undefined)
     {  
        next();
        return;
    }
    const token=authHeader.split(".")[1]
     
    if(token==null)
     {next();return ;}
    jwt.verify(authHeader,"secret",function(err,user){
        if(err)return res.sendStatus(403);
        req.user=user;
        res.user=user;
        next();
    })
}