var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require("../models/user");
const Mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var Food= require("../models/food")

const maxAge = 3 * 24 * 60 * 60; //Lifetime of JSON Web Token

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//API to Register User
router.post("/register", async function (req, res, next) {
  //Get User details from Request
  let { _id, username, email, password, address } = req.body;
  //Hash the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Check if User is already present. If not, add user to database.
  let user = new User({ _id, username, email, password: hashedPassword, address });
  try {
    var idExist = await User.findById(_id);
    if (idExist) {
      return res.status(400).json({ msg: "ID is already used." });
    }
    var emailExist = await User.findOne({ email : email });
    if (emailExist) {
      return res.status(400).json({ msg: "Email-ID already used." });
    }
    var usernameExist = await User.findOne({ username : username});
    if (usernameExist) {
      return res.status(400).json({ msg: "Username already used." });
    }
    //Add User to DB.
    var saveduser = await user.save();
    res.status(201).json(saveduser);
  } catch (error) {
    res.status(400).json({ msg: "Failed to register.", error });
  }
});

//API to authenticate username and password
router.post("/authenticate", async function (req, res, next) {
  //Get the Username And password from request
  let { username, password } = req.body;
  //Check is user exists
  var usernameExist = await User.findOne({ username : username});
  //console.log(usernameExist)
  if (!usernameExist) {
    //Is user is not present
    res.status(403).json({ msg: "Username not found!" });
  } else {
    //If user exists, check if password is valid
    const validpass = await bcrypt.compare(password, usernameExist.password);
    if (!validpass) 
      return res.status(403).send("Invalid password");
    const token = jwt.sign({ username }, "somesecret"); //Create JSON Web Token 
    res.cookie("auth-token", token, { httpOnly: true, maxAge: maxAge * 1000 });//Send token as cookie
    res.status(200).json({ message: "User logged in Successfully" });
  }
});


//API to fetch all users
router.get("/users",async function (req, res, next) {
  try {
    //Fetch all users and return
    var userinfo = await User.find({});
    if(!userinfo)
    return res.status(400).json({msg:"No users exist" })
    res.status(200).json(userinfo);
  } catch (error) {
    //Incase of an error
    console.log(error)
    res.status(400).json({msg:"Failed to return all users." })
  }
});


//API to fetch details of a particular user
router.get("/users/:userID",async function(req,res,next){
  //Check if user exists
  let findUser=req.params.userID;
  //console.log(findUser);
  let checkUser=await User.findById(findUser);
  //console.log(checkUser);
  if(checkUser){
    return res.status(200).json(checkUser);
  }
  else{
    res.status(400).json({message:"Sorry, user with Id "+findUser+" not found."});
  }
});

//API to update details of a particular user
router.put("/users/",async function(req,res,next){
  //Get User details from Request
  let { _id, username, email, password, address } = req.body;
  //Hash the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Check if User is present.
  try {
    var idExist = await User.findById(_id);
    console.log(_id)
    if (!idExist) {
      return res.status(400).json({ msg: "User with ID "+_id+" not found." });
    }
    //Update user details
    var updateduser = await User.findByIdAndUpdate(_id,{ _id, username, email, password: hashedPassword, address });
    res.status(200).json("User Details Updated.");
  } catch (error) {
    res.status(400).json({ msg: "Failed to Update.", error });
  }
});


//API to delete a user
router.delete("/users/:userID",async function(req,res,next){
  //Accept UserID from request params
  let delUser=req.params.userID;
  //Check if user exists
  let checkUser=await User.findById(delUser);
  //console.log(delUser)
  //If exists, delete or else return failure message
  if(checkUser){
    await User.deleteOne({_id:delUser});
    res.status(200).json({message:"User deleted successfully!"});
  }
  else{
    res.status(400).json({message:"Sorry, user with Id "+delUser+" not found."});
  }
});

//API to add food 
router.post("/food",async (req,res,next)=>{
  //Get food details from request
  let {foodId,foodName, foodCost,foodType}=req.body;
  //console.log({foodId,foodName, foodCost,foodType});
  let food=new Food({foodId,foodName, foodCost,foodType});
  try{
    //Check is already exists
    var idExist=await Food.findOne({foodId});
    if(idExist){
      return res.status(400).json({message:"Food Id already used."});
    }
    //Add food to DB
    var savedFood=await food.save();
    res.status(201).json(savedFood);
  }
  catch(error){
     res.status(400).json({ msg: "Failed to add new food!", error });
 }
})

//API to fetch food by foodID
router.get("/food/:foodID",async (req,res,next)=>{
  //Get foodID from request
  let findFood=req.params.foodID;
  //check for existence of ID
  let checkFood=await Food.findOne({foodId:findFood});
  //if Exists return it else return failure message
  if(checkFood){
    return res.status(200).json(checkFood);
  }
  else{
    res.status(400).json({message:"Sorry, food not found."});
  }
})

module.exports = router;
