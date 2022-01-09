const {
  createQuestion,
  createAnswer,
  getAnswers,
} = require("../service/qna.service");
const {
  CREATED_HTTP_STATUS_CODE,
  UNAUTHORIZED_HTTP_STATUS_CODE,
} = require("../utils/constant");

const createQuestionController = async (req, res, next) => {
  try {
    const { question } = req.body;
    const { title, body } = question;

    const userId = req.user.userId;

    const response = await createQuestion(title, body, userId);
    res.status(CREATED_HTTP_STATUS_CODE).json({
      ...response,
    });
  } catch (e) {
    // console.error(e);
    return res.status(UNAUTHORIZED_HTTP_STATUS_CODE).json({ ...e });
  }
};

const createAnswerController = async (req, res, next) => {
  try {
    const { question } = req.body;
    const { answer } = question;
    const { questionId } = req.params;

    const response = await createAnswer(questionId, answer, req);
    res.status(CREATED_HTTP_STATUS_CODE).json({
      ...response,
    });
  } catch (e) {
    // console.error(e);
    return res.status(UNAUTHORIZED_HTTP_STATUS_CODE).json({ ...e });
  }
};

const getAnswersController = async (req, res, next) => {
  try {
    const response = await getAnswers();
    res.status(CREATED_HTTP_STATUS_CODE).json({
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
