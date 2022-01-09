const express = require('express');
const jwt=require("jsonwebtoken");
const logger=require("./config/logger.js");
const cookieParser=require("cookie-parser");
require("./config/mongoose.js");
const PORT=require("./config/secret.js").PORT;

// Starting the server
const app=express();

// Middlewares to parse cookies and req.body
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

//Routing all the requests to index.js file in Router Folder
app.use('/',require("./Router/index.js"));

// Server listening to the port
app.listen(PORT,function(err)
{
   logger.info("Server Listening on Port:",PORT)
})