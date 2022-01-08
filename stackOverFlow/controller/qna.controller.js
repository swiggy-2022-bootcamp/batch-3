const {
  createQuestion,
  createAnswer,
  getAnswers,
} = require("../service/qna.service");

const createQuestionController = async (req, res, next) => {
  try {
    const { question } = req.body;
    const { title, body } = question;

    const questionId = await createQuestion(title, body, req);
    res.status(201).json({
      questionId,
      message: "Question posted successfully!",
    });
  } catch (e) {
    // console.error(e);
    return res.json({ ...e });
  }
};

const createAnswerController = async (req, res, next) => {
  try {
    const { question } = req.body;
    const { questionId, answer } = question;

    const response = await createAnswer(questionId, answer, req);
    res.status(201).json({
      questionId,
      message: "Answer posted successfully!",
    });
  } catch (e) {
    // console.error(e);
    return res.json({ ...e });
  }
};

const getAnswersController = async (req, res, next) => {
  try {
    const response = await getAnswers();
    res.status(200).json({
      response,
      message: "Answer fetched successfully!",
    });
  } catch (e) {
    // console.error(e);
    return res.json({ ...e });
  }
};

module.exports = {
  createQuestionController,
  createAnswerController,
  getAnswersController,
};
