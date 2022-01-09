const mongoose = require("mongoose");

//Function to validate Email ID
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//Schema to represent User in DB
var UserSchema=mongoose.Schema({
    _id:{
        type:String,
    },
    username:{
        type:String,
        required:[true,"Username is required."],
        unique: true,
    },
    email:{
        type:String,
        required:[true,"Email ID is required."],
        unique:true,
        validate: [validateEmail, "Please enter a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    address:{
        houseno:{
            type:String,
            required:[true,"Houseno is required"]
        },
        street:{
            type:String,
            required:[true,"Street is required"]
        },
        city:{
            type:String,
            required:[true,"City is required"]
        },
        state:{
            type:String,
            required:[true,"State is required"]
        },
        zip:{
            type: Number,
            required:[true,"Zip Code is required"],
            length:6
        }
    }
},//Custom _id used for User
{ _id: false });


module.exports = mongoose.model("user", UserSchema);