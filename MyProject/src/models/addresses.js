const mongoose=require("mongoose");
const validator=require("validator");

const addressSchema=new mongoose.Schema( {
    houseno:{
        type:Number,
        required:'House Number is required.'
    },
    street: {
        type:String,
        required:'Street is required.'
    },
    city: {
        type:String,
        required:'City is required.'
    },
    state: {
        type:String,
        required:'State is required.'
    },
    zip: {
        type:Number,
        required:'Zip is required.'
    }
    });


    module.exports=addressSchema;