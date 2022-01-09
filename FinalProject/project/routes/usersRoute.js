var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs'); // for hashing passwords
var User = require('../models/user'); // for user model
var Question = require('../models/question'); // for question model
var Answer = require('../models/answer'); // for answer model
var Upvote = require('../models/upvote'); // for upvote model
const jwt = require('jsonwebtoken'); // for creating and verifying tokens
var validator = require("email-validator"); // for validating email
require('dotenv').config() // for accessing environment variables


// Login feature
router.post('/login', async function(req, res) {

  let {username, password} = req.body;

  // check if user exists by searching for username
  var emailExists = await User.findOne({username});  

  if(!emailExists)
    return res.status(401).send({message: "This username does not exist"});
    
  // check if password is correct
  const isMatch = await bcrypt.compare(password, emailExists.password);  

  if(!isMatch){
    res.status(401).send({message: "This password is incorrect"});
  }
  else{
    
    // create token 
    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET);

    res.status(200).send({message: "User logged in successfully", token: token});
  }

});


// Register feature
router.post('/register', async function(req, res) {

  let name = req.body['registeration-name'];
  let {username, password} = req.body;  

  // to hash the password. 10 is the number of rounds of hashing
  const salt = await bcrypt.genSalt(10); 

  // 'hashedPassword' is the hashed password
  const hashedPassword = await bcrypt.hash(password, salt); 

  let user = new User({
    name, 
    username,
    password: hashedPassword
  }) 

  try{

    // check if username already exists
    var emailExists = await User.exists({username}); 

    if(emailExists) 
      return res.status(401).send({message: "This Email is already registered", "email": username}); 

    // check if email is valid
    var emailValid = validator.validate(username); 

    if(!emailValid)
      return res.status(400).send({message: "This Email is not valid", "email": username});

    // save user to database
    var SavedUser = await user.save();

    res.status(201).send({message: "”User Registered Successfully", "registeration-name": SavedUser.name});
  }
  catch(error){
    res.status(401).json({message: "Error in registering user", error});
  }

});


// Ask a question feature
router.post('/question', validateUser, async (req, res) => {

  try{

    var user_details = req.body['user-details'];
    let {username} = user_details;
    let {question} = req.body;

    currentUser = await User.findOne({username: username});

    let new_question = new Question({ 
      username: currentUser,
      title: question.title,
      body: question.body
    });

    try{

      // save the question
      var SavedQuestion = await new_question.save();

      res.status(201).send({message: "Question posted successfully", "question-id":SavedQuestion.question_id})
    }
    catch(error){
      res.status(401).send({message: "Error in saving question"});
    }
  }
  catch(error){
    res.status(401).send({message: "Sorry invalid user details", error});
  }

});


// Answer a question feature
router.post('/question/:question_id/answer', validateUser, async (req, res) => {

  try{

    var user_details = req.body['user-details'];
    let {question} = req.body;
    var currentQuestion_id = question['question-id'];
    let currentAnswer = question.answer;

    // Retrieve the appropriate question and user
    var currentUser = await User.findOne({username: user_details.username});
    var questionAsked = await Question.findOne({question_id: currentQuestion_id});

    let answer = new Answer({
      question_id: questionAsked,
      username: currentUser,
      answer: currentAnswer
    });

    // Save the answer
    await answer.save();

    res.status(201).send({message: "Answer posted successfully", "question-id": currentQuestion_id});
  }
  catch(error){
    res.status(401).send({message: "Sorry invalid user details"});
  }

});


// Update an answer feature
router.patch('/question/:question_id/answer', validateUser, async (req, res) => {

  try{

    var user_details = req.body['user-details'];
    let {question} = req.body;
    var currentQuestion_id = question['question-id'];
    let currentAnswer = question.answer;

    var currentUser = await User.findOne({username: user_details.username});
    var questionAsked = await Question.findOne({question_id: currentQuestion_id});

    // Update the answer
    await Answer.findOneAndUpdate({question_id: questionAsked, username: currentUser}, {answer: currentAnswer});

    res.status(200).send({message: "Answer updated successfully", "question-id": currentQuestion_id});
  }
  catch(error){
    res.status(401).send({message: "Sorry invalid user details"});
  }

});


// Get all the answers for a question feature
router.get('/question/:question_id', validateUser, async (req, res) => {

  var question_id = req.params.question_id; 
  
  // Retrieve the question object
  var question = await Question.findOne({question_id: question_id});

  var answer_list = [];

  Answer.find({question_id: question}, (err, answers) => {

    // Iterate through the answers and push them to the answer_list
    answers.map(answer => {
      answer_list.push({answer: answer.answer});
    });

    res.status(200).send({"question": question.title, "answers": answer_list});
  });

});


// Get all the answers of all the questions feature
router.get('/questions/all', validateUser, async (req, res) => {

  var response =  [];
  var answer_list = [];

  // Retrieve all the questions
  var questions = await Question.find({});

  // Iterate through the questions and get the answers
  for(var i=0; i<questions.length; i++){

    var question = questions[i];

    // Retrieve all the answers for the question
    var answers = await Answer.find({question_id: question});

    // Iterate through the answers and push them to the answer_list
    for(var j=0; j<answers.length; j++){

      var answer = answers[j];
      answer_list.push({answer: answer.answer});
    }

    response.push({question: question.title, answers: answer_list});
    answer_list = [];
  }

  res.status(200).send(response);
});


// Get all users feature
router.get('/all', validateUser, async (req, res) => {

  try{
    
    // Retrieve all the users
    var userInfo = await User.find({});
    
    res.status(201).send({message: "User Info", userInfo});
  }
  catch(error){
    res.status(401).send({message: "Error in getting user info"});
  }

});


