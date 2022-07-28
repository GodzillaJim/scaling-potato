import { config } from "dotenv";
import logger from "winston";
import MongoDb from "./config/mongodb.config";
import app from "./server";
import { seedAdmin, seedRoles } from "./seed";

config();
const port = process.env.PORT || 3000;
const mongodb = new MongoDb();
mongodb.connect();

app.listen(port, async () => {
  logger.info(`connected to port ${port}`);
  console.log(`connected to port ${port}`);
  await seedRoles();
  await seedAdmin();
});
