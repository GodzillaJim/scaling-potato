import { config } from "dotenv";
import MongoDb from "./config/mongodb.config";
import server from "./server";
import { seedAdmin, seedRoles } from "./seed";
import logger from "./config/logger.config";

config();
const port = process.env.PORT || 3000;
const mongodb = new MongoDb();
mongodb.connect();

server.listen(port, async () => {
  logger.info(`connected to port ${port}`);
  console.log(`connected to port ${port}`);
  await seedRoles();
  await seedAdmin();
});
