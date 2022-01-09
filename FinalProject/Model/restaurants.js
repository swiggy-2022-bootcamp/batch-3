const mongoose=require('mongoose');  
var Schema = mongoose.Schema;
var path=require('path');
var RestaurantSchema = new Schema({
    restaurantName: {type: String,
            required:true},
    mobile:{
        type:String,
        required:true
    },
    address:{
        street:{type:String,required:true},
        city:{type:String, required:true},
        zip:{type:Number, required:true}
    },
    maincourse:[
        {
            type:Schema.Types.ObjectId, 
            ref:'ItemSchema',
        }
    ],
    drink:[
        {
            type:Schema.Types.ObjectId,
            ref:'ItemSchema',
        }
    ],
    starter:[
        {
            type:Schema.Types.ObjectId,
            ref:'ItemSchema',
        }
    ],
    bread:{
        type:Schema.Types.ObjectId,
        ref:'ItemSchema',
    } 
   
});
var Restaurant = mongoose.model('RestaurantSchema', RestaurantSchema);
module.exports=Restaurant;