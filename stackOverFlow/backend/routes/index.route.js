const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const {
  createUserController,
  logInUserController,
} = require("../controller/user.controller");
const {
  createQuestionController,
  createAnswerController,
  getAnswersController,
} = require("../controller/qna.controller");
const {
  createCommentsController,
} = require("../controller/comment.controller");
const { castVoteController } = require("../controller/upvote.controller");

router.route("/register").post(createUserController);
router.route("/login").post(logInUserController);
router.route("/question").post(verifyToken, createQuestionController);
router
  .route("/question/:questionId/answer")
  .post(verifyToken, createAnswerController);
router.route("/question/:questionId").get(verifyToken, getAnswersController);
router.route("/comment").post(verifyToken, createCommentsController);
router.route("/vote").post(verifyToken, castVoteController);

module.exports = router;
