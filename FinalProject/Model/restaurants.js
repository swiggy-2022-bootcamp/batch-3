const mongoose=require('mongoose');  
var Schema = mongoose.Schema;
var path=require('path');
 

var RestaurantSchema = new Schema({
     // String is shorthand for {type: String}
    
    name: {type: String,

            required:true},
    
    mobile:{
        type:String,
        required:true
    },
    maincourse:[
        {
            type:Schema.Types.ObjectId, 
            ref:'ItemSchema',
        }
    ],
    drinks:[
        {
            type:Schema.Types.ObjectId,
             ref:'ItemSchema',
        }
    ],
    snacks:[
        {
            type:Schema.Types.ObjectId,
            ref:'ItemSchema',
        }
    ] 
    ,
    avatar:{
        type:String
    }
});
  
var Restaurant = mongoose.model('RestaurantSchema', RestaurantSchema);
module.exports=Restaurant;