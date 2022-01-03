import {NextFunction, Request, Response} from "express";
import {HTTP404Error, HTTPClientError} from "./httpErrors";
import ResponseHandler from "../helpers/responseHandler";
// When specific api path is not available then throw 404 error. we are passing
// the errors to next function.
export const notFoundError = () => {
  throw new HTTP404Error("Method not found.");
};

// Handles client side error, If not moved to next function.
export const clientError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const responseHandler = new ResponseHandler();
  if (err instanceof HTTPClientError) {
    responseHandler.reqRes(req, res).onClientError(err.statusCode, err.name, err.message, err.description).send();
  } else {
    next(err);
  }
};

// handles server side error.
export const serverError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const responseHandler = new ResponseHandler();
  if (process.env.NODE_ENV === "production") {
    responseHandler.reqRes(req, res).onServerError(err.name, err.message).send();
  } else {
    res.status(500).send(err.stack);
  }
};
