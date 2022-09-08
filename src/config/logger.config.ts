import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf((info: any) => {
      // eslint-disable-next-line no-console
      console.log("[Logger]: ", info);
      return `[${info.timestamp}] ${info.level}: ${info.message}`;
    })
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "./logs/info.log",
      level: "info",
    }),
  ],
});

export default logger;
