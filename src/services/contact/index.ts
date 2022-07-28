import { IContactForm } from "../../types";
import logger from "../../config/logger.config";
import KafkaProducerService from "../kafka";

export default class ContactFormService {
  TOPIC = "collaborate_contact_form_messages";

  public async submitContactForm(form: IContactForm) {
    try {
      const producerService = new KafkaProducerService();
      await producerService.produceMessage(this.TOPIC, form);
    } catch (error) {
      logger.error(error);
    }
  }
}
