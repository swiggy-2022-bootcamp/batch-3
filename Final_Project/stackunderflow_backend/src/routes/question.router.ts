import express from "express";
import QuestionController from "../controllers/question.controller";

const questionRouter = express.Router();

const auth = require("../middleware/auth");

// Route: /question: To ask the question 
questionRouter.post("/", auth, async (req, res) => {
  const controller = new QuestionController();
  await controller.postQuestion(req, res);
});

// Route: /question/{questionId}/answer: To answer the question with given question id
questionRouter.post("/:questionId/answer", auth, async (req, res) => {   
  const controller = new QuestionController();
  await controller.postAnswer(req, res);
});

questionRouter.get("/:questionId/upvote", auth, async (req, res) => {   
  const controller = new QuestionController();
  await controller.upvoteQuestion(req, res);
});

questionRouter.get("/:questionId/downvote", auth, async (req, res) => {   
  const controller = new QuestionController();
  await controller.downvoteQuestion(req, res);
});

questionRouter.put("/:questionId/answer", auth, async (req, res) => {
  const controller = new QuestionController();
  await controller.updateAnswer(req, res);
});

// Route: /question/{questionId}: To get answers for given question id
questionRouter.get("/:questionId/answer/all", auth, async (req, res) => {
  const controller = new QuestionController();
  await controller.getAllAnswerForQuestion(req, res);
});

questionRouter.put("/:questionId/edit", auth, async (req, res) => {
  const controller = new QuestionController();
  await controller.editQuestion(req, res);
});

questionRouter.put("/:questionId", auth, async (req, res) => {
  const controller = new QuestionController();
  await controller.updateQuestion(req, res);
});

export default questionRouter;
