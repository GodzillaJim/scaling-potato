import { Message, Producer } from "kafkajs";
import { boundClass } from "autobind-decorator";
import { IContactForm } from "../../types";
import logger from "../../config/logger.config";
import { producer } from "../../tools/kafka";

@boundClass
export default class KafkaProducerService {
  producer: Producer;

  constructor() {
    this.producer = producer;
  }

  public async produceMessage(topic: string, message: any) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
