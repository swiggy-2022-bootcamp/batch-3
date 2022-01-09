const express = require('express');
const jwt=require("jsonwebtoken");
const logger=require("./config/logger.js");
const cookieParser=require("cookie-parser");
require("./config/mongoose.js");
const app=express();
const PORT=4000;


app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use('/',require("./Router/index.js"));
app.listen(PORT,function(err)
{
   logger.info("Server Listening on Port:",PORT)
})