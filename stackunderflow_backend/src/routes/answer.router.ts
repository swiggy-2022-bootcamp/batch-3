import express from "express";

import AnswerController from "../controllers/answer.controller";

const answerRouter = express.Router();

const auth = require("../middleware/auth");

answerRouter.get("/:answerId/upvote", auth, async (req, res) => {   
  const controller = new AnswerController();
  await controller.upvoteAnswer(req, res);
});

answerRouter.get("/:answerId/downvote", auth, async (req, res) => {   
  const controller = new AnswerController();
  await controller.downvoteAnswer(req, res);
});

export default answerRouter;
