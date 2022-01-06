const mongoose=require('mongoose');  
var Schema = mongoose.Schema;
var path=require('path');
 

var ItemSchema = new Schema({    
    foodName: {type: String,required:true},
    foodCost:{type:String,required:true},
    foodType:{type:String,required:true,enum:["Chinese","Mexican","Indian"]},
    description:{type:String},
    rating:{type:Number},
    review:[{
            rating:{type:Number,enum:[1,2,3,4,5]},
            review:{type:String}
             }]
    
});
  
var Item = mongoose.model('ItemSchema', ItemSchema);
module.exports=Item;