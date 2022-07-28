import { isEmpty } from "lodash";
import { boundClass } from "autobind-decorator";
import { NextFunction, Response, Request } from "express";
import {
  ClassConstructor,
  plainToClass,
  plainToInstance
} from "class-transformer";
import { validate } from "class-validator";
import { IContactForm } from "../../types";
import logger from "../../config/logger.config";
import ContactForm from "../../types/dto/contact/ContactForm";

// Arr@w05GodbyChinu@Achebe

@boundClass
class Validators {
  public static validateForm(form: IContactForm) {
    const definedFields =
      form.name && form.email && form.message && form.subject;
    const nonEmptyFields =
      isEmpty(form) ||
      isEmpty(form.name) ||
      isEmpty(form.message) ||
      isEmpty(form.subject) ||
      isEmpty(form.email);
    if (Boolean(definedFields) && !nonEmptyFields) {
      return true;
    }
    return false;
  }

  public static validateInput(dtoClass: ClassConstructor<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      const output = plainToInstance(dtoClass, req.body);
      validate(output, req.body, {
        skipMissingProperties: true,
        stopAtFirstError: true,
      }).then((errors) => {
        if (errors.length > 0) {
          logger.error(errors);
          const errorTexts: { [type: string]: string }[] = [];
          errors.forEach((err) => {
            errorTexts.push(err.constraints);
          });
          return res.status(400).json({ error: true, data: errorTexts });
        }
        req.body = output;
        return next();
      });
    };
  }
}
export default Validators;
