import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { morganConfig } from "./config/config";
import router from "./routes";
import socketServer from "./services/socket/server";

dotenv.config();

const app = express();

const middleware = [
  morgan(morganConfig),
  helmet(),
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
];

app.use(middleware);

app.use("/api/v1", router);
app.get("/health", (_req: Request, res: Response) => {
  res.json({ health: "OK" });
});

const server = socketServer(app);
export default server;
