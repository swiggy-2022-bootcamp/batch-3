const mongoose=require("mongoose");
const validator=require("validator");

const foodSchema=new mongoose.Schema({
    foodId:{
        type: Number,
        unique:[true,'Food Id should be unique.']
    },
foodName:{
    type:String,
    unique:[true,'Food Name should be unique.']
},
foodCost:{
    type: Number    
},
foodType:  {
   type: String,
   enum:["Indian","Chinese","Mexican"] 
}
});

const Food=new mongoose.model('Food',foodSchema);
module.exports=Food;