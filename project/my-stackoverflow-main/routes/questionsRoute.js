var express = require("express");
var router = express.Router();
var Question = require("../models/question");
const jwt = require("jsonwebtoken");
var uniqid = require("uniqid");

//
router.get("/", function (req, res, next) {
  Question.find({}, function (err, docs) {
    if (!err) {
      // res.send(docs);
      docs.forEach((element) => {
        res.write(element.question, element.answer);
      });
      res.end();
    } else {
      console.log("Failed to retrieve the Questions List: " + err);
    }
  });
});

//To display a single question
router.get("/displayQ", async function (req, res) {
  let { question } = req.body;

  try {
    var quesExist = await Question.findOne({ question });
    if (quesExist) {
      // console.log(quesExist);
      res.write(quesExist.question, quesExist.answer);
      res.end();
    } else {
      res.json({ msg: "Question was not found. Add a new Question." });
    }
  } catch (err) {
    res.json({ msg: "Something is wrong ", err });
  }
});

//To create a question
router.post("/create", async function (req, res) {
  let { question } = req.body;
  let ques = new Question({ question });

  try {
    var quesExist = await Question.findOne({ question });
    if (quesExist) {
      return res.json({ msg: "Question is already here" });
    }
    var savedQues = await ques.save();
    res.json({ msg: "Question was added successfully", question: savedQues });
  } catch (err) {
    res.json({ msg: "Something is wrong ", err });
  }
});

router.post("/answer", async function (req, res) {
  let { question, answer } = req.body;

  try {
    var quesExist = await Question.findOne({ question });
    if (quesExist) {
      let answerArr = quesExist.answer;
      answerArr.forEach((element) => {
        if (element == answer) {
          res.json({ msg: "Answer exists. Add a new Answer." });
        }
      });
      quesExist.answer.push(answer);
      quesExist.save();
      res.json({ msg: "Answer was added successfully", question: quesExist });
    } else {
      res.json({ msg: "Question was not found. Add a new Question." });
    }
  } catch (err) {
    res.json({ msg: "Something is wrong ", err });
  }
});

router.post("/delete", function (req, res) {
  const deleteQ = req.body.question;

  try {
    Question.findByIdAndRemove({
      deleteQ,
      function(err) {
        if (err) {
          console.log("Question wasnt found.");
        }
      },
    });
    res.json({ msg: "Question was deleted successfully" });
  } catch (err) {
    res.json({ msg: "Something is wrong ", err });
  }
});

module.exports = router;
