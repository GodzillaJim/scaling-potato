import dotenv from "dotenv";

dotenv.config();

export default {
  mailer: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  kafka: {
    bootstrapServerHost: process.env.KAFKA_BOOTSTRAP_SERVER || "localhost:9092",
    port: process.env.KAFKA_PORT || 9092,
    clientId: process.env.KAFKA_CLIENT_ID,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "SECRET",
    expiration: process.env.JWT_EXPIRATION || 3000,
  },
};
