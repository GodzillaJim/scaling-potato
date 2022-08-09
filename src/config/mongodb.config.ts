import { config } from "dotenv";
import mongoose from "mongoose";
import logger from "./logger.config";

export default class MongoDb {
  constructor() {
    config();
  }

  // eslint-disable-next-line class-methods-use-this
  connect() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        logger.info("MongoDb connected");
      })
      .catch((error) => {
        logger.error(error);
      });
  }
}
