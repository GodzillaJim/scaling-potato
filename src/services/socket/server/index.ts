import { Application } from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import logger from "../../../config/logger.config";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

/**
 * Create socket server from Express app
 * @param {Application} app The express application
 * @returns {Application | Server} The final app server to start listening
 */
const documents: Record<any, any> = {};
const defaultCodeText = "console.log('hello from server!');";
const socketServer = (app: Application) => {
  try {
    const server = createServer(app);
    const io = new Server(server);

    io.on(
      "connection",
      (
        socket: Socket<
          DefaultEventsMap,
          DefaultEventsMap,
          DefaultEventsMap,
          any
        >
      ) => {
        socket.on("joinRoom", (data) => {
          socket.join(data.room);
        });

        socket.on("doc", (data) => {
          io.to(data.room).emit("doc", data);
          console.log(data);
        });

        socket.on("chatMessage", (data) => {
          io.to(data.room).emit("chatMessage", data);
        });

        socket.on("joinEditorRoom", ({ room, clientID }) => {
          if (!documents[room]) {
            documents[room] = defaultCodeText;
          }
          socket.join(room);
          socket.emit("joined", { code: documents[room], socketID: socket.id });
          io.to(room).emit("newClient", { clientID });
        });

        socket.on("clientWrite", ({ clientID, code, room, changes }) => {
          if (code !== documents[room]) {
            io.to(room).emit("updates", {
              clientID,
              code,
              room,
              changes,
            });
            documents[room] = code;
          }
        });
      }
    );
    return server;
  } catch (e) {
    logger.error(e);
    return app;
  }
};
export default socketServer;
