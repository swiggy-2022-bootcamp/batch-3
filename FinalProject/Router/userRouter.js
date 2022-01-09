const Router=require("express").Router;
const app=Router();
const Controller=require("./../Controller/userController.js");

app.get("/:id",Controller.getUserByID);

app.delete("/:id",Controller.deleteUserByID);

app.get("/",Controller.getAllUsers);

module.exports=app;