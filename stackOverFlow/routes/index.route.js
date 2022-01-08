const app = require("../server");
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

router.route("/register").post(createUserController);
router.route("/login").post(logInUserController);
router.route("/question").post(verifyToken, createQuestionController);
router.route("/answer").post(verifyToken, createAnswerController);
router.route("/question/:questionId").get(verifyToken, getAnswersController);
router.route("/comment").post(verifyToken, createCommentsController);

module.exports = router;
