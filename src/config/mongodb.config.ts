import { config } from "dotenv";
import mongoose from "mongoose";
import logger from "./logger.config";

export default class MongoDb {
  mongoUri: string;
  constructor() {
    this.mongoUri =
      "mongodb+srv://collaborate_app:sherlockH0lmes05@cluster0.1cgtcoj.mongodb.net/?retryWrites=true&w=majority";
    config();
  }

  // eslint-disable-next-line class-methods-use-this
  connect() {
    mongoose
      .connect(this.mongoUri)
      .then(() => {
        logger.info("MongoDb connected");
      })
      .catch((error) => {
        console.log("Failed Database connection", error);
      });
  }
}
