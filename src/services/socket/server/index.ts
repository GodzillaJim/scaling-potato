import { Application } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import logger from "../../../config/logger.config";

/**
 * Create socket server from Express app
 * @param {Application} app The express application
 * @returns {Application | Server} The final app server to start listening
 */
const socketServer = (app: Application) => {
  try {
    const server = createServer(app);
    const io = new Server(server);
    io.on("connect", () => {
      logger.info("First Connection");
    });
    io.on("connection", (socket) => {
      socket.on("chatMessage", (data) => {
        io.emit("chatMessage", data);
      });
    });
    return server;
  } catch (e) {
    logger.error(e);
    return app;
  }
};
export default socketServer;