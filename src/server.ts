import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { morganConfig } from "./config/config";
import router from "./routes";
import socketServer from "./services/socket/server";
import path from "path";
import { createServer } from "http";
import { ExpressPeerServer } from "peer";

dotenv.config();

const app = express();

const middleware = [
  morgan(morganConfig),
  helmet({ contentSecurityPolicy: false }),
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
];

const peerServer = createServer(app);
const peerListener = ExpressPeerServer(peerServer);
app.use("/peerjs", peerListener);

app.use(middleware);

app.use(express.static(path.resolve(__dirname, "../build")));

app.use("/api/v1", router);
app.get("/health", (_req: Request, res: Response) => {
  res.json({ health: "OK" });
});
app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

peerListener.listen(8878);
const server = socketServer(app);
export default server;
