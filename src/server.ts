import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { handleError, notFound } from "./middleware/errorHandler";
import { corsOptionsWhiteList, morganConfig } from "./config/config";
import router from "./routes";

dotenv.config();

const app = express();

const middleware = [
  morgan(morganConfig),
  helmet(),
  cors(corsOptionsWhiteList),
  express.json(),
  express.urlencoded({ extended: false }),
];

app.use(middleware);

app.use("/api/v1", router);

const errorHandlers = [notFound, handleError];
app.use(errorHandlers);

export default app;
