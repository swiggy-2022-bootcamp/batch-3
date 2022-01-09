var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = require("../models/userModel");
var Question = require("../models/questionModel");
var Answer = require("../models/answerModel");
const { response } = require("../app");

var router = express.Router();

// ---------------------------------ROUTES-------------------------------------------

// get all answers for all questions
router.get("/", userValidator, async (req, res) => {
  var questionslist = await Question.find();
  if (!questionslist) return res.json({ message: "No questions are present." });

  var response = [];
  for (const question of questionslist) {
    var answerslist = await Answer.find(
      { questionID: question._id },
      "body -_id"
    );
    var user = await User.findOne({ _id: question.userID });

    response.push({
      title: question.title,
      body: question.body,
      askedBy: user.username,
      answers: answerslist,
    });
  }

  res.json({ questions: response });
});

// get answers for a specific question
router.get("/:questionID", userValidator, async (req, res) => {
  var question = await Question.findById(req.body.questionID);
  if (!question)
    return res.status(404).json({ message: "Question does not exist." });

  var answerslist = await Answer.find(
    { questionID: question._id },
    "body -_id"
  );
  var user = await User.findOne({ _id: question.userID });
  console.log(user);
  res.json({
    title: question.title,
    body: question.body,
    askedBy: user.username,
    answers: answerslist,
  });
});

// answer a question
// req.body has parameters {userdetails, question}
router.post("/:questionID/answer", userValidator, async (req, res) => {
  const { question, userdetails } = req.body;
  var questionExist = await Question.findOne({ _id: question.questionID });
  if (!questionExist) {
    res.status(404).json({ message: "Question does not Exist" });
  }

  var user = await User.findOne({ username: userdetails.username });

  // check if the user has already answered the question
  var answerExist = await Answer.findOne({ userID: user._id });
  if (answerExist) {
    res.json({
      message:
        "This question is already answered by you. You can edit the existing answer.",
    });
  }

  // create new answer
  var answer = new Answer({
    userID: user._id,
    questionID: question.questionID,
    body: question.answer,
  });

  try {
    await answer.save();
    res.status(201).json({
      message: "Answer Posted Successfully",
      questionID: question.questionID,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in database operation", error });
  }
});

// update answer
// req.body has parameters {userdetails, question}
router.patch("/:questionID/answer", userValidator, async (req, res) => {
  const { question, userdetails } = req.body;

  try {
    var questionExist = await Question.findOne({ _id: question.questionID });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ERROR: Question ID format is wrong.", error });
  }

  if (!questionExist) {
    res.status(404).json({ message: "Question does not Exist" });
  }

  var user = await User.findOne({ username: userdetails.username });

  var answerExist = await Answer.findOne({ userID: user._id });
  console.log("answerexist:: ", answerExist);
  if (!answerExist) {
    res.status(404).json({
      message: "User has not answered this question yet. Cannot update",
      questionID: question.questionID,
    });
  }

  try {
    await Answer.updateOne({ userID: user._id }, { body: question.answer });
    res.status(201).json({
      message: "Answer updated successfully",
      questionID: question.questionID,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in database operation", error });
  }
});

// --------------------------------MIDDLEWARE------------------------------------------

// this middleware validates username and password
async function userValidator(req, res, next) {
  var { userdetails, question } = req.body;
  // if userdetails is present in body, then the request is coming
  // from question route else it is coming from login route.
  if (userdetails) {
    ({ username, password } = userdetails);
  }

  // check if the user exists
  var userExist = await User.findOne({ username });
  if (!userExist)
    return res.status(401).json({
      message: "User does not exist",
      question: question.questionID,
    });
  else {
    // if user exists then check if password is correct
    const validpass = await bcrypt.compare(password, userExist.password);
    if (!validpass)
      return res.status(401).send({
        message: "Password is invalid",
        question: question.questionID,
      });

    // if password is correct then proceed to next()
    next();
  }
}

module.exports = router;
