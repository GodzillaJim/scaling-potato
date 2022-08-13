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
    io.on("connection", (socket) => {
      socket.on("joinRoom", (data) => {
        socket.join(data.room);
      });

      socket.on("chatMessage", (data) => {
        io.to(data.room).emit("chatMessage", data)
      });
    });
    return server;
  } catch (e) {
    logger.error(e);
    return app;
  }
};
export default socketServer;
