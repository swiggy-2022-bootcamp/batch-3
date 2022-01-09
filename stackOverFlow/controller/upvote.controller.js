const { castVote } = require("../service/upvote.service");
const {
  CREATED_HTTP_STATUS_CODE,
  BAD_REQUEST_HTTP_STATUS_CODE,
} = require("../utils/constant");

const castVoteController = async (req, res, next) => {
  try {
    const { id, isUpvote, isQuestionUpvote } = req.body;

    const response = await castVote(
      id,
      isUpvote,
      isQuestionUpvote,
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

module.exports = { castVoteController };
