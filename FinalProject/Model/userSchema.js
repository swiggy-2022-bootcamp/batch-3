const mongoose=require('mongoose');  
var Schema = mongoose.Schema;
var path=require('path');
 

var userSchema = new Schema({
     // String is shorthand for {type: String}
    username:{type: String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    houseno:{type:Number,required:true},
    street:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    zip:{type:String,required:true}
});
  
var User = mongoose.model('UserSchema', userSchema);
module.exports=User;