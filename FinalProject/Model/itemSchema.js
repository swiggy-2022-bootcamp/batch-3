const mongoose=require('mongoose');  
var Schema = mongoose.Schema;
var path=require('path');
var ItemSchema = new Schema({    
    foodName: {type: String,required:true},
    foodCost:{type:String,required:true},
    foodType:{type:String,enum:["Chinese","Mexican","Indian"]},
    foodCategory:{type:String,required:true,enum:["starter","drink","maincourse","bread"]},
    description:{type:String},
    rating:{type:Number},
    review:[{
            rating:{type:Number,enum:[1,2,3,4,5]},
            review:{type:String}
            }],
    restaurant:{
        type:Schema.Types.ObjectId,
        ref:'RestaurantSchema',
    } 
});
var Item = mongoose.model('ItemSchema', ItemSchema);
module.exports=Item;