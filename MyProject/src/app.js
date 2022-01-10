const express=require("express");
require("./db/conn");

const User=require("./models/users");
const Food=require("./models/foods");

const app=express();
const port= 3000;

app.use(express.json());

app.post("/api/register",async(req,res)=>{
    console.log(req.body);
    const user=new User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
})


app.post("/api/authenticate",async(req,res)=>{

    const uname=req.body.username;
    const pwd=req.body.password;
    const findUser=await User.find({username:uname,password:pwd});

    if(Object.keys(findUser).length === 0)
    {
        res.status(403).send("Wrong Credentials: Access Forbidden.");
    }
    else {
        res.status(200).send("User logged in successfully");
    }
      

});

app.get("/api/users",async(req,res)=>{
    try {
        const Users=await User.find();
        res.send(Users);
    } catch (e) {
    }
});


app.get("/api/users/:userId",async(req,res)=>{
    
    const userId=parseInt(req.params.userId);
        try {
            
            const UserById=await User.find({id:userId});
            if(Object.keys(UserById).length === 0 )
            {
                res.status(403).send("Sorry user With "+userId+" not found");        
            }
            else{
                res.status(200).send(UserById);
            }  
        } catch (e) {
            res.status(403).send("Sorry user With "+userId+" not found");
        }
})


app.put("/api/users",async (req,res)=>{
    const userId=parseInt(req.body.id);
    try {    
        const UserById=await User.find({id:userId});
        // console.log(UserById);
        if(Object.keys(UserById).length === 0 )
            {
               return res.status(403).send("Sorry user With "+userId+" not found");        
            }
        const updatedStudent=await User.updateOne({id:userId},req.body);
        if(updatedStudent.matchedCount==1)
        return res.status(200).send("User Updated successfully.");
        else
        return res.status(403).send("Sorry user With "+userId+" not found");        
         
} catch (e) {
   return res.status(403).send("Sorry user With "+userId+" not found");        
       
}
})

app.delete("/api/users/:userId",async (req,res)=>{
try {
    const userId=req.params.userId;
    const UserById=await User.find({id:userId});
    // console.log(UserById);
    if(Object.keys(UserById).length === 0 )
        {
            res.status(403).send("Sorry user With "+userId+" not found");        
        }
    const updatedStudent=await User.deleteOne({id:userId});
    res.status(200).send("User deleted successfully.");
} catch (e) {
    res.send(e);
}
})
// ********************************Food Items************************************************

app.post("/api/food",async(req,res)=>{
    console.log(req.body);
    const food=new Food(req.body);
    food.save().then(()=>{
        res.status(201).send(food);
    }).catch((e)=>{
        res.status(400).send(e);
    });
})

app.get("/api/food/:foodID",async (req,res)=>{
      
    try {
        const foodId=parseInt(req.params.foodID);
        const FoodById=await Food.find({foodId:foodId});
        if(Object.keys(FoodById).length === 0 )
        {
            res.status(403).send("Sorry Food Not Found”");        
        }
        else{
            res.status(200).send(FoodById);
        }  
    } catch (e) {
        res.status(403).send(e.message);
    }
})




app.listen(port,()=>{
    console.log('connection to express successful');
})