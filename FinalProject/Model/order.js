const mongoose=require('mongoose');  
var Schema = mongoose.Schema;
var path=require('path');
var OrderSchema = new Schema({    
    list: [{
        type:Schema.Types.ObjectId,
        ref:'ItemSchema',
        required:true
    }],
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'UserSchema'
    },
    confirmed:{
        type:String,
    },
    mobile:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    delivered:{
        type:String,
    }
},{timestamps:true});

var Order = mongoose.model('OrderSchema', OrderSchema);
module.exports=Order;