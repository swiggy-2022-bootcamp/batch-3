import { NextFunction, Request, Response } from "express";
import userModel  from "./user.model";
import ResponseHandler from "../../lib/helpers/responseHandler";
import { user as msg } from "../../lib/helpers/customMessage";
import jwt from 'jsonwebtoken';
import { commonConfig } from "../../config";
import { IUser } from "./user.interface";
import { IUserModel } from "./user.schema";

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
      // const data =  await userModel.add(req.body);
      console.log(req.body);
      // res.set("X-Auth")
      responseHandler
        .reqRes(req, res)
        .onCreate(msg.CREATED, await userModel.add(req.body), msg.CREATED_DEC)
        .send();
    } catch (e) {
      console.log(e);
      next(responseHandler.sendError(e));
    }
  };

  public fetch = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      responseHandler.reqRes(req, res).onCreate(msg.CREATED, await userModel.fetch(req.params.id), msg.CREATED_DEC).send();
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      responseHandler.reqRes(req, res).onCreate(msg.UPDATED, await userModel.update(req.params.id, req.body)).send();
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };

  public delete = async (req:Request,res:Response,next:NextFunction)=>{
    const responseHandler = new ResponseHandler();

    try {
      await userModel.delete(req.params.id);
      responseHandler.reqRes(req, res).onCreate(msg.UPDATED).send();
    }catch(e){
      next(responseHandler.sendError(e));
    }
  }

  public getLoggedUser = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      const user = await userModel.fetch(req.userId);

      responseHandler.reqRes(req, res).onFetch("User Data", user).send();
    } catch (e) {
      responseHandler.sendError(e);
    }
  };

  public addFollower = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      const data = await userModel.addFollower(req.params.id, req.body.user.id);

      responseHandler.reqRes(req, res).onCreate(msg.UPDATED, data).send();
    } catch (e) {
      responseHandler.sendError(e);
    }
  };

  public addFollowing = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      req.body.userId = req.userId;
      console.log(req.userId);
      const data = await userModel.addFollowing(req.params.id, req.body.userId);

      responseHandler.reqRes(req, res).onCreate(msg.UPDATED, data).send();
    } catch (e) {
      responseHandler.sendError(e);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();

    try {
      let newUser:any
      if (req.body.user) {
        newUser = await userModel.add(req.body.user);
      }else 
      {
        newUser = await userModel.add(req.body);
      }
      

      this.createSendToken(req, res, next, newUser);
    } catch (e) {
      responseHandler.sendError(e);
    }
  };

  private createSendToken = async (req: Request, res: Response, next: NextFunction, user: any) => {
    const responseHandler = new ResponseHandler();
    const token = this.signToken(user._id);
    console.log("hiii");
    const data = {
      token,
      user
    };
    responseHandler.reqRes(req, res).onCreate(msg.CREATED, data).send();
  };

  private signToken = (id: string) => {
    return jwt.sign({ id }, commonConfig.jwtSecretKey, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
   const responseHandler = new ResponseHandler();
    try {
      const user = await userModel.login(req.body);
      // 3> if eveything is ohkay send the token back
      if (user) {
        this.createSendToken(req, res, next, user);
        // responseHandler.reqRes(req, res).send();
      } else {
        next(responseHandler.reqRes(req, res).send());
      }
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };

  public addFolowRequest = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {

      if (req.userId) {
        const data = await userModel.addFollowRequest(req.params.id, req.userId);

        responseHandler.reqRes(req, res).onCreate(msg.UPDATED, data).send();
      }
    } catch (e) {
      responseHandler.sendError(e);
    }
  };

  public acceptFollowRequest = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      if (req.userId) {
        const data = await userModel.acceptFollowRequest(req.params.id, req.userId);

        responseHandler.reqRes(req, res).onCreate(msg.UPDATED, data).send();
      }
    } catch (e) {
      responseHandler.sendError(e);
    }
  };

  public isVerified = async (req: Request, res: Response, next: NextFunction) => {
    const responseHandler = new ResponseHandler();
    try {
      const data = await userModel.isUserVerified(req.userId);
      
      if (!data.proceed) {
        return responseHandler.reqRes(req, res).onFetch("User is not verified", data).send();
      } else {
        req.body.phone = data.phone;
      }
      next();
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };
}

export default new UserController();

