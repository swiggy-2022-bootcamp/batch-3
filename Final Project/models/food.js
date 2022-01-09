const mongoose = require("mongoose");

//Schema to represent Food in DB
var foodSchema=mongoose.Schema({
    foodId:{
        type:Number,
        required:true,
        unique:true
    },
    foodName:{
        type:String,
        required:true,
        unique:true
    },
    foodCost:{
        type:Number,
        required:true,
    },
    foodType:{
        type:String,
        enum:['Indian','Chinese','Mexican']
    }
});

module.exports=mongoose.model("food",foodSchema);