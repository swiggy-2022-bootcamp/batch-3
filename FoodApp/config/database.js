const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  let db=mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

exports.AutoIncrement=AutoIncrement