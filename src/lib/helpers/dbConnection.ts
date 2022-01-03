import { connect, connection } from "mongoose";
import * as chalk from "chalk";
import { MONGODB_URI } from "../utils/secrets";
import { mongoUrl } from "../../config";
//require database URL from properties file

var connected = chalk.default.bold.cyan;
var error = chalk.default.bold.yellow;
var disconnected = chalk.default.bold.red;
var termination = chalk.default.bold.magenta;


class Connection {

  private mongoUrl: string;
  constructor(uri: string) {
    this.mongoUrl = uri;
  }

  public mongoConnection() {
    const dbURL: any = this.mongoUrl;
    connect(dbURL, this.mongoOption());

    connection.on('connected', () => {
      console.log(connected("Mongoose default connection is open to ", dbURL, "\u{1F60D}"));
    });

    connection.on('error', (err) => {
      console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    connection.on('disconnected', () => {
      console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', () => {
      connection.close(() => {
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
      });
    });
  }

  protected mongoOption(): Object {
    return {

      // absolutely copied from mongoose docs. 
      // Change according to your need
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      // autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    }
  }
}


export default new Connection(mongoUrl());