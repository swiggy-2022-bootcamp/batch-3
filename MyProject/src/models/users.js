const mongoose=require("mongoose");
const validator=require("validator");
const addresses=require("./addresses");

const userSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:'Id is required.',
        unique:[true,"Id should be unique"]
    },
    username: {
        type: String,
        required:'Name is mandatory',
        minlength:[3,'Name length should be greater than 3'] 
        
    },
    email:{
    type:String,
    required:'Email is mandatory',
    unique:[true,"Email id should be unique"],
        validate(value){
            if(!validator.isEmail(value))
            throw new Error("Invalid Email");
        }
    },
    password: {
    type:String,
    required:'Password needed'
    },
    address:{
    type: addresses,
    required:'Address is required.'
    }
});

const User=new mongoose.model('User',userSchema);
module.exports=User;