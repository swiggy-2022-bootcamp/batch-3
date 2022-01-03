import {json, Router, urlencoded} from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
/* Custom imports */
import {configCors, rateLimitConfig} from "../../config";
import {requestLogger} from "./requestLogger";


export const useHelmet = (router: Router) => {
  router.use(helmet());
};

export const allowCors = (router: Router) => {

  router.use(cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      if (configCors.allowOrigin.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    exposedHeaders: configCors.exposedHeaders,
    // To enable HTTP cookies over CORS
    // credentials: true,
  }));
};

/* here all middleware come. Don't need to do anything in app.js*/
export const handleBodyRequestParsing = (router: Router) => {
  router.use(urlencoded({extended: true}));
  router.use(json());
};

// Logging all request in console.
export const reqConsoleLogger = (router: Router) => {
  router.use(requestLogger);
};

// Compress the payload and send through api
export const handleCompression = (router: Router) => {
  router.use(compression());
};

// export const requestLimiter = (router: Router) => {
//   const limiter = new rateLimit({
//     windowMs: +rateLimitConfig.inTime, // 1 minutes
//     max: +rateLimitConfig.maxRequest, // limit each IP to 12 requests per windowMs,
//     message: {
//       status: 0,
//       error: "Too Many Requests",
//       statusCode: 429,
//       message: "Oh boy! You look in hurry, take it easy",
//       description: "You have crossed maximum number of requests. please wait and try again."
//     }
//   });
//   router.use(limiter);
// };
