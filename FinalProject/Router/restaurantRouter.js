const Router=require("express").Router;
const app=Router();
const Controller=require("./../Controller/restaurantController.js")

// Routing the requests to Controllers

app.get("/getRestaurants",Controller.getAllRestaurants)

app.get("/getLocalRestaurants",Controller.getLocalRestaurants)

app.post("/addRestaurant",Controller.addNewRestaurant)

app.get("/:id",Controller.getRestaurantByID)

app.use("/",(req,res)=>{
    return res.send({"message":"Page Not Found"},404)
})

module.exports=app;