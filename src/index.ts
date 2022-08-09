import { config } from "dotenv";
import logger from "winston";
import MongoDb from "./config/mongodb.config";
import server from "./server";
import { seedAdmin, seedRoles } from "./seed";

config();
const port = process.env.PORT || 3000;
const mongodb = new MongoDb();
mongodb.connect();

server.listen(port, async () => {
  logger.info(`connected to port ${port}`);
  await seedRoles();
  await seedAdmin();
});
