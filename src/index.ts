import MongoDb from "./config/mongodb.config";
import app from "./server";
import { config } from "dotenv";
import logger from "./config/logger.config";

config();
const port = process.env.PORT || 3000;
const mongodb = new MongoDb();
mongodb.connect();

app.listen(port, () => {
  logger.info(`connected to port ${port}`);
});
