//requiring mongoose and connecting it to database(MongoDB)
var mongoose = require('mongoose');
const logger=require("./../config/logger.js");

// establishing the connection between the server and database server
var db=mongoose.connect('mongodb://127.0.0.1/testdb').then(() => {
logger.info("Connected to Database");
}).catch((err) => {
    logger.error("Not Connected to Database ERROR! ", err);
});

module.exports=db