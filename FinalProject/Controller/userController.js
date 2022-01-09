const User=require("./../Model/userSchema.js");
const logger=require("./../config/logger.js");

module.exports.getUserByID=async (req,res)=>{
   try{
        const user=await User.findById(req.params.id);
        console.log("foudn user",req.params.id,user);
        return res.send(user,200);
   }
   catch(err){
       logger.error("Get User by ID");
       return res.send({"message":"Error while sending user by ID","error":err.message},400);
   }
}

module.exports.deleteUserByID=async (req,res)=>{
    try{
        if(req.user.id!=req.params.id)
        {
            return res.send({"message":"You are not athorized to delete the user"})
        }
        const user=await User.deleteOne({id:req.params.id});
        if(err)
            return res.send(404);
        return res.send({"message":"Deleted the User"});
    }
    catch(err)
    {
        logger.error("Delete User by ID");
        return res.send({"message":"Error while deleting users","error":err.message},400);
    }
}

module.exports.getAllUsers=async (req,res)=>{
    try{
        const users = await User.find({});
        return res.send(users);
    }
    catch(err){
        logger.error("Get all Users");
        return res.send({"message":"Error while sending all users","error":err.message},400);
    }
}