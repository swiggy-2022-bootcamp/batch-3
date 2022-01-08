const { createComments } = require("../service/comment.service");

const createCommentsController = async (req, res, next) => {
  try {
    const { id, isQuestionComment, comment } = req.body;

    const commentId = await createComments(
      id,
      isQuestionComment,
      comment,
      req.user.userId
    );
    res.status(201).json({
      commentId,
      message: "Comment posted successfully!",
    });
  } catch (e) {
    // console.error(e);
    return res.json({ ...e });
  }
};

module.exports = { createCommentsController };
