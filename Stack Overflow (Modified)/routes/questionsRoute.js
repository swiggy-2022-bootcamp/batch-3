var express = require("express");
var jwt = require("jsonwebtoken");
var User = require("../models/userModel");
var Question = require("../models/questionModel");
var Answer = require("../models/answerModel");
var router = express.Router();

// ---------------------------------ROUTES-------------------------------------------

// get list of all questions
router.get("/", userAuthentication, async (req, res) => {
  var questionslist = await Question.find();

  var response = [];
  for (const question of questionslist) {
    var user = await User.findOne({ _id: question.userID });
    response.push({
      title: question.title,
      body: question.body,
      askedBy: user.username,
    });
  }

  res.json({ questions: response });
});

//
//
//
// get list of answers for a question
router.get("/:questionID", userAuthentication, async (req, res) => {
  const questionID = req.params.questionID;

  //   check if the question exists
  try {
    var questionExist = await Question.findOne({ _id: questionID });
    if (!questionExist) {
      return res.status(404).json({ message: "Question does not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Question ID Error", error });
  }

  //   create list of answers
  const answerslist = await Answer.find({ questionID });
  var response = [];
  for (const answer of answerslist) {
    var user = await User.findOne({ _id: answer.userID });
    response.push({
      body: answer.body,
      author: user.username,
    });
  }

  res.json({
    title: questionExist.title,
    description: questionExist.body,
    answers: response,
  });
});
//
//
//
// post new question
router.post("/", userAuthentication, async (req, res) => {
  const { email, title, body } = req.body;
  const user = await User.findOne({ email });

  const question = new Question({ userID: user._id, title, body });

  try {
    await question.save();
    res.status(201).json({
      message: "Question Posted Successfully",
      questionID: question._id,
    });
  } catch (error) {
    res.status(500).json({ msg: "Some error occured", error });
  }
});

//
//
//
// post answer for a specific question
router.post("/:questionID/answer", userAuthentication, async (req, res) => {
  const { email, body } = req.body;
  const questionID = req.params.questionID;
  const user = await User.findOne({ email });

  //   check if the question exists
  try {
    var questionExist = await Question.findOne({ _id: questionID });
    if (!questionExist) {
      return res.status(404).json({ message: "Question does not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Question ID Error", error });
  }

  // check if user has already answered this question
  const answerExist = await Answer.findOne({ userID: user._id, questionID });
  console.log(answerExist);
  if (answerExist) {
    return res.json({
      message:
        "This question is already answered by you. You can edit the existing answer.",
    });
  }

  //   create new answer
  const answer = new Answer({ questionID, userID: user._id, body });
  try {
    await answer.save();
    return res.status(201).json({
      message: "Answer Posted Successfully",
      questionID,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Some error occured", error });
  }
});

//
//
//
// update answer of a question
router.patch("/:questionID/answer", userAuthentication, async (req, res) => {
  const { email, body } = req.body;
  const questionID = req.params.questionID;
  const user = await User.findOne({ email });

  //   check if the question exists
  try {
    var questionExist = await Question.findOne({ _id: questionID });
    if (!questionExist) {
      return res.status(404).json({ message: "Question does not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Question ID Error", error });
  }

  // check if user has already answered this question
  const answerExist = await Answer.findOne({ userID: user._id, questionID });
  console.log(answerExist);
  if (!answerExist) {
    return res.json({
      message:
        "You have not answered this question yet. So you cannot update it.",
    });
  }

  // update the answer
  try {
    await Answer.updateOne({ userID: user._id, questionID }, { body: body });
    return res.status(201).json({
      message: "Answer Updated Successfully",
      questionID,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Some error occured", error });
  }
});

// --------------------------------MIDDLEWARE------------------------------------------

// this middleware handles jwt authentication
async function userAuthentication(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "mySecretKey", (err, result) => {
    if (result) {
      // add the email generated from jwt to req.body for further use
      req.body.email = result.email;
      next();
    } else
      res.status(401).json({ message: "Invalid Auth token. Login again." });
  });
}

module.exports = router;