// Upvote a question feature
router.post('/question/:question_id/upvote', validateUser, async (req, res) => {

  try{
      
      var user_details = req.body['user-details'];
      var currentQuestion_id = req.params.question_id; 
  
      var currentUser = await User.findOne({username: user_details.username});
      var questionAsked = await Question.findOne({question_id: currentQuestion_id});

      const questionAskedBy = questionAsked.username.toString();
      const currentUsername = currentUser._id.toString();

      // check if the user is upvoting their own question
      if(questionAskedBy == currentUsername)
        return res.status(401).send({message: "Sorry you cannot upvote your own question"});

      // User doesn't have enough reputation points
      if(currentUser.reputation < 10)
        return res.status(401).send({message: "Sorry you don't have enough reputation to upvote"});

      var upvoted = await Upvote.findOne({question_id: questionAsked, username: currentUser});

      // if user has already upvoted the question
      if(upvoted)
        return res.status(401).send({message: "Sorry you have already upvoted this question"});

      // Update the upvotes of the question
      var UpdatedQuestion = await Question.findOneAndUpdate({question_id: currentQuestion_id}, { $inc: {upvotes: 1 } }, {new: true});

      // Update the reputation of the user
      await User.findOneAndUpdate({_id: questionAsked.username}, { $inc: {reputation: 10 } });

      let upvote = new Upvote({
        question_id: questionAsked,
        username: currentUser,
      });

      // Save the upvote
      await upvote.save();

      res.status(200).send({message: "Question upvoted successfully", "question-id": currentQuestion_id, "upvotes": UpdatedQuestion.upvotes});
    }
    catch(error){
      res.status(401).send({message: "Sorry invalid user details"});
    }

});


// Upvote an answer feature
router.post('/answer/:answer_id/upvote', validateUser, async (req, res) => {

  try{
      
      var user_details = req.body['user-details'];
      var currentAnswer_id = req.params.answer_id; 
  
      var currentUser = await User.findOne({username: user_details.username});
      var answergiven = await Answer.findOne({answer_id: currentAnswer_id});

      const answerGivenBy = answergiven.username.toString();
      const currentUsername = currentUser._id.toString();

      // check if the user is upvoting their own answer
      if(answerGivenBy == currentUsername)
        return res.status(401).send({message: "Sorry you cannot upvote your own answer"});

      // User doesn't have enough reputation points
      if(currentUser.reputation < 10)
        return res.status(401).send({message: "Sorry you don't have enough reputation to upvote"});

      var upvoted = await Upvote.findOne({answer_id: answergiven, username: currentUser});

      // if user has already upvoted the answer
      if(upvoted)
        return res.status(401).send({message: "Sorry you have already upvoted this answer"});

      // Update the upvotes of the answer
      var UpdatedAnswer = await Answer.findOneAndUpdate({answer_id: currentAnswer_id}, { $inc: {upvotes: 1 } }, {new: true});

      // Update the reputation of the user
      await User.findOneAndUpdate({_id: answergiven.username}, { $inc: {reputation: 10 } });

      let upvote = new Upvote({
        answer_id: answergiven,
        username: currentUser,
      });

      // Save the upvote
      await upvote.save();

      res.status(200).send({message: "Answer upvoted successfully", "answer-id": currentAnswer_id, "upvotes": UpdatedAnswer.upvotes});
    }
    catch(error){
      res.status(401).send({message: "Sorry invalid user details"});
    }

});


// Edit a question feature
router.patch('/question/:question_id/edit', validateUser, async (req, res) => {

  try{

    var user_details = req.body['user-details'];
    var currentQuestion_id = req.params.question_id; 
    let {question} = req.body;
  
    var currentUser = await User.findOne({username: user_details.username});

    // check if the user has enough reputation points
    if(currentUser.reputation < 20)
      return res.status(401).send({message: "Sorry you don't have enough reputation to edit this question"});

    // Update the question
    var UpdatedQuestion = await Question.findOneAndUpdate({question_id: currentQuestion_id}, 
      { $set: {title: question.title, body: question.body} }, {new: true});

    res.status(200).send({message: "Question updated successfully", "question-id": UpdatedQuestion.question_id,
     "title": UpdatedQuestion.title, "body": UpdatedQuestion.body});
  }
  catch(error){
    res.status(401).send({message: "Sorry invalid user details"});
  }

});


// Edit an answer feature
router.patch('/answer/:answer_id/edit', validateUser, async (req, res) => {

  try{

    var user_details = req.body['user-details'];
    var currentAnswer_id = req.params.answer_id; 
    let {answer} = req.body;

    var currentUser = await User.findOne({username: user_details.username});

    // check if the user has enough reputation points
    if(currentUser.reputation < 20)
      return res.status(401).send({message: "Sorry you don't have enough reputation to edit this question"});

    // Update the answer
    var UpdatedAnswer = await Answer.findOneAndUpdate({answer_id: currentAnswer_id}, 
      { $set: {answer: answer.answer} }, {new: true});

    res.status(200).send({message: "Answer updated successfully", "answer-id": UpdatedAnswer.answer_id, 
     "answer": UpdatedAnswer.answer});
  }
  catch(error){
    res.status(401).send({message: "Sorry invalid user details"});
  }

});



// Function to validate user
function validateUser(req, res, next) {
    
  // Get the user details
  const authHeader = req.headers['authorization'];

  // Retrieve jwt token from the authorization header
  // Format of Authorization: Bearer <token>
  const jwtToken = authHeader && authHeader.split(' ')[1];

  jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
    
    if(result)
      next();
    else
      res.status(401).send({message: "Login to continue"});
  });
}


module.exports = router;