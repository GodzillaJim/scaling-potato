import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import config from "../../config";

dotenv.config();
const { clientId, bootstrapServerHost } = config.kafka;
const kafka = new Kafka({
  clientId,
  brokers: [bootstrapServerHost],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "collabor@te" });
export default kafka;
