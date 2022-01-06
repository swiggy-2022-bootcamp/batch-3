const express = require('express');
const layouts=require("express-ejs-layouts");
const path=require('path');
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const app=express();
const PORT=4000;

app.use(cookieParser());
app.use(layouts);

app.use(require("./middlewares/authenticateMiddleware").authenticate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/Views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('./assets'));


app.use('/',require("./Router/index.js"));

app.listen(PORT,function(err)
{
   console.log("Server Listening on Port:",PORT)
})