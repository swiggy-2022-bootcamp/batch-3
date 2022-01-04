import { NextFunction, Request, Response } from "express";
import userModel, { UserModel }  from "./user.model";
import ResponseHandler from "../../lib/helpers/responseHandler";
import { user as msg } from "../../lib/helpers/customMessage";

class UserController {
  public fetchAll = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      responseHandler.reqRes(req, res).onFetch(msg.FETCH_ALL, await userModel.fetchAll()).send();
    } catch (e) {
      // send error with next function.
      next(responseHandler.sendError(e));
    }
  };


  public create = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      let data = await userModel.add(req.body);
      responseHandler
        .reqRes(req, res)
        .onCreate(data.alreadyExisted ? 'User already existed' : msg.CREATED, data)
        .send();
    } catch (e) {
      console.log(e);
      next(responseHandler.sendError(e));
    }
  };


  public login = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      let data = await userModel.login(req.body);
      responseHandler
        .reqRes(req, res)
        .onCreate('Logged In Successfully', data)
        .send();
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };


}

export default new UserController();

