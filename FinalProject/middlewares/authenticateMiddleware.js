const jwt = require("jsonwebtoken");
const User=require("./../Model/userSchema.js");
const secret=require("./../config/secret.js")
const bcrypt=require('bcryptjs');
// Middleware to authenticate using the token in the header;
module.exports.authenticate=async function (req,res,next)
{
try{
    const authHeader=req.headers['authorization'];
    
    const decryptToken=await jwt.verify(authHeader,secret.secretKey);       
    const user= await User.findOne({"email":decryptToken.email});
    if(user==null)
        return res.send({"message":"User not found"},502);
    const validUser=await bcrypt.compare(decryptToken.password,user.password);
    if(!validUser)
        return res.send({"message":"Invalid Password"},502);
    req.user=user;
    next();
       
}
catch(err)
{
    return res.send({"message":"Error while Authenticating","error":err.message},500)
}
}