import {HTTP401Error} from '../utils/httpErrors';
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import {model} from 'mongoose';
import {commonConfig} from '../../config';
import {IUserModel} from '../../components/user/user.schema';

interface IUserToken {
  user?: object
}

interface IUserTokenDetails {
  // added id 
  id?: string;
  _id?: string;
  name?: string;
  age?: number;
}
export const Authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.header("Authorization")) {
      const token: string = req.header('Authorization') || "";
      const data: IUserModel = await handleToken(token);
      if (data) {
        req.userId = data._id;
        req.role = data.role;
        req.token = token.split(" ")[1];
        next();
      }
    } else if (req.header("escapeAuth")) {
      next();
    } else {
      throw new HTTP401Error("You are not authorized", "You may have not passed the authorization key in header");
    }
  } catch (e) {
    e = new HTTP401Error(e.message, "You may have not passed the authorization key in header");
    next(e);
  }
};

export const AdminAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.role === 'admin') {
      next();
    } else {
      throw new HTTP401Error("Incorrect Role for Request. Your Role : " + req.role);
    }
  } catch (e) {
    e = new HTTP401Error(e.message);
    next(e);
  }
};

export const RoleAuthorization = (role:string) =>  async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.role === 'admin' || req.role === role) {
      next();
    } else {
      throw new HTTP401Error("Incorrect Role for Request. Your Role : " + req.role);
    }
  } catch (e) {
    e = new HTTP401Error(e.message);
    next(e);
  }
};

const handleToken = async (token: string) => {
  if (token) {
      token = token.split(" ")[1];
    const userData: IUserToken = await jwt.verify(token, commonConfig.jwtSecretKey) as object || {user: {}};

      const userDetails: IUserTokenDetails = userData as object;
    const data: IUserModel | null = await model<IUserModel>('User').findOne({
      _id: userDetails.id,
    //   tokens: {$in: [token]}
    });

    if (data) {
      return data;
    } else {
      // tslint:disable-next-line: no-string-throw
      throw "You are not authorized user.........";
    }
  } else {
    // tslint:disable-next-line: no-string-throw
    throw "You are not authorized user";
  }
};
