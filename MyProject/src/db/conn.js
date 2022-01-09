const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/FoodApplication",{
    // useCreateIndex: true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(()=>{
    console.log("Successful Connection with database");
}).catch((e)=>{
    console.log("Connection with database Failed");
});