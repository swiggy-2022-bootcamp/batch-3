const Router=require("express").Router;
const app=Router();
const Controller=require("./../Controller/userController.js");

// Routing the requests to Controllers

app.get("/:id",Controller.getUserByID);

app.delete("/:id",Controller.deleteUserByID);

app.get("/",Controller.getAllUsers);

app.use("/",(req,res)=>{
    return res.send({"message":"Page Not Found"},404)
})

module.exports=app;