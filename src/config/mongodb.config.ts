import { config } from "dotenv";
import logger from "./logger.config";
import mongoose from "mongoose";

export default class MongoDb {
  constructor() {
    config();
  }
  connect() {
    mongoose
      .connect(process.env.MONGO_DB, {
        servername: "COLLABOR@TOR",
      })
      .then(() => {
        logger.info("MongoDb connected");
      })
      .catch((error) => {
        logger.error(error);
      });
  }
}
