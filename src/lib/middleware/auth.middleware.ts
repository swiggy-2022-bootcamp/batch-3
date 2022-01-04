import { HTTP401Error } from '../utils/httpErrors';
import { NextFunction, Request, Response } from "express";
import userModel from "../../components/user/user.model";

export const Authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body['user-details']) {
      let verify = await userModel.login(req.body['user-details']);
      if (verify.success) {
        req.userId = req.body['user-details']['email'];
        req._userId=verify.id
        next();
      }
    } else if (req.query.email) {
      let verify = await userModel.login(req.query);
      if (verify.success) {
        req.userId = req.query.email;
        req._userId=verify.id
        next();
      }
    }
    else {
      throw new HTTP401Error("You are not authorized", "You may have not passed the authorization details in the body");
    }
  } catch (e) {
    e = new HTTP401Error(e.message, "You may have not passed the authorization details in the body");
    next(e);
  }
};
