const { castVote } = require("../service/upvote.service");

const castVoteController = async (req, res, next) => {
  try {
    const { id, isUpvote, isQuestionUpvote } = req.body;

    const commentId = await castVote(
      id,
      isUpvote,
      isQuestionUpvote,
      req.user.userId
    );
    res.status(201).json({
      message: "Casted Vote successfully!",
    });
  } catch (e) {
    // console.error(e);
    return res.json({ ...e });
  }
};

module.exports = { castVoteController };
