import express from "express";
import QuestionController from "../controllers/question.controller";

const questionRouter = express.Router();

const auth = require("../middleware/auth");

// Route: /question: To ask the question 
questionRouter.post("/", auth, async (req, res, next) => {
  console.log("Inside question router !");
  console.log(req.body);
  const controller = new QuestionController();
  await controller.postQuestion(req, res);
});

// Route: /question/{questionId}/answer: To answer the question with given question id
questionRouter.post("/:questionid/answer", auth, async (req, res) => {   
  console.log("Inside question router !");
  console.log(req.body);
  const controller = new QuestionController();
  await controller.postAnswer(req, res);
  
});

// Route: /question/{questionId}: To get answers for given question id
questionRouter.get("/:questionId/answer/all", auth, async (req, res) => {
  console.log("Inside question router");
  const controller = new QuestionController();
  await controller.getAllAnswerForQuestion(req, res);
})


export default questionRouter;