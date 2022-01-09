const { createComments } = require("../service/comment.service");
const {
  CREATED_HTTP_STATUS_CODE,
  BAD_REQUEST_HTTP_STATUS_CODE,
} = require("../utils/constant");

const createCommentsController = async (req, res, next) => {
  try {
    const { id, isQuestionComment, comment } = req.body;

    const response = await createComments(
      id,
      isQuestionComment,
      comment,
      req.user.userId
    );
    res.status(CREATED_HTTP_STATUS_CODE).json({
      ...response,
    });
  } catch (e) {
    // console.error(e);
    return res.status(BAD_REQUEST_HTTP_STATUS_CODE).json({ ...e });
  }
};

module.exports = { createCommentsController };
