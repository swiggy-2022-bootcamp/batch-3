const router = require("express").Router();
const { User } = require("../models/user.model");
const { Question } = require("../models/question.model");
const {
  QUESTION_POSTED_SUCCESS,
  USER_LOGIN_FAILED,
  USER_AUTHORIZATION_FAILED,
} = require("../utils/constants");

router.post("/ask", async (req, res) => {
  const { username, password, title, body } = req.body;

  const isMatched = await User.checkPassword(username, password);

  if (!isMatched) {
    return res.status(401).json({
      message: USER_AUTHORIZATION_FAILED,
    });
  }

  try {
    const user = await User.findOne({where: {username}})
    const queBody = {
      title: title,
      body: body,
      UserId: user.id,
    };
    const question = await user.createQuestion(queBody);
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


router.post('/:question_id/answer',async (req, res) => {

  // Get the Question ID
  const question_id = req.params.question_id;

  // Get the Question Instance
  const question = await Question.findByPk(question_id);

  console.log(question);

  return res.json({msg: 'wait'});
})
module.exports = router;
