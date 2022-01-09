const Router=require("express").Router;
const app=Router();
const Controller=require("./../Controller/restaurantController.js")

app.get("/getRestaurants",Controller.getAllRestaurants)

app.get("/getLocalRestaurants",Controller.getLocalRestaurants)

app.post("/addRestaurant",Controller.addNewRestaurant)

app.get("/:id",Controller.getRestaurantByID)

module.exports=app;