import express from "express";

import AnswerController from "../controllers/answer.controller";

const answerRouter = express.Router();

const auth = require("../middleware/auth");

answerRouter.get("/:answerId/upvote", auth, async (req, res) => {   
  console.log("Inside question router !");
  const controller = new AnswerController();
  await controller.upvoteAnswer(req, res);
});

export default answerRouter;
