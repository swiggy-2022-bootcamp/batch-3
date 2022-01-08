import express from "express";
import UserRouter from "./user.router";
import QuestionRouter from "./question.router";
import HealthcheckController from "../controllers/healthcheck.controller";
import RegisterController from "../controllers/registeruser.controller";
import LoginController from "../controllers/login.controller";

const router = express.Router();

router.get("/healthcheck", async (_req, res) => {
  const controller = new HealthcheckController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.post("/register", async (req, res) => {
  const controller = new RegisterController();
  controller.registerUser(req, res);
});

router.post("/login", async (req, res) => {
  const controller = new LoginController();
  controller.loginUser(req, res);
});

router.use("/users", UserRouter);

router.use("/question", QuestionRouter);

export default router;
