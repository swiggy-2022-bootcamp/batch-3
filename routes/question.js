const router = require("express").Router();
const { User } = require("../models/user.model");
const { Question } = require("../models/question.model");
const { loginRequired } = require('../middlewares/loginRequired');
const {
  QUESTION_POSTED_SUCCESS,
  USER_LOGIN_FAILED,
  USER_AUTHORIZATION_FAILED,
} = require("../utils/constants");

router.post("/ask", loginRequired ,async (req, res) => {
  const { title, body } = req.body.question;

  try {
    const queBody = {
      title: title,
      body: body,
      UserId: req.user.id,
    };
    const question = await req.user.createQuestion(queBody);
    return res.status(201).json({
      message: QUESTION_POSTED_SUCCESS,
      "question-id": question.question_id,
    });
  } catch (error) {
    console.log(error)
    return res.status(406).json({
      message: "Question Not Posted.",
    });
  }
});

router.get("/questions", async (req, res) => {
  const user = await User.findOne({ where: { username: "sachinsom3" } });
  const askedQues = await user.getQuestions();
  const response = {
    msg: "Successfull Fetch Questions",
    question: askedQues,
  };
  return res.json({ response });
});


router.post('/:question_id/answer', loginRequired ,async (req, res) => {

  // Get the Question ID
  const question_id = req.params.question_id;

  // Destructure answer
  const { _, answer } = req.body.answer;

  // Get the Question Instance
  const question = await Question.findByPk(question_id); // ERROR HANDLING

  // Add Answer instance to question insance
  const answerInstance = await question.createAnswer({ answer: answer }) // ERROR HANDLING

  return res.status(201).json({
    message: 'Answer Posted Succesfully',
    "question-id": question_id
  });

})
module.exports = router;
