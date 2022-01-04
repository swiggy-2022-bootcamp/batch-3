import {NextFunction, Request, Response, Router} from "express";
import {Authorization} from "../middleware/auth.middleware";

type Wrapper = ((router: Router) => void);

// load all middleware with this function call
export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

/* Handles all type of api requests. */

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;


export interface IRoute {
  path: string | string[];
  method: string;
  role?: string;
  escapeAuth?: boolean;
  adminOnly?: boolean;
  handler: Handler[];
}

// loading all routes and initialize to use them.
export const applyRoutes = (routes: IRoute[], router: Router) => {
  for (const route of routes) {
    const {method, path, escapeAuth, handler} = route;
    if (escapeAuth) {
      (router as any)[method](path, handler);
    } else {
      (router as any)[method](path, [Authorization, ...handler]);
    }
  }
  return router;
};

export const mongoDBProjectFields = (fieldsString: string, prefix?: string) => {
  const result: any = {};
  fieldsString.split(' ').map(field => {
    if (prefix) {
      result[prefix + '.' + field] = 1;
    } else {
      result[field] = 1;
    }
  });
  return result;
};
