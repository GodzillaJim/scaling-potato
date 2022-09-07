import { Application } from "express";
import { Socket } from "socket.io";
import { createServer } from "http";
import logger from "../../../config/logger.config";
import userHandlers from "./services/User";
import Task from "../../../models/task";

const SocketIO = require("socket.io");
/**
 * Create socket server from Express app
 * @param {Application} app The express application
 * @returns {Application | Server} The final app server to start listening
 */
const { removeUser, usersInRoom, addUser } = userHandlers;
interface IUser {
  username: string;
  socketID: string;
}

interface IRoom {
  users: IUser[];
  data: any;
}

const roomList: Record<any, IRoom> = {};

const socketServer = (app: Application) => {
  try {
    const server = createServer(app);
    const io = SocketIO(server);

    io.on("connection", (socket: Socket) => {
      /*------------------Chat Messages-------------*/

      socket.on("joinRoom", ({ room }) => {
        socket.join(room);
      });

      socket.on("chatMessage", ({ message, sender, avatar, date, room }) => {
        io.to(room).emit("newMessage", { message, sender, avatar, date, room });
      });

      /*--------------------Chat Messages end----------*/

      socket.on("join", async ({ name, room }: any) => {
        const task = await Task.findById(room);

        if (!roomList[room]) {
          roomList[room] = { users: [], data: task.code };
        }

        const user = addUser({ id: socket.id, name, room });

        socket.join(room);
        socket.broadcast.to(room).emit("notification", {
          text: `${user.name} has joined!`,
          type: "connect",
        });

        io.to(room).emit("roomData", {
          room,
          users: usersInRoom(user.room),
          data: roomList[room].data,
        });
      });
      socket.on("sendText", ({ data, room, name }) => {
        if (roomList[room]) {
          roomList[room].data = data;
        } else {
          roomList[room] = { users: [], data };
        }
        Task.updateOne({ id: room }, { code: data });
        socket.broadcast.to(room).emit("text", { data, name });
      });

      socket.on("sendModeValue", ({ mode, room }) => {
        socket.broadcast.to(room).emit("changeMode", mode);
      });

      socket.on("sendThemeValue", ({ theme, room }) => {
        socket.broadcast.to(room).emit("changeTheme", theme);
      });

      socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
          if (usersInRoom(user.room).length <= 1) {
            Task.updateOne({ id: user.room });
          }

          io.to(user.room).emit("notification", {
            text: `${user.name} has left`,
            type: "disconnect",
          });
        }
      });
    });
    return server;
  } catch (e) {
    logger.error(e);
    console.log(e);
    return app;
  }
};
export default socketServer;
