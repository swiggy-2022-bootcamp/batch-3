import express from "express";
import UserController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", async (_req, res) => {   
  console.log("Inside user router !")
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

export default userRouter;