const Router=require("express").Router;
const app=Router();
const Controller=require("./../Controller/foodController.js")


app.post("/review/:id",Controller.addReview)

app.get("/:id",Controller.getFoodItemByID)

app.post("/",Controller.addFoodItem)

module.exports=app;
