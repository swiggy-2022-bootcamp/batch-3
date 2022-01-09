const mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema=mongoose.Schema({
    _id:{
        type:String
    },
    username:{
        type:String,
        required:true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: [validateEmail, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    address:{
        houseno:{
            type:String,
            required:true
        },
        street:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        zip:{
            type: Number,
            required:true,
            length:6
        }
    }
},
{ _id: false });


module.exports = mongoose.model("user", UserSchema);