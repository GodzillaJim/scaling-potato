import { boundClass } from "autobind-decorator";
import { NextFunction, Request, Response } from "express";
import logger from "../../config/logger.config";
import ContactFormService from "../../services/contact";

@boundClass
export default class ContactFormController {
  name: string;

  contactService: ContactFormService;

  constructor() {
    this.name = "Contact-Form-Controller";
    this.contactService = new ContactFormService();
  }

  public async sendContactFormSubmission(
    req: Request,
    _res: Response,
    next: NextFunction
  ) {
    try {
      const form = req.body;
      await this.contactService.submitContactForm(form);
      logger.info(form);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}
