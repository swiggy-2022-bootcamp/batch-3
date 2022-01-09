const User=require("./../Model/userSchema.js");
const logger=require("./../config/logger.js");

// Fetching user by ID
module.exports.getUserByID=async (req,res)=>{
   try{
        const user=await User.findById(req.params.id);
        return res.send(user,200);
   }
   catch(err){
       logger.error("Get User by ID");
       return res.send({"message":"Error while sending user by ID","error":err.message},400);
   }
}

// Deleting user by ID
module.exports.deleteUserByID=async (req,res)=>{
    try{
        // checking whether the user has the permission to delete the user
        if(req.user.id!=req.params.id)
        {
            return res.send({"message":"You are not athorized to delete the user"})
        }
        const user=await User.deleteOne({id:req.params.id});
        return res.send({"message":"Deleted the User"},200);
    }
    catch(err)
    {
        logger.error("Delete User by ID");
        return res.send({"message":"Error while deleting users","error":err.message},400);
    }
}

// Fetching all the users in the database;
module.exports.getAllUsers=async (req,res)=>{
    try{
        const users = await User.find({});
        console.log(users,"-----------------------------------------------")
        return res.send(users);
    }
    catch(err){
        logger.error("Get all Users");
        return res.send({"message":"Error while sending all users","error":err.message},400);
    }
}