var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    reputation:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Users", UserSchema);