import express from "express";
import UserRouter from "./user.router";
import QuestionRouter from "./question.router";
import HealthcheckController from "../controllers/healthcheck.controller";

const router = express.Router();

router.get("/healthcheck", async (_req, res) => {
  const controller = new HealthcheckController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/users", UserRouter);

router.use("/question", QuestionRouter);

export default router;
