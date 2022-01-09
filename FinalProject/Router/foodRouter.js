const Router=require("express").Router;
const app=Router();
const Controller=require("./../Controller/foodController.js")

// Routing the requests to Controllers

app.post("/review/:id",Controller.addReview)

app.get("/:id",Controller.getFoodItemByID)

app.post("/",Controller.addFoodItem)

app.use("/",(req,res)=>{
    return res.send({"message":"Page Not Found"},404)
})

module.exports=app;
