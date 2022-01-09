var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require("../models/user");
const Mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var Food = require("../models/food");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// New user registration API - To register the user with basic details
router.post("/register", async function (req, res, next) {
  let { _id, username, email, password, address } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = new User({
    _id,
    username,
    email,
    password: hashedPassword,
    address,
  });
  try {
    // Checking whether it is an existing user or not.
    //ID check
    var idExist = await User.findOne({ _id });
    if (idExist) {
      return res.json({ msg: "ID already exists...Please use another ID." });
    }
    // Email check
    var emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({
        msg: "Email already exists...Please use another email",
      });
    }
    // Username check
    var usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.json({
        msg: "Username already used...Please use another username.",
      });
    }
    //After verification, Save the User in DB
    var saveduser = await user.save();
    //return SUCCESS status code
    res.status(201).json(saveduser);
  } catch (error) {
    //Return error message if any error occurs
    res.json({ msg: "Failed to register!", error });
  }
});

// User Authentication API - To validate the user is registered in the system
router.post("/authenticate", async function (req, res, next) {
  //1. Get the User ID And password from request
  let { username, password } = req.body;
  //2. Check existance in DB. If User is not Exist , send a message to register
  var usernameExist = await User.find({ username });
  if (!usernameExist) {
    res
      .json({
        msg: "Invalid username! If you are a new user...please register first",
      })
      .status(403);
  } else {
    const validpass = await bcrypt.compare(
      req.body.password,
      usernameExist[0].password
    );
    if (!validpass)
      res.status(403).json({ message: "Invalid Password! Try Again." });
    //3. Assign token to the valid user
    const token = jwt.sign({ username }, "some secret");
    res.header("auth-token", token);
    res.status(200).json({ message: "User logged in Successfully" });
  }
});
// Fetch All users API - To get all the users who are registered to the system, the end point should return an array
router.get("/users", async function (req, res, next) {
  try {
    var userinfo = await User.find({});
    res.status(200).json(userinfo);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed to return all users." }).status(204);
  }
});

// Fetch user by "id" parameter API -To return user by specifying id When valid
router.get("/users/:userID", async function (req, res, next) {
  // Get the user having specified id
  let findUser = req.params.userID;
  let checkUser = await User.findById(findUser);
  if (checkUser) {
    //if present return the user
    return res.status(200).json(checkUser);
  } else {
    // return error message
    res
      .json({ message: "Sorry, user with Id " + findUser + " not found." })
      .status(204);
  }
});

// Update user by "id" parameter API - To update the given user having the specified id
router.put("/users/:userID", async function (req, res, next) {
  //Get User details from Request
  let { _id, username, email, password, address } = req.body;
  //Hash the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Check if User is present.
  try {
    var idExist = await User.findById(_id);
    console.log(_id);
    if (!idExist) {
      return res
        .status(400)
        .json({ msg: "User with ID " + _id + " not found." });
    }
    //Update user details
    await User.findByIdAndUpdate(_id, {
      _id,
      username,
      email,
      password: hashedPassword,
      address,
    });
    res.status(200).json({ msg: "User Details Updated." });
  } catch (error) {
    res.status(400).json({ msg: "Failed to Update.", error });
  }
});

// user delete API - Should delete the user which is specified in the :userID
router.delete("/users/:userID", async function (req, res, next) {
  //get the user from request
  let delUser = req.params.userID;
  //check if user is present
  let checkUser = await User.findById(delUser);
  if (checkUser) {
    // delete the user if conditions are met
    await User.deleteOne({ _id: delUser });
    // return success message
    res.json({ message: "User deleted successfully!" }).status(200);
  } else {
    //return error message
    res
      .json({ message: "Sorry, user with Id " + delUser + " not found." })
      .status(204);
  }
});

// Food API - To add a new food to the system.
router.post("/food", async (req, res, next) => {
  // Get food details from the body
  let { foodId, foodName, foodCost, foodType } = req.body;
  // Create new Food DB object
  let food = new Food({ foodId, foodName, foodCost, foodType });
  try {
    //Check if food item is existing or not
    var idExist = await Food.findOne({ foodId });
    if (idExist) {
      return res.json({ message: "Food id already used." });
    }
    // Save new food object in DB
    var savedFood = await food.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.json({ msg: "Failed to add new food!", error });
  }
});

//Fetch food item by "id" parameter API -To return food item by specifying id when valid
router.get("/food/:foodID", async (req, res, next) => {
  //fetching the required food item by id
  let findFood = req.params.foodID;
  // checking if the food Item is present or not
  let checkFood = await Food.findOne({ foodId: findFood });
  if (checkFood) {
    //if present returning the food object
    return res.status(200).json(checkFood);
  } else {
    //else showing error message
    res.json({ message: "Sorry, food not found." }).status(204);
  }
});

module.exports = router;
