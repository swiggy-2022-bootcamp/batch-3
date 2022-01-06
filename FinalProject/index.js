const express = require('express');
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const app=express();
const PORT=4000;

app.use(cookieParser());

app.use(require("./middlewares/authenticateMiddleware").authenticate)

app.use(express.urlencoded({extended: true}));



app.use('/',require("./Router/index.js"));

app.listen(PORT,function(err)
{
   console.log("Server Listening on Port:",PORT)
})