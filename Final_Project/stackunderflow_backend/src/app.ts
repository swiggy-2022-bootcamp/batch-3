import express, { Application } from "express";
import {createConnection} from "typeorm";

import Router from "./routes/index.router";
import dbConfig from "./config/database/database";

const PORT = process.env.PORT || 8000;

const app: Application = express();

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
});


app.use(express.json());
app.use(express.static("public"));

app.use(Router);

