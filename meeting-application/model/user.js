var mongoose = require('mongoose');

var UserScheme=mongoose.Schema({
    registrationName:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    }
})

module.exports=mongoose.model('AuthUsers',UserScheme)