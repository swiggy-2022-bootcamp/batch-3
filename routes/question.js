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
  ANSWER_VOTED_SUCCESS,
  ANSWER_DOWNVOTED_SUCCESS,
  QUESTION_VOTED_SUCCESS,
  QUESTION_DOWNVOTED_SUCCESS,
} = require("../utils/constants");
const { hasAnswered } = require('../middlewares/hasAnswered');
const { isAuthorized } = require('../middlewares/isAuthorized');


/**
 * POST: Route for asking a question
 */
router.post("/ask",
  loginRequired,
  isAuthorized,
  async (req, res) => {
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


/**
 * POST: Route getting all answers (temp)
 */
router.post("/all",
  loginRequired,
  isAuthorized,
  async (req, res) => {
  const user = req.user;
  try {

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
  }
  catch (err) {
    console.log(err)
    res.json({msg: err.message})
  }
});



/**
 * POST: Route for answering a question
 * parameters: question_id, answer_id
 */
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
      console.log(error.message)
      return res.status(401).json({
        message: ANSWER_POSTED_FAILED,
    });
  }
});



/**
 * PUT: Route for updating an answer
 * parameters: question_id
 */
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



/**
 * PUT: Route for up voting an answer
 * parameters: question_id, answer_id
 */
router.put('/:question_id/answer/:answer_id/upvote',
  loginRequired,
  isAuthorized,
  async (req, res, next) => {
  const answer_id = req.params.answer_id;
  const answerObj = await Answer.findByPk(answer_id);
  const user = req.user;
  try {
    await answerObj.upVote(user.id);
    await answerObj.save();
    return res.status(201).json({
      message: ANSWER_VOTED_SUCCESS,
      "answer-id": answerObj.answer_id
    })
  }
  catch(error) {
    error.status = 401;
    next(error);
  }

})



/**
 * PUT: Route for down voting an answer
 * parameters: question_id, answer_id
 */
router.put('/:question_id/answer/:answer_id/downvote',
  loginRequired,
  isAuthorized,
  async (req, res, next) => {
  const answer_id = req.params.answer_id;
  const answerObj = await Answer.findByPk(answer_id);
  const user = req.user;
  try {
    await answerObj.downVote(user.id);
    await answerObj.save();
    return res.status(201).json({
      message: ANSWER_DOWNVOTED_SUCCESS,
      "answer-id": answerObj.answer_id
    })
  }
  catch(error) {
    error.status = 401;
    next(error);
  }

})



/**
 * PUT: Route for up voting an question
 * parameters: question_id, answer_id
 */
router.put('/:question_id/upvote',
  loginRequired,
  isAuthorized,
  async (req, res, next) => {
  const question_id = req.params.question_id;
  const questionObj = await Question.findByPk(question_id)
  const user = req.user;
  try {
    await questionObj.upVote(user.id);
    await questionObj.save();
    return res.status(201).json({
      message: QUESTION_VOTED_SUCCESS,
      "question-id": questionObj.question_id
    })
  }
  catch(error) {
    error.status = 401;
    next(error);
  }
})



/**
 * PUT: Route for down voting an question
 * parameters: question_id
 */
router.put('/:question_id/downvote',
  loginRequired,
  isAuthorized,
  async (req, res, next) => {
  const question_id = req.params.question_id;
  const questionObj = await Question.findByPk(question_id)
  const user = req.user;
  try {
    await questionObj.downVote(user.id);
    await questionObj.save();
    return res.status(201).json({
      message: QUESTION_DOWNVOTED_SUCCESS,
      "question-id": questionObj.question_id
    })
  }
  catch(error) {
    error.status = 401;
    next(error);
  }
})


module.exports = router;
