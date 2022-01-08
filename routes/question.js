const router = require("express").Router();
const { Question } = require("../models/question.model");
const { Answer } = require("../models/answer.model");
const { loginRequired } = require("../middlewares/loginRequired");
const { hasNotAnswered } = require('../middlewares/hasNotAnswered');
const {
  QUESTION_POSTED_SUCCESS,
  QUESTION_POSTED_FAILED,
  ANSWER_POSTED_SUCCESS,
  ANSWER_POSTED_FAILED,
  ANSWER_UPDATED_SUCCESS,
} = require("../utils/constants");
const { hasAnswered } = require('../middlewares/hasAnswered');
const { isAuthorized } = require('../middlewares/isAuthorized');



router.post("/ask", loginRequired, isAuthorized ,async (req, res) => {
  const { title, body } = req.body.question;
  try {
    const question = await req.user.createQuestion({
      title: title,
      body: body,
      UserId: req.user.id,
    });
    return res.status(201).json({
      message: QUESTION_POSTED_SUCCESS,
      "question-id": question.question_id,
    });
  } catch (error) {
    return res.status(401).json({
      message: QUESTION_POSTED_FAILED,
    });
  }
});



router.post("/all", loginRequired, isAuthorized,async (req, res) => {
  const user = req.user;
  const askedQues = await Question.findAll({
    include: Answer,
  });
  const response = {
    msg: "Successfull Fetch Questions",
    question: askedQues,
  };
  return res.json({
    response,
  });
});




router.post("/:question_id/answer",
  loginRequired,
  isAuthorized,
  hasNotAnswered,
  async (req, res) => {
    const question_id = req.params.question_id;
    const { _, answer } = req.body.question;

    try {
      const question = await Question.findByPk(question_id);
      await question.createAnswer({
        answer: answer,
        UserId: req.user.id
      });

      return res.status(201).json({
        message: ANSWER_POSTED_SUCCESS,
        "question-id": question_id,
      });
    }
    catch (error) {
      return res.status(401).json({
        message: ANSWER_POSTED_FAILED,
    });
  }
});




router.put("/:question_id/answer",
  loginRequired,
  isAuthorized,
  hasAnswered,
  async (req, res) => {
    const { _, answer } = req.body.question;
    req.answerObj.answer = answer;
    req.answerObj.save();
    return res.status(201).json({
      message: ANSWER_UPDATED_SUCCESS
  })
});



module.exports = router;
