import nodemailer from "nodemailer";
import { IContactForm } from "../types";
import config from "../config";
import getEmailTemplate from "./html";
import logger from "../config/logger.config";

const sendMail = async ({ subject, email, message, name }: IContactForm) => {
  const transporter = nodemailer.createTransport({ ...config.mailer });
  const mailerOptions = {
    from: "Collabor@te <no-reply@collaborate.com>",
    to: "jacksalazar100@gmail.com",
    subject,
    html: getEmailTemplate({ name, email, message, subject }),
  };

  try {
    await transporter.sendMail(mailerOptions);
  } catch (e) {
    logger.error(e);
  }
};
export default sendMail;
