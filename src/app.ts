import express from "express";
/* Custom imports */
import {applyMiddleware, applyRoutes} from "./lib/utils";
import middleware from './lib/middleware/index'
import routes from "./routes";
import errorHandlersMiddleware from "./lib/middleware/errorHandlers.middleware";
import dbConnection from "./lib/helpers/dbConnection";

process.on("uncaughtException", e => {
    console.log(e)
  console.log(e.message, "uncaught");
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e, "unhandled");
  process.exit(1);
});

// Initialize express app
const app: express.Application = express();

// Initialize middleware
applyMiddleware(middleware, app);

// open  mongoose connection
dbConnection.mongoConnection();

/*---------------------------------------
| API VERSIONS CONFIGURATION [START]
|---------------------------------------*/

// Different router required to initialize different apis call.
const r1 = express.Router();

// for recurrent jobs
// schedule('* * * * *', async () => {
//   console.log("Running job......");
//   await quizModel.updateQuiz();
// });

// schedule('* * * * *', async () => {
//   console.log("Running job 2......");
//   await quizModel.distributePriceMoney();
// });

app.use("/", applyRoutes(routes, r1)); // default api

/*---------------------------------------
| API VERSIONS CONFIGURATION [END]
|---------------------------------------*/

applyMiddleware(errorHandlersMiddleware, app);


// Exporting app
export {app};