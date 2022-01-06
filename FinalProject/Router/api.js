const Router=require("express").Router;
const User=require("./../Model/userSchema");
const Food=require("./../Model/itemSchema");
const jwt=require("jsonwebtoken");
const app=Router();
const authenticate=require("./../middlewares/authenticateMiddleware").authenticate

app.post("/food/review/:id",(req,res)=>{
    console.log("rating",req.params.id)
    Food.findOne({id:req.params.id},(err,food)=>{
        try{
            req.body.rating=1*req.body.rating
            console.log(food,req.body)
            food.review.push(req.body);
            if(food.rating==undefined)
                food.rating=0;
            food.rating=(food.rating*(food.review.length-1)+req.body.rating)/food.review.length;
            food.save();
            return res.send(food);
        }
        catch(err)
        {
            return res.send(404);
        }
    })
})

app.get("/food/:id",(req,res)=>{
    Food.findOne({id:req.params.id},(err,foodItem)=>{
        if(err)
        return res.send(404);
        return res.send(foodItem,200);
    })
})

app.post("/food",(req,res)=>{
    Food.create(req.body,(err,food)=>{
        if(err)
        return res.send(403);
        return res.send(food,200);
    })
})

app.get("/users/:id",(req,res)=>{
    User.findOne({id:req.params.id},(err,user)=>{
        if(err || user==null)
            return res.send(404);
        return res.send(user,200);

    })
})

app.delete("/users/:id",(req,res)=>{
    // if(req.user.id!=req.params.id)
    // {
    //     return res.send({"messages":"You are not the Genuine User"});
    // }
    User.deleteOne({id:req.params.id},(err,user)=>{
        if(err)
            return res.send(404);
        return res.send({"message":"Deleted the User"});
    })
})

app.get("/users",(req,res)=>{
    User.find({},(err,users)=>{
        return res.send(users);
    })
});

app.post("/register",(req,res)=>{
    
    User.find(req.username,function(err,user){
        if(user!=null)
        {
          return  res.send({"message":"User already exists!!"},400)
        }
        User.create(req.body,function(err,user)
            {
                console.log(req.body,user);
                if(err)
                {
                    return res.send(400);
                }
                return res.send(user);
            
            });
    })
  

})

app.post("/authenticate",(req,res)=>{
    User.findOne(req.body,function(err,user)
    {
        if(user==null || err!=null)
            return res.send({"message":"Invalid Username/Password"});
        const token= jwt.sign(req.body,"secret");
        return res.send({"Authorization Token":token});
    })
  
})
 
app.get("/",authenticate,(req,res)=>{

return res.send(req.user);
})

module.exports=app;

