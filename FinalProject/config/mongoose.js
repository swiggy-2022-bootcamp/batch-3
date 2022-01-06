//requiring mongoose and connecting it to database(MongoDB)
var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://127.0.0.1/testdb').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

module.exports=db